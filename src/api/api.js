import {
  getAuthToken,
  getStoredToken,
  refreshToken,
  removeToken,
} from './auth';

const BASE_URL = 'http://127.0.0.1:8000';

async function fetchAPI(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const token = getStoredToken();

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...options.headers,
      },
      ...options,
    });

    if (response.status === 401) {
      // Токен истек — пробуем обновить его
      console.warn('Токен истек. Попытка обновления...');
      const newToken = await refreshToken(); // Предполагается, что у вас есть refresh-токен

      if (newToken) {
        // Повторяем запрос с новым токеном
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        };
        return await fetchAPI(endpoint, options); // Повторяем запрос
      } else {
        console.error(
          'Не удалось обновить токен. Пользователю требуется повторный вход.'
        );
        removeToken();
        throw new Error('Токен истек, требуется авторизация');
      }
    }

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка при запросе:', error.message);
    throw error;
  }
}

export async function getMyInfo() {
  return fetchAPI(`/users/me`, {
    method: 'GET',
  });
}

export async function getReservationsByRoom(roomId) {
  return fetchAPI(`/meeting_rooms/${roomId}/reservations`, {
    method: 'GET',
  });
}

// Занятые комнаты
export async function getReservations() {
  return fetchAPI(`/reservations`, {
    method: 'GET',
  });
}

// Получить бронирования пользователя
export async function getUserReservations() {
  return fetchAPI(`/reservations/my_reservations`, {
    method: 'GET',
  });
}

//
export async function getMeetingRooms() {
  return fetchAPI(`/meeting_rooms`, {
    method: 'GET',
  });
}

export async function patchReservation(reservationId, fromReserve, toReserve) {
  if (!(fromReserve instanceof Date)) fromReserve = new Date(fromReserve);
  if (!(toReserve instanceof Date)) toReserve = new Date(toReserve);
  const fromFormated = `${fromReserve.getFullYear()}-${String(
    fromReserve.getMonth() + 1
  ).padStart(2, '0')}-${String(fromReserve.getDate()).padStart(
    2,
    '0'
  )}T${String(fromReserve.getHours()).padStart(2, '0')}:${String(
    fromReserve.getMinutes()
  ).padStart(2, '0')}`;
  const minusMinute = new Date(toReserve);
  minusMinute.setMinutes(minusMinute.getMinutes() - 1);
  const toFormated = `${minusMinute.getFullYear()}-${String(
    minusMinute.getMonth() + 1
  ).padStart(2, '0')}-${String(minusMinute.getDate()).padStart(
    2,
    '0'
  )}T${String(minusMinute.getHours()).padStart(2, '0')}:${String(
    minusMinute.getMinutes()
  ).padStart(2, '0')}`;

  const reqBody = {
    from_reserve: fromFormated,
    to_reserve: toFormated,
  };

  console.log(reservationId, reqBody);

  return fetchAPI(`/reservations/${reservationId}`, {
    method: 'PATCH',
    body: JSON.stringify(reqBody),
  });
}

export async function bookRoom(roomId, theme, fromReserve, toReserve) {
  const fromFormated = `${fromReserve.getFullYear()}-${String(
    fromReserve.getMonth() + 1
  ).padStart(2, '0')}-${String(fromReserve.getDate()).padStart(
    2,
    '0'
  )}T${String(fromReserve.getHours()).padStart(2, '0')}:${String(
    fromReserve.getMinutes()
  ).padStart(2, '0')}`;
  const minusMinute = new Date(toReserve);
  minusMinute.setMinutes(minusMinute.getMinutes() - 1);
  const toFormated = `${minusMinute.getFullYear()}-${String(
    minusMinute.getMonth() + 1
  ).padStart(2, '0')}-${String(minusMinute.getDate()).padStart(
    2,
    '0'
  )}T${String(minusMinute.getHours()).padStart(2, '0')}:${String(
    minusMinute.getMinutes()
  ).padStart(2, '0')}`;
  const roomIdFormated = Number(roomId);

  const reqBody = {
    from_reserve: fromFormated,
    to_reserve: toFormated,
    meetingroom_id: roomIdFormated,
    comment: theme,
  };

  return fetchAPI(`/reservations`, {
    method: 'POST',
    body: JSON.stringify(reqBody),
  });
}

export async function deleteReservation(reservationId) {
  return fetchAPI(`/reservations/${reservationId}`, {
    method: 'DELETE',
  });
}
