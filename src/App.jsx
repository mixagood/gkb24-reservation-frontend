import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SearchPanel from './components/SearchPanel';
import ProtectedRoute from './components/ProtectedRoute'; // Импортируем защиту маршрутов
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import ReservationsPage from './pages/ReservationsPage';
import LoginPage from './pages/LoginPage'; // Добавляем страницу логина
import { AuthProvider } from './context/AuthContext';
import { ReservationProvider } from './context/ReservationContext';

import './components/style/App.css';

function App() {
  return (
    <AuthProvider>
      <ReservationProvider>
        <div className="layout">
          <Sidebar />
          <div className="header">
            <SearchPanel />
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/rooms" element={<RoomsPage />} />
              <Route path="/reservations" element={<ReservationsPage />} />
            </Routes>
          </div>
        </div>
      </ReservationProvider>
    </AuthProvider>
  );
}

export default App;

// function App() {
//   return (
//     <AuthProvider>
//       <ReservationProvider>
//         <Routes>
//           {/* Отдельный маршрут для LoginPage без Sidebar */}
//           <Route path="/login" element={<LoginPage />} />

//           {/* Все остальные страницы в общем макете */}
//           <Route
//             path="/*"
//             element={
//               <div className="layout">
//                 <Sidebar />
//                 <div className="header">
//                   <SearchPanel />
//                 </div>
//                 <div className="content">
//                   <Routes>
//                     <Route
//                       path="/"
//                       element={
//                         <ProtectedRoute>
//                           <HomePage />
//                         </ProtectedRoute>
//                       }
//                     />
//                     <Route
//                       path="/rooms"
//                       element={
//                         <ProtectedRoute>
//                           <RoomsPage />
//                         </ProtectedRoute>
//                       }
//                     />
//                     <Route
//                       path="/reservations"
//                       element={
//                         <ProtectedRoute>
//                           <ReservationsPage />
//                         </ProtectedRoute>
//                       }
//                     />
//                   </Routes>
//                 </div>
//               </div>
//             }
//           />
//         </Routes>
//       </ReservationProvider>
//     </AuthProvider>
//   );
// }

// export default App;
