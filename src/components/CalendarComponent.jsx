import React, { useState, useEffect } from "react";

function CalendarComponent({ onDateClick }) {
  const [currentWeek, setCurrentWeek] = useState([]);
  const [selectedAudience, setSelectedAudience] = useState(""); // Состояние для выбранной аудитории

  useEffect(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Понедельник текущей недели

    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }

    setCurrentWeek(week);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.calendarContainer}>
        {currentWeek.map((day, index) => (
          <div
            key={index}
            style={styles.dayContainer}
            onClick={() => onDateClick(day)}
          >
            <p style={styles.dayLabel}>
              {day.toLocaleDateString("ru-RU", { weekday: "short" })}
            </p>
            <p style={styles.dateLabel}>{day.getDate()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "10px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  audienceSelector: {
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  calendarContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  dayContainer: {
    flex: 1,
    textAlign: "center",
    cursor: "pointer",
    padding: "10px",
    margin: "0 5px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    transition: "background-color 0.3s",
  },
  dayLabel: {
    margin: 0,
    fontWeight: "bold",
    color: "#333",
  },
  dateLabel: {
    margin: 0,
    fontSize: "14px",
    color: "#666",
  },
};

export default CalendarComponent;
