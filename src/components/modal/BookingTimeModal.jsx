import React, { useState, useEffect } from 'react';
import { getReservationsByRoom } from '../../api/api';
// import { generateTimeSlots } from '../../utils/utils';

const BookingTimeModal = ({
  selectedDate,
  selectedRoom,
  setFormData,
  isDateSelected,
  editingReservationId, // Пропс для ID редактируемого бронирования (необязательный)
  initialStartTime, // Начальное время начала (необязательное)
  initialEndTime, // Начальное время окончания (необязательное)
}) => {
  const roomId = selectedRoom;
  const timeSlots = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
  ];

  // const timeSlots = generateTimeSlots('08:00', '22:00', 30);

  const [startTime, setStartTime] = useState(initialStartTime || null);
  const [endTime, setEndTime] = useState(initialEndTime || null);
  const [isStartModalOpen, setStartModalOpen] = useState(false);
  const [isEndModalOpen, setEndModalOpen] = useState(false);
  const [bookedTimes, setBookedTimes] = useState([]);

  useEffect(() => {
    getReservationsByRoom(roomId).then((reservations) => {
      setBookedTimes(
        reservations
          .filter((res) => res.id !== editingReservationId) // Исключаем редактируемое бронирование, если оно есть
          .map((reservation) => ({
            from: new Date(reservation.from_reserve),
            to: new Date(reservation.to_reserve),
          }))
      );
    });
  }, [roomId, editingReservationId]);

  const isStartSlotAvailable = (slot) => {
    const [hours, minutes] = slot.split(':').map(Number);
    const slotTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      hours,
      minutes
    );

    return !bookedTimes.some(
      (reservation) => slotTime >= reservation.from && slotTime < reservation.to
    );
  };

  const isEndSlotAvailable = (startSlot, endSlot) => {
    const [startHours, startMinutes] = startSlot.split(':').map(Number);
    const startTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      startHours,
      startMinutes
    );

    const [endHours, endMinutes] = endSlot.split(':').map(Number);
    const endTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      endHours,
      endMinutes
    );

    return !bookedTimes.some(
      (reservation) =>
        (startTime >= reservation.from && startTime < reservation.to) ||
        (endTime > reservation.from && endTime <= reservation.to) ||
        (startTime <= reservation.from && endTime >= reservation.to)
    );
  };

  const availableEndTimes = timeSlots.filter(
    (slot) =>
      startTime && slot > startTime && isEndSlotAvailable(startTime, slot)
  );

  const handleStartTimeClick = (e, time) => {
    e.stopPropagation(); // Остановим всплытие события
    setStartTime(time);
    setEndTime(null);
    setStartModalOpen(false);
    setFormData((prev) => ({
      ...prev,
      timeStart: time,
    }));
  };

  const handleEndTimeClick = (e, time) => {
    e.stopPropagation(); // Остановим всплытие события
    setEndTime(time);
    setEndModalOpen(false);
    setFormData((prev) => ({
      ...prev,
      timeEnd: time,
    }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <button
        className="time-button"
        onClick={(e) => {
          e.preventDefault(); // Предотвращаем стандартное поведение, если форма
          setStartModalOpen(true);
        }}
        disabled={!isDateSelected}
      >
        {startTime || 'Выбрать с'}
      </button>
      <button
        className="time-button"
        onClick={(e) => {
          e.preventDefault(); // Предотвращаем стандартное поведение, если форма
          setEndModalOpen(true);
        }}
        disabled={!startTime || !isDateSelected}
        style={{ marginLeft: '10px' }}
      >
        {endTime || 'Выбрать до'}
      </button>

      {isStartModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Выберите время начала</h3>
            <div className="time-grid">
              {timeSlots
                .filter((slot) => isStartSlotAvailable(slot))
                .map((time) => (
                  <button
                    key={time}
                    className={`time-slot ${
                      startTime === time ? 'selected' : ''
                    }`}
                    onClick={(e) => handleStartTimeClick(e, time)}
                  >
                    {time}
                  </button>
                ))}
            </div>
            <button
              className="close-button"
              onClick={() => setStartModalOpen(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      {isEndModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Выберите время окончания</h3>
            <div className="time-grid">
              {availableEndTimes.map((time) => (
                <button
                  key={time}
                  className={`time-slot ${endTime === time ? 'selected' : ''}`}
                  onClick={(e) => handleEndTimeClick(e, time)}
                >
                  {time}
                </button>
              ))}
            </div>
            <button
              className="close-button"
              onClick={() => setEndModalOpen(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingTimeModal;
