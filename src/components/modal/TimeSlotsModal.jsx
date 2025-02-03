import React, { useState, useEffect } from 'react';
import './style/TimeSlotsModal.css';
import { getReservationsByRoom } from '../../api/api';

const TimeSlotsModal = ({ roomId, isOpen, onClose, timeSlots }) => {
  const [reservations, setReservations] = useState([]);

  // Функция для получения бронирований для комнаты
  useEffect(() => {
    if (isOpen) {
      const fetchReservations = async () => {
        try {
          const response = await getReservationsByRoom(roomId); // Подключите ваш API
          const data = await response.json();
          setReservations(data);
        } catch (error) {
          console.error('Ошибка при загрузке бронирований:', error);
        }
      };

      fetchReservations();
    }
  }, [isOpen, roomId]);

  // Функция проверки занятости временного слота
  const isSlotOccupied = (slot) => {
    const [hours, minutes] = slot.split(':').map(Number);
    const slotStart = new Date();
    slotStart.setHours(hours, minutes, 0, 0);

    return reservations.some((res) => {
      const from = new Date(res.from_reserve);
      const to = new Date(res.to_reserve);
      return slotStart >= from && slotStart < to;
    });
  };

  return isOpen ? (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Предотвращает закрытие при клике внутри
      >
        <h3>Выберите временной слот</h3>
        <div className="time-slots-grid">
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              className={`time-slot ${
                isSlotOccupied(slot) ? 'occupied' : 'available'
              }`}
              disabled={isSlotOccupied(slot)} // Неактивная кнопка для занятого слота
            >
              {slot}
            </button>
          ))}
        </div>
        <button className="close-button" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  ) : null;
};

export default TimeSlotsModal;
