import React, { useState } from "react";
import RetiroNequi from "./components/RetiroNequi";
import RetiroAhorro from "./components/RetiroAhorro";
import RetiroCuenta from "./components/RetiroCuenta";
import "./styles/menu.css"; // importamos el css

function App() {
  const [opcion, setOpcion] = useState(null);

  return (
    <div className="app-container">
      <h1 className="titulo">Cajero Automático</h1>

      {!opcion && (
        <div className="menu-container">
          {/* Tarjeta Nequi */}
          <div className="menu-card" onClick={() => setOpcion("nequi")}>
            <img src="/iconos/nequi.png" alt="Nequi" className="menu-img" />
            <h3 className="menu-title">Retiro Nequi</h3>
            <p className="menu-text">Con celular y clave temporal</p>
          </div>

          {/* Tarjeta Ahorro */}
          <div className="menu-card" onClick={() => setOpcion("ahorro")}>
            <img src="/iconos/ahorro.png" alt="Ahorro" className="menu-img" />
            <h3 className="menu-title">Ahorro a la Mano</h3>
            <p className="menu-text">Con número especial y clave</p>
          </div>

          {/* Tarjeta Cuenta */}
          <div className="menu-card" onClick={() => setOpcion("cuenta")}>
            <img src="/iconos/cuenta.png" alt="Cuenta" className="menu-img" />
            <h3 className="menu-title">Cuenta de Ahorros</h3>
            <p className="menu-text">Con número de cuenta</p>
          </div>
        </div>
      )}

      <div className="retiro-container">
        {opcion === "nequi" && (
          <>
            <RetiroNequi />
            <button className="btn-volver" onClick={() => setOpcion(null)}>
              Volver
            </button>
          </>
        )}
        {opcion === "ahorro" && (
          <>
            <RetiroAhorro />
            <button className="btn-volver" onClick={() => setOpcion(null)}>
              Volver
            </button>
          </>
        )}
        {opcion === "cuenta" && (
          <>
            <RetiroCuenta />
            <button className="btn-volver" onClick={() => setOpcion(null)}>
              Volver
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
