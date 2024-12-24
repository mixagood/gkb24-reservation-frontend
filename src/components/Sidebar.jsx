import React from "react";
import "./style/Sidebar.css"; // Подключаем стили для Sidebar

import Logo from "../assets/Logo.svg";
import Profile from "../assets/profilePic.svg";

function Sidebar() {
  return (
    <div className="sidebar">
      {/* Логотип и название */}
      <div className="sidebar-header">
        <img src={Logo} alt="Logo" className="logo" />
      </div>

      {/* Фото и имя */}
      <div className="sidebar-user">
        <img src={Profile} alt="User" className="profile-photo" />
        <p className="user-name">Иван Иванов</p>
      </div>

      {/* Навигационные разделы */}
      <nav className="sidebar-nav">
        <ul>
          <li>
            <a href="#home">Главная</a>
          </li>
          <li>
            <a href="#rooms">Аудитории</a>
          </li>
          <li>
            <a href="#calendar">Календарь</a>
          </li>
        </ul>
      </nav>

      {/* Кнопка выхода */}
      <div className="sidebar-footer">
        <a href="#logout" className="logout">
          Выйти
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
