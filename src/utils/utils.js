import { cachedTimeSlots, startHour, endHour } from "../config.js";

// Дата, начало, конец, величина слота
// Генерируем слоты на дату
const generateDaySlots = (date, startHour, endHour, slotDurationMinutes) => {
  const slots = [];
  const slotDurationMs = slotDurationMinutes * 60 * 1000;

  date.setHours(startHour);
  const dayStartMs = date.getTime();

  const dayEndMs = new Date(dayEnd).getTime();

  for (
    let current = dayStartMs;
    current < dayEndMs;
    current += slotDurationMs
  ) {
    slots.push({
      start: current,
      end: current + slotDurationMs,
    });
  }

  return slots;
};

const filterAvailableSlots = (daySlots, reservations) => {
  const reservedIntervals = reservations.map((reservation) => ({
    from: new Date(reservation.from_reserve).getTime(),
    to: new Date(reservation.to_reserve).getTime(),
  }));

  return daySlots.filter(
    (slot) =>
      !reservedIntervals.some(
        (interval) => slot.start < interval.to && slot.end > interval.from
      )
  );
};

// Использование
//   const daySlots = generateDaySlots("2024-12-22T08:00", "2024-12-22T20:00", 30);
//   const availableSlots = filterAvailableSlots(daySlots, reservations);
