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

function RetiroNequi() {
  const [celular, setCelular] = useState("");
  const [clave, setClave] = useState("");
  const [mostrarClave, setMostrarClave] = useState(false);
  const [reporte, setReporte] = useState("");
  const [resultado, setResultado] = useState(null);
  const [monto, setMonto] = useState("");

  // Generar clave aleatoria de 6 dígitos
  const generarClave = () => {
    const claveGenerada = Math.floor(100000 + Math.random() * 900000);
    setClave(claveGenerada.toString());
    setMostrarClave(true);

    // Ocultar en 60 segundos
    setTimeout(() => {
      setMostrarClave(false);
      setClave("");
    }, 60000);
  };

  const manejarRetiro = () => {
    if (!/^\d{10}$/.test(celular)) {
      alert("El número debe tener exactamente 10 dígitos numéricos.");
      return;
    }

    // Generar clave y reporte
    generarClave();
    setReporte("0" + celular);

    // Validar monto
    const validacion = validarMonto(Number(monto));
    if (!validacion.valido) {
      alert(validacion.mensaje);
      return;
    }

    // Procesar acarreo
    const resultadoAcarreo = acarreo(matrizBilletes, Number(monto));
    setResultado(resultadoAcarreo);
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>Retiro Nequi</h2>

      <input
        type="text"
        placeholder="Número de celular (10 dígitos)"
        value={celular}
        onChange={(e) => setCelular(e.target.value)}
        maxLength={10}
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

      {mostrarClave && (
        <div style={{ marginTop: "10px", color: "green" }}>
          <strong>Clave temporal: {clave}</strong>
          <p>(Visible por 60 segundos)</p>
        </div>
      )}

      {reporte && <p>Número con 11 dígitos: {reporte}</p>}

      {resultado && resultado.exito ? (
        <Billetes billetes={resultado.billetes} />
      ) : resultado && !resultado.exito ? (
        <p style={{ color: "red" }}>No se pudo completar el retiro</p>
      ) : null}
    </div>
  );
}

export default RetiroNequi;
