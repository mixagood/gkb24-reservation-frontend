import React, { useEffect, useState } from 'react';
import { getMeetingRooms } from '../api/api';
import './style/MeetingRoomsList.css';

const MeetingRoomsList = () => {
  const [rooms, setRooms] = useState([]); // Состояние для хранения списка комнат
  const [error, setError] = useState(null); // Состояние для обработки ошибок
  const [loading, setLoading] = useState(true); // Состояние загрузки

  useEffect(() => {
    // Получение данных при загрузке компонента
    getMeetingRooms()
      .then((data) => {
        setRooms(data);
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

  return (
    <div className="page-content">
      <div className="section">
        <h2>Список аудиторий</h2>
        <div className="reservations">
          {rooms.map((room) => (
            <div key={room.id} className="reservation-card">
              <h3>{room.name}</h3>
              <p>{room.description}</p>
              <img src={room.id + '.jpg'}></img>
            </div>
          ))}
          <div />
        </div>
      </div>
    </div>
  );
};

export default MeetingRoomsList;
