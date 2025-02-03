import React, { useEffect, useState } from 'react';
import { getUserReservations } from '../api/api';
import './style/UserBookList.css';

const UserBookList = () => {
  const [reservations, setReservations] = useState([]); // Состояние для хранения списка комнат
  const [error, setError] = useState(null); // Состояние для обработки ошибок
  const [loading, setLoading] = useState(true); // Состояние загрузки

  useEffect(() => {
    // Получение данных при загрузке компонента
    getUserReservations()
      .then((data) => {
        setReservations(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  const now = new Date();

  // Разделение на активные и прошедшие бронирования
  const activeReservations = reservations.filter(
    (reservation) => new Date(reservation.from_reserve) > now
  );
  const pastReservations = reservations.filter(
    (reservation) => new Date(reservation.from_reserve) <= now
  );

  return (
    <div className="page-content">
      {/* Активные бронирования */}
      <div className="section">
        <h2>Активные</h2>
        {activeReservations.length > 0 ? (
          <div className="reservations">
            {activeReservations.map((reservation) => (
              <div key={reservation.id} className="reservation-card">
                <h3>{reservation.meeting_room_name}</h3>
                <p>Начало: {reservation.from_reserve}</p>
                <p>Конец: {reservation.to_reserve}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-message">Нет активных бронирований.</p>
        )}
      </div>

      {/* История бронирований */}
      <div className="section">
        <h2>История</h2>
        {pastReservations.length > 0 ? (
          <div className="reservations">
            {pastReservations.map((reservation) => (
              <div key={reservation.id} className="reservation-card">
                <h3>{reservation.meeting_room_name}</h3>
                <p>Начало: {reservation.from_reserve}</p>
                <p>Конец: {reservation.to_reserve}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-message">Нет прошедших бронирований.</p>
        )}
      </div>
    </div>
  );
};

export default UserBookList;
