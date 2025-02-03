import React, { createContext, useContext, useState } from 'react';
import { getReservations } from '../api/api'; // Импортируем функцию для загрузки данных

const ReservationContext = createContext();

export const useReservations = () => {
  return useContext(ReservationContext);
};

export const ReservationProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Функция для загрузки и обновления данных
  const updateReservations = async () => {
    try {
      setLoading(true);
      const data = await getReservations(); // Загружаем данные с сервера
      setReservations(data); // Обновляем состояние контекста
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Значение контекста
  const value = {
    reservations,
    loading,
    error,
    setReservations, // Передаем setReservations
    updateReservations, // Передаем функцию для обновления данных
  };

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
};
