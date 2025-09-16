import React, { useState } from "react";
import RetiroNequi from "./components/RetiroNequi";
import RetiroAhorro from "./components/RetiroAhorro";
import RetiroCuenta from "./components/RetiroCuenta";

function App() {
  const [opcion, setOpcion] = useState(null);

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1>Cajero Automático</h1>

      {/* Mostrar menú si no se eligió opción */}
      {!opcion && (
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px" }}>
          {/* Tarjeta Nequi */}
          <div
            onClick={() => setOpcion("nequi")}
            style={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "20px",
              width: "200px",
              cursor: "pointer",
              background: "#f8f8f8",
            }}
          >
            <h3>Retiro Nequi</h3>
            <p>Con celular y clave temporal</p>
          </div>

          {/* Tarjeta Ahorro */}
          <div
            onClick={() => setOpcion("ahorro")}
            style={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "20px",
              width: "200px",
              cursor: "pointer",
              background: "#f8f8f8",
            }}
          >
            <h3>Ahorro a la Mano</h3>
            <p>Con número especial y clave</p>
          </div>

          {/* Tarjeta Cuenta */}
          <div
            onClick={() => setOpcion("cuenta")}
            style={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "20px",
              width: "200px",
              cursor: "pointer",
              background: "#f8f8f8",
            }}
          >
            <h3>Cuenta de Ahorros</h3>
            <p>Con número de cuenta</p>
          </div>
        </div>
      )}

      {/* Mostrar el componente según la opción */}
      <div style={{ marginTop: "40px" }}>
        {opcion === "nequi" && (
          <>
            <RetiroNequi />
            <button onClick={() => setOpcion(null)} style={{ marginTop: "20px" }}>
              Volver
            </button>
          </>
        )}
        {opcion === "ahorro" && (
          <>
            <RetiroAhorro />
            <button onClick={() => setOpcion(null)} style={{ marginTop: "20px" }}>
              Volver
            </button>
          </>
        )}
        {opcion === "cuenta" && (
          <>
            <RetiroCuenta />
            <button onClick={() => setOpcion(null)} style={{ marginTop: "20px" }}>
              Volver
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
