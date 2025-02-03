// import {} from '../config.js';

export function generateTimeSlots(startTime, endTime, intervalMinutes) {
  const slots = [];
  let currentTime = new Date(`1970-01-01T${startTime}:00`);

  while (currentTime <= new Date(`1970-01-01T${endTime}:00`)) {
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    slots.push(`${hours}:${minutes}`);
    currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
  }

  return slots;
}
