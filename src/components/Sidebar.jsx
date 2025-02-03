import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom'; // Импорт Link и NavLink
import './style/Sidebar.css';

import Logo from '../assets/Logo.svg';
import Profile from '../assets/profilePic.svg';
import Home from '../assets/Home.svg';
import Building from '../assets/Building.svg';
import Calendar from '../assets/Calendar.svg';
import Logout from '../assets/Logout.svg';
import { getMyInfo } from '../api/api';

function Sidebar() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Функция для получения данных пользователя
    const fetchUserInfo = async () => {
      try {
        const data = await getMyInfo(); // Предполагается, что getMyInfo возвращает промис
        setUserInfo(data);
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
      }
    };

    fetchUserInfo();
  }, []); // Пустой массив зависимостей, чтобы выполнить только один раз при монтировании компонента

  return (
    <div className="sidebar">
      {/* Логотип и название */}
      <div className="sidebar-header">
        <img src={Logo} alt="Logo" className="logo" />
      </div>

      {/* Фото и имя */}
      <div className="sidebar-user">
        <img src={Profile} alt="User" className="profile-photo" />
        <p className="user-name">
          {userInfo ? userInfo.first_name : 'Загрузка...'}
        </p>
      </div>

      {/* Навигационные разделы */}
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              <img src={Home} alt="" className="icon" />
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rooms"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              <img src={Building} alt="" className="icon" />
              Аудитории
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reservations"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              <img src={Calendar} alt="" className="icon" />
              Мои бронирования
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Кнопка выхода */}
      <div className="sidebar-footer">
        <Link to="/logout" className="logout">
          <img src={Logout} alt="" className="icon" />
          Выйти
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
