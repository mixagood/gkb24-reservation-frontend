import React, { useState, useEffect } from "react";
import { getMeetingRooms } from "../api/api";

function RoomsListComponent({ onRoomSelect }) {
  const [rooms, setRooms] = useState([]); // Состояние для списка аудиторий
  const [loading, setLoading] = useState(true); // Состояние для индикатора загрузки
  const [error, setError] = useState(null); // Состояние для ошибок
  const [selectedRoom, setSelectedRoom] = useState(""); // Состояние для выбранной аудитории

  // Загрузка аудиторий при монтировании компонента
  useEffect(() => {
    async function fetchRooms() {
      try {
        const roomsData = await getMeetingRooms(); // Получаем данные с API

        setRooms(roomsData); // Обновляем состояние
      } catch (err) {
        setError(err.message); // Обрабатываем ошибку
      } finally {
        setLoading(false); // Завершаем загрузку
      }
    }

    fetchRooms();
  }, [onRoomSelect]);

  const handleRoomChange = (event) => {
    const roomId = Number(event.target.value);
    setSelectedRoom(roomId);

    // console.log(`Выбрана ${roomId}`)

    const selectedRoomObject = rooms.find((room) => room.id === roomId);

    console.log(rooms);
    console.log(`${selectedRoomObject}`);

    if (selectedRoomObject) {
      onRoomSelect(selectedRoomObject); // Передаем объект аудитории родителю
    }
  };

  if (loading) return <p>Загрузка аудиторий...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div>
      <h3>Список аудиторий</h3>
      <select
        id="roomSelector"
        value={selectedRoom}
        onChange={handleRoomChange}
      >
        {rooms.map((room) => (
          <option key={room.id} value={room.id}>
            {room.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RoomsListComponent;
