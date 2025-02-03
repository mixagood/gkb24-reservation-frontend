import React, { useState } from 'react';
import './style/HomePage.css';
// import MeetingRoomTable from '../components/MeetingRoomTable';
import MeetingRoomTable from '../components/MeetingRoomTableTest.jsx';

import rDateChange from '../assets/rDateChange.svg';
import lDateChange from '../assets/lDateChange.svg';
import { generateTimeSlots } from '../utils/utils.js';
import { useReservations } from '../context/ReservationContext.jsx';

const HomePage = () => {
  const { reservations, updateReservations, loading, error } =
    useReservations(); // Данные из контекста
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  ); // Сегодняшняя дата

  const changeDate = (direction) => {
    const currentDate = new Date(selectedDate);
    if (direction === 'prev') {
      currentDate.setDate(currentDate.getDate() - 1); // Сдвиг на -1 день
    } else if (direction === 'next') {
      currentDate.setDate(currentDate.getDate() + 1); // Сдвиг на +1 день
    }
    setSelectedDate(currentDate.toISOString().slice(0, 10)); // Обновляем состояние
  };

  // Генерация слотов времени с 08:00 до 22:00 с интервалом 30 минут
  const timeSlots = generateTimeSlots('08:00', '22:00', 30);

  return (
    <div className="homePage">
      <header>
        {/* Выбор даты */}
        <div className="dateSelect">
          <button className="slideDate" onClick={() => changeDate('prev')}>
            <img src={lDateChange} alt="Previous" className="icon" />
          </button>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button className="slideDate" onClick={() => changeDate('next')}>
            <img src={rDateChange} alt="Next" className="icon" />
          </button>
        </div>
      </header>

      <main>
        <div className="container">
          {/* Обработка загрузки и ошибок */}
          {loading ? (
            <div>Загрузка данных...</div>
          ) : error ? (
            <div className="error">Ошибка: {error}</div>
          ) : (
            <MeetingRoomTable
              timeSlots={timeSlots}
              selectedDate={selectedDate}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
