import React, { useState, useEffect } from 'react';
import { getMeetingRooms } from '../../api/api';
import '../style/Form.css';
import BookingTimeModal from './BookingTimeModal'; // Подключаем компонент

const getCurrentDatePlus = (days_plus = 0) => {
  const today = new Date();
  today.setDate(today.getDate() + days_plus);
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const BookingForm = ({ onSubmit, onCancel }) => {
  const [rooms, setRooms] = useState([]); // Состояние для списка аудиторий
  const [formData, setFormData] = useState({
    theme: '',
    date: '',
    timeStart: '',
    timeEnd: '',
    room: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.room = Number(formData.room);
    if (onSubmit) onSubmit(formData);
  };

  useEffect(() => {
    async function fetchRooms() {
      try {
        const roomsData = await getMeetingRooms(); // Получаем данные с API
        setRooms(roomsData); // Обновляем состояние
        if (roomsData.length > 0) {
          setFormData((prev) => ({ ...prev, room: roomsData[0].id }));
        }
      } catch (err) {
        // setError(err.message); // Обрабатываем ошибку
      }
    }

    fetchRooms();
  }, []);

  const isDateSelected = formData.date !== ''; // Проверяем, выбрана ли дата

  return (
    <form className="bookingForm" onSubmit={handleSubmit}>
      <h2>Забронировать</h2>
      <div className="lineBlock">
        <div className="inputBlock">
          <label>Тема:</label>
          <input
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            required
            placeholder="Название мероприятия"
          />
        </div>
      </div>

      <div className="lineBlock">
        <div className="inputBlock">
          <label>Дата:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={getCurrentDatePlus()}
            max={getCurrentDatePlus(7)}
            required
          />
        </div>

        <div className="inputBlock" style={{ flex: 2 }}>
          <label>Время:</label>
          <BookingTimeModal
            selectedDate={new Date(formData.date)} // Передаем выбранную дату
            setFormData={setFormData}
            selectedRoom={Number(formData.room)}
            isDateSelected={isDateSelected}
          />
        </div>
      </div>

      <div className="lineBlock">
        <div className="inputBlock">
          <label>Аудитория:</label>
          <select
            name="room"
            value={formData.room}
            onChange={handleChange}
            required
          >
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="lineBlock">
        <div className="inputBlock">
          <label>Описание:</label>
          <input placeholder="Есть проектор" disabled></input>
        </div>
      </div>

      <div className="lineBlock">
        <button type="submit">Продолжить</button>
        <button type="button" onClick={onCancel}>
          Назад
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
