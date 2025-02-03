import React, { useState } from 'react';
import Modal from './Modal';
import EditBookingForm from './EditBookingForm'; // Импортируем форму редактирования
import { patchReservation } from '../../api/api'; // Импортируем функцию для обновления бронирования

const EditBookingModal = ({ reservation, onEditSuccess, onClose }) => {
  const [isModalOpen, setModalOpen] = useState(true);

  const handleFormSubmit = async (data) => {
    console.log(data);
    const startTime = new Date(data.date);
    startTime.setHours(data.timeStart.slice(0, 2));
    startTime.setMinutes(data.timeStart.slice(3, 5));

    const endTime = new Date(data.date);
    endTime.setHours(data.timeEnd.slice(0, 2));
    endTime.setMinutes(data.timeEnd.slice(3, 5));

    let response;
    try {
      // Отправляем обновленные данные на сервер
      console.log(reservation.id, startTime, endTime);
      response = await patchReservation(reservation.id, startTime, endTime);

      // Если редактирование успешно, вызываем onEditSuccess
      if (onEditSuccess) {
        onEditSuccess();
      }
    } catch (err) {
      console.error('Ошибка при редактировании бронирования:', err);
    }

    onClose(); // Закрываем модальное окно
  };

  return (
    <Modal isOpen={isModalOpen} onClose={onClose}>
      <EditBookingForm
        reservation={reservation} // Передаем данные о бронировании
        onSubmit={handleFormSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default EditBookingModal;
