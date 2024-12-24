import React, { useState } from "react";
import CalendarComponent from "../components/CalendarComponent";
import TimeSlotsComponent from "../components/TimeSlotsComponent";
import RoomsListComponent from "../components/RoomsListComponent";
import { getReservationsByRoom } from "../api/api";

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookedSlots, setBookedSlots] = useState();

  const handleDateClick = (date) => {
    console.log("Выбрана дата:", date);
    setSelectedDate(date);
    fetchBookedSlots(selectedRoom, date);
  };

  const handleRoomSelect = (room) => {
    console.log("Выбрана аудитория с ID:", room);
    setSelectedRoom(room); // Сохраняем выбранную аудиторию
    fetchBookedSlots(room, selectedDate);
  };

  // Функция для загрузки занятых слотов (заглушка для API)
  const fetchBookedSlots = (audience, date) => {
    console.log(
      `Загрузка слотов для ${audience.id} на ${date.toLocaleDateString(
        "ru-RU"
      )}`
    );
    // Здесь может быть запрос к серверу
    if (audience && date) {
      const res = getReservationsByRoom(audience.id);

      setBookedSlots(["10:00 - 11:00", "14:00 - 15:00"]); // Тестовые занятые слоты
    } else {
      setBookedSlots([]);
    }
  };

  // Обработка клика на временной слот
  const handleSlotClick = (slot) => {
    alert(
      `Вы выбрали слот: ${slot} на ${selectedDate.toLocaleDateString("ru-RU")}`
    );
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "300px",
          borderRight: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <RoomsListComponent onRoomSelect={handleRoomSelect} />
      </div>

      {/* Календарь */}
      <div style={{ flex: "1" }}>
        <h2>Календарь для </h2>
        <CalendarComponent onDateClick={handleDateClick} />
      </div>

      {/* Временные слоты */}
      <div style={{ flex: "2" }}>
        {selectedRoom ? (
          <TimeSlotsComponent
            selectedDate={selectedDate}
            bookedSlots={bookedSlots}
            onSlotClick={handleSlotClick}
          />
        ) : (
          <p>Выберите аудиторию</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
