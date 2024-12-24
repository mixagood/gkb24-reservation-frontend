import React from "react";

function TimeSlotsComponent({ selectedDate, bookedSlots, onSlotClick }) {
  // Генерация временных слотов (например, с 9:00 до 18:00, каждый час)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 18; hour++) {
      slots.push(`${hour}:00 - ${hour + 1}:00`);
    }
    return slots;
  };

  function getCachedTimeslotsCurMonth() {
    if (
      !cachedTimeSlots ||
      cachedTimeSlots.timestamp < Date.now() - 24 * 60 * 60 * 1000
    ) {
      cachedTimeSlots = { slots: {}, timestamp: null };
      const now = new Date(); // Текущая дата
      const year = now.getFullYear();
      const month = now.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let day = now.getDate(); day <= daysInMonth; day++) {
        const slots = [];

        const currentDay = new Date(year, month, day);

        // Начинаем с указанного часа и идем по 30 минут
        let currentTime = new Date(currentDay).setHours(startHour, 0, 0, 0);
        const endTime = new Date(currentDay).setHours(endHour, 0, 0, 0);

        while (currentTime <= endTime) {
          slots.push(new Date(currentTime));
          currentTime += 30 * 60 * 1000; // Переходим к следующему интервалу
        }

        cachedTimeSlots.slots[day] = slots; // Привязываем слоты к конкретному дню
      }

      cachedTimeSlots.timestamp = Date.now();
    }

    return cachedTimeSlots.slots;
  }

  const timeSlots = getCachedTimeslotsCurMonth();
  // const timeSlots = generateTimeSlots();

  return (
    <div style={styles.container}>
      <h3>
        Доступные временные слоты на {selectedDate.toLocaleDateString("ru-RU")}:
      </h3>
      <div style={styles.slotsContainer}>
        {timeSlots.map((slot, index) => {
          const isBooked = bookedSlots.includes(slot);

          return (
            <div
              key={index}
              style={{
                ...styles.slot,
                backgroundColor: isBooked ? "#ccc" : "#e3f2fd",
                cursor: isBooked ? "not-allowed" : "pointer",
                color: isBooked ? "#888" : "#000",
              }}
              onClick={() => !isBooked && onSlotClick(slot)} // Обрабатываем клики только для свободных слотов
            >
              {slot}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  slotsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    marginTop: "10px",
  },
  slot: {
    padding: "10px",
    borderRadius: "5px",
    textAlign: "center",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
};

export default TimeSlotsComponent;
