import React from 'react';
import BookingModal from './modal/BookingModal';
import './style/SearchPanel.css';
import { useReservations } from '../context/ReservationContext';

const SearchPanel = () => {
  const { updateReservations } = useReservations();

  const currentDate = new Date().toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  // Callback для успешного бронирования
  const handleBookingSuccess = async () => {
    await updateReservations(); // Обновляем данные в контексте
  };

  return (
    <div className="searchpanel">
      <input className="searchInput" placeholder="Поиск" />
      {/* Передаем callback в BookingModal */}
      <BookingModal onBookingSuccess={handleBookingSuccess} />
      <input value={currentDate} readOnly className="current-date" />
    </div>
  );
};

export default SearchPanel;
