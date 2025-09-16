import React, { useState } from "react";
import { validarMonto } from "../utils/ValidarMonto";
import { acarreo } from "../utils/acarreo";
import Billetes from "./Billetes";
import "../styles/RetiroAhorro.css"; // Importamos el CSS

const matrizBilletes = [
  [10000, 20000, 50000, 100000],
  [10000, 20000, 50000, 100000],
  [10000, 20000, 50000, 100000],
  [10000, 20000, 50000, 100000],
];

function RetiroAhorro() {
  const [numero, setNumero] = useState("");
  const [clave, setClave] = useState("");
  const [monto, setMonto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [resultado, setResultado] = useState(null);

  const manejarRetiro = () => {
    if (!/^\d{11}$/.test(numero)) {
      setMensaje("El número debe tener exactamente 11 dígitos.");
      return;
    }
    if (!/^[01]3/.test(numero)) {
      setMensaje("El número debe empezar por 03 o 13.");
      return;
    }
    if (!/^\d{4}$/.test(clave)) {
      setMensaje("La clave debe tener 4 dígitos.");
      return;
    }

    const validacion = validarMonto(Number(monto));
    if (!validacion.valido) {
      setMensaje(validacion.mensaje);
      return;
    }

    const resultadoAcarreo = acarreo(matrizBilletes, Number(monto));
    setResultado(resultadoAcarreo);
    setMensaje("Retiro procesado correctamente.");
  };

  return (
    <div className="retiro-card">
      <h2 className="retiro-title">Retiro Ahorro a la Mano</h2>

      <div className="retiro-form">
        <input
          type="text"
          placeholder="Número (11 dígitos)"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          maxLength={11}
          className="retiro-input"
        />

        <input
          type="password"
          placeholder="Clave (4 dígitos)"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          maxLength={4}
          className="retiro-input"
        />

        <input
          type="number"
          placeholder="Monto a retirar"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="retiro-input"
        />

        <button onClick={manejarRetiro} className="retiro-btn">
          Retirar
        </button>
      </div>

      <p className="retiro-msg">{mensaje}</p>

      {resultado && resultado.exito ? (
        <Billetes billetes={resultado.billetes} />
      ) : resultado && !resultado.exito ? (
        <p className="retiro-error">No se pudo completar el retiro</p>
      ) : null}
    </div>
  );
}

export default RetiroAhorro;
  