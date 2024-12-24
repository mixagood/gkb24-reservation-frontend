import React from "react";
import HomePage from "./pages/HomePage.jsx";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app">
      <div style={{ display: "flex" }}>
        <Sidebar />
        {/* Здесь можно добавить навигацию, заголовок или другие общие элементы */}

        {/* Основной контент */}
        <div style={{ marginLeft: "212px", padding: "20px", flex: 1 }}>
          <main>
            <HomePage />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
