import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function TelegramLogin() {
  const { login } = useAuth();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?7';
    script.async = true;
    script.setAttribute('data-telegram-login', 'GKB24RoomBookingBot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-auth-url', 'http://helpdesk.m11.dzm/booking');
    script.setAttribute('data-request-access', 'write');

    document.getElementById('telegram-login-container').appendChild(script);

    // Функция обработки данных от бэкенда (примерно так)
    window.addEventListener('message', (event) => {
      if (event.data && event.data.user) {
        login(event.data.user); // Сохраняем пользователя в контексте
      }
    });

    return () => {
      document.getElementById('telegram-login-container').innerHTML = '';
    };
  }, [login]);

  return <div id="telegram-login-container"></div>;
}

export default TelegramLogin;
