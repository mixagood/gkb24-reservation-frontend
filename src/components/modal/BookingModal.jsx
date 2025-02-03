import React, { useState } from 'react';
import Modal from './Modal';
import BookingForm from './BookingForm';
import { bookRoom } from '../../api/api';

// Добавляем onBookingSuccess в пропсы
const BookingModal = ({ onBookingSuccess }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleFormSubmit = async (data) => {
    const startTime = new Date(data.date);
    startTime.setHours(data.timeStart.slice(0, 2));
    startTime.setMinutes(data.timeStart.slice(3, 5));

    const endTime = new Date(data.date);
    endTime.setHours(data.timeEnd.slice(0, 2));
    endTime.setMinutes(data.timeEnd.slice(3, 5));

    try {
      // Отправляем данные на сервер
      const response = await bookRoom(
        data.room,
        data.theme,
        startTime,
        endTime
      );

      // Если бронирование успешно, вызываем onBookingSuccess
      if (onBookingSuccess) {
        onBookingSuccess();
      }
    } catch (err) {
      console.log(err);
    }

    handleClose();
  };

  return (
    <div>
      <button className="bookButton" onClick={handleOpen}>
        Забронировать
      </button>
      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <BookingForm onSubmit={handleFormSubmit} onCancel={handleClose} />
      </Modal>
    </div>
  );
};

export default BookingModal;
