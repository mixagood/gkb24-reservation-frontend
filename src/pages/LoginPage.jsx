import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TelegramLogin from '../components/TelegramLogin';

function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/'); // После входа редирект на главную
    }
  }, [user, navigate]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <h2>Войдите через Telegram</h2>
      <TelegramLogin />
    </div>
  );
}

export default LoginPage;
