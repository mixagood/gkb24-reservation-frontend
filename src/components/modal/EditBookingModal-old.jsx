import React, { useState } from 'react';
import { patchReservation } from '../../api/api'; // Импорт функции для PATCH запроса
import './style/Modal.css'; // Импорт стилей модального окна

const EditBookingModal = ({ reservation, onClose }) => {
  // const [fromReserve, setFromReserve] = useState(reservation.from);
  // const [toReserve, setToReserve] = useState(reservation.to);
  const [formData, setFormData] = useState({
    theme: reservation.comment,
    date: reservation.from.substring(0, 10),
    timeStart: reservation.from.substring(11, 16),
    timeEnd: reservation.to.substring(11, 16),
    room: reservation.meetingroom_id,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(reservation.from.substring(0, 10));
  console.log(reservation.from.substring(11, 16));
  console.log(reservation.to.substring(11, 16));

  const handleSave = async () => {
    try {
      console.log(reservation.id, fromReserve, toReserve);
      const response = await patchReservation(
        reservation.id,
        fromReserve,
        toReserve
      );
      console.log(response);
      alert('Бронирование успешно обновлено!');
      onClose(); // Закрыть модальное окно
    } catch (error) {
      console.log(error);
      alert('Ошибка при обновлении бронирования.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2>Дата</h2>

        <h2>Редактировать бронирование</h2>
        <div className="form-group">
          <label htmlFor="fromReserve">Начало бронирования:</label>
          <input
            type="datetime-local"
            id="fromReserve"
            value={fromReserve}
            onChange={(e) => setFromReserve(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="toReserve">Конец бронирования:</label>
          <input
            type="datetime-local"
            id="toReserve"
            value={toReserve}
            onChange={(e) => setToReserve(e.target.value)}
          />
        </div>
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
        <div className="modal-actions">
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default EditBookingModal;
