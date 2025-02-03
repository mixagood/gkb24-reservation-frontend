import React, { useState, useEffect } from 'react';
import {
  getReservations,
  getMyInfo,
  deleteReservation,
  getMeetingRooms,
} from '../api/api';
import EditBookingModal from './EditBookingModal'; // Импортируем компонент модального окна
import './style/MeetingRoomTable.css';
import { useReservations } from '../ReservationContext';

import DeleteBucket from '../assets/DeleteBucket.svg';
import Edit from '../assets/Edit.svg';
import Clock from '../assets/Clock.svg';

const MeetingRoomTable = ({ selectedDate, timeSlots }) => {
  const [filteredReservations, setFilteredReservations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [editingReservation, setEditingReservation] = useState(null); // Состояние для модального окна

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        setError(null);

        const userInfo = await getMyInfo();
        setCurrentUserId(userInfo.id);

        const reservations = await getReservations();
        console.log(reservations);

        const filtered = reservations.filter((reservation) => {
          const reservationDate = new Date(reservation.from_reserve);
          const selectedDateObj = new Date(selectedDate);

          return (
            reservationDate.toDateString() === selectedDateObj.toDateString()
          );
        });

        const rooms = await getMeetingRooms();
        console.log(rooms);
        const reservationsByRoom = {};
        rooms.forEach((room) => {
          reservationsByRoom[room.id] = new Array(timeSlots.length).fill(null);
        });

        filtered.forEach((reservation) => {
          const from = new Date(reservation.from_reserve);
          const to = new Date(reservation.to_reserve);
          const roomId = reservation.meetingroom_id;

          if (rooms.some((room) => room.id === roomId)) {
            // if (rooms.includes(roomId)) {
            const fromIndex = timeSlots.findIndex((slot) => {
              const [hours, minutes] = slot.split(':').map(Number);
              const slotTime = new Date(1970, 0, 1, hours, minutes);
              return (
                slotTime.getHours() === from.getHours() &&
                slotTime.getMinutes() === from.getMinutes()
              );
            });

            const toIndex = timeSlots.findIndex((slot) => {
              const [hours, minutes] = slot.split(':').map(Number);
              const slotTime = new Date(1970, 0, 1, hours, minutes);
              return (
                slotTime.getHours() === to.getHours() &&
                slotTime.getMinutes() === to.getMinutes() - 29
              );
            });

            for (let i = fromIndex; i <= toIndex; i++) {
              reservationsByRoom[roomId][i] = {
                userId: reservation.user_id,
                from: reservation.from_reserve,
                to: reservation.to_reserve,
                id: reservation.id,
                userName: `User ${reservation.user_id}`,
                comment: reservation.comment,
                rowSpan: toIndex - fromIndex + 1,
              };
            }
          }
        });

        setFilteredReservations({ reservationsByRoom, rooms });
      } catch (error) {
        setError(`Ошибка при загрузке данных: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [selectedDate, timeSlots]);

  const handleDelete = async (reservationId) => {
    try {
      await deleteReservation(reservationId);
      alert('Бронирование удалено!');
    } catch (error) {
      alert('Ошибка при удалении бронирования.');
    }
  };

  const handleEdit = (reservation) => {
    setEditingReservation(reservation); // Открываем модальное окно
  };

  const closeEditModal = () => {
    setEditingReservation(null); // Закрываем модальное окно
  };

  const isUserReservation = (reservation) => {
    return reservation.userId === currentUserId;
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="clear">
      <table>
        <thead>
          <tr>
            <th className="timeCol">
              <img src={Clock} alt="Время"></img>
            </th>
            {filteredReservations.rooms.map((room, index) => (
              <th key={index}>{room.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, index) => {
            return (
              <tr key={slot}>
                <td>{slot}</td>
                {filteredReservations.rooms.map((room) => {
                  const reservation =
                    filteredReservations.reservationsByRoom[room.id][index];

                  if (reservation) {
                    const from = new Date(reservation.from);
                    const to = new Date(reservation.to);
                    const fromIndex = timeSlots.findIndex((slotTime) => {
                      const [hours, minutes] = slotTime.split(':').map(Number);
                      const slotDate = new Date(1970, 0, 1, hours, minutes);
                      return (
                        slotDate.getHours() === from.getHours() &&
                        slotDate.getMinutes() === from.getMinutes()
                      );
                    });

                    const toIndex = timeSlots.findIndex((slotTime) => {
                      const [hours, minutes] = slotTime.split(':').map(Number);
                      const slotDate = new Date(1970, 0, 1, hours, minutes);
                      return (
                        slotDate.getHours() === to.getHours() &&
                        slotDate.getMinutes() === to.getMinutes() - 29
                      );
                    });

                    const rowSpan = toIndex - fromIndex + 1;

                    if (index === fromIndex) {
                      return (
                        <td
                          key={`${room.id}-${index}`}
                          rowSpan={rowSpan}
                          className={`occupied ${
                            isUserReservation(reservation)
                              ? 'user-reservation'
                              : 'other-reservation'
                          }`}
                        >
                          <div className="reservation-info">
                            <div>
                              {reservation.from.substring(11, 16)} —{' '}
                              {reservation.to.substring(11, 16)} {'   '}
                              {reservation.comment}
                            </div>
                            {isUserReservation(reservation) && (
                              <div className="reservation-actions">
                                <button onClick={() => handleEdit(reservation)}>
                                  <img src={Edit} alt="e"></img>
                                </button>
                                <button
                                  onClick={() => handleDelete(reservation.id)}
                                >
                                  <img src={DeleteBucket} alt="x"></img>
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    } else {
                      return null;
                    }
                  }

                  return (
                    <td key={`${room.id}-${index}`} className="free">
                      {/* Свободно */}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Модальное окно для редактирования */}
      {editingReservation && (
        <EditBookingModal
          reservation={editingReservation}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

// export default MeetingRoomTable;
