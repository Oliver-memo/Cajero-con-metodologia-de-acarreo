import React, { useState } from "react";
import { validarMonto } from "../utils/ValidarMonto";
import { acarreo } from "../utils/acarreo";
import Billetes from "./Billetes";

const matrizBilletes = [
  [10000, 20000, 50000, 100000],
  [10000, 20000, 50000, 100000],
  [10000, 20000, 50000, 100000],
  [10000, 20000, 50000, 100000],
];

function RetiroCuenta() {
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
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>Retiro Cuenta de Ahorros</h2>

      <input
        type="text"
        placeholder="Número de cuenta (11 dígitos)"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        maxLength={11}
      />

      <input
        type="password"
        placeholder="Clave (4 dígitos)"
        value={clave}
        onChange={(e) => setClave(e.target.value)}
        maxLength={4}
        style={{ marginLeft: "10px" }}
      />

      <input
        type="number"
        placeholder="Monto a retirar"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        style={{ marginLeft: "10px" }}
      />

      <button onClick={manejarRetiro} style={{ marginLeft: "10px" }}>
        Retirar
      </button>

      <p style={{ marginTop: "10px", color: "blue" }}>{mensaje}</p>

      {resultado && resultado.exito ? (
        <Billetes billetes={resultado.billetes} />
      ) : resultado && !resultado.exito ? (
        <p style={{ color: "red" }}>No se pudo completar el retiro</p>
      ) : null}
    </div>
  );
}

export default RetiroCuenta;
