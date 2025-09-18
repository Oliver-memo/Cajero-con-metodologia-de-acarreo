import React, { useState, useEffect } from "react";
import CalculadoraAcarreo from "../models/CalculadoraAcarreo";
import GeneradorClaves from "../models/GeneradorClaves";
import TipoRetiro from "../models/TipoRetiro";
import TransaccionRetiro from "../models/TransaccionRetiro";
import ConfirmacionRetiro from "./ConfirmacionRetiros";
import "../css/CajeroAutomatico.css";

const CajeroAutomatico = () => {
  const [tipoRetiro, setTipoRetiroState] = useState(null);
  const [numero, setNumero] = useState('');
  const [clave, setClave] = useState('');
  const [monto, setMonto] = useState('');
  const [claveVisible, setClaveVisible] = useState('');
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');
  const [paso, setPaso] = useState('inicio');
  const [billetesPrevios, setBilletesPrevios] = useState(null);

  const [calculadoraAcarreo] = useState(() => new CalculadoraAcarreo());

  const montosDisponibles = [10000, 20000, 30000, 50000, 100000, 200000, 300000, 500000];

  useEffect(() => {
    let timer;
    if (tiempoRestante > 0) {
      timer = setTimeout(() => {
        setTiempoRestante((prev) => prev - 1);
      }, 1000);
    } else if (tiempoRestante === 0 && claveVisible) {
      generarClave();
    }
    return () => clearTimeout(timer);
  }, [tiempoRestante, claveVisible]);


  const generarClave = () => {
    const nuevaClave = GeneradorClaves.generarClaveNequi();
    setClaveVisible(nuevaClave);
    setTiempoRestante(60);
  };

  const seleccionarTipo = (tipo) => {
    setTipoRetiroState(tipo);
    setPaso('datos');
    if (tipo === 'nequi') {
      generarClave();
    }
  };

  const validarDatos = () => {
    setError('');

    const tipoRetiroObj = new TipoRetiro(tipoRetiro, numero, clave, claveVisible);
    const resultadoValidacion = tipoRetiroObj.validar();

    if (!resultadoValidacion.valido) {
      setError(resultadoValidacion.mensaje);
      return;
    }

    setPaso('monto');
  };


  const mostrarConfirmacion = () => {
    setError('');
    const montoNum = parseInt(monto);
    if (montoNum > 10000000) {
      setError("El monto máximo permitido es de $10.000.000");
      return;
    }
    if (!calculadoraAcarreo.validarMonto(montoNum)) {
      setError('La cantidad digitada no es posible de entregar recueerda que solo se entregar billetes de $10.000, $20.000, $50.000 y $100.000');
      return;
    }

    const billetes = calculadoraAcarreo.calcularBilletes(montoNum);
    if (!billetes) {
      setError(`No se puede entregar $${montoNum.toLocaleString()}.`);
      setTimeout(() => reiniciar(), 3000);
      return;
    }

    setBilletesPrevios(billetes);
    setPaso('confirmacion');
  };

  const procesarRetiro = () => {
    try {
      const tipoRetiroObj = new TipoRetiro(tipoRetiro, numero, clave, claveVisible);
      const transaccion = new TransaccionRetiro(tipoRetiroObj, parseInt(monto), calculadoraAcarreo);

      const resultadoTransaccion = transaccion.procesar();
      setResultado(resultadoTransaccion);
      setPaso('resultado');
    } catch (error) {
      setError(error.message);
      if (error.message.includes('No se puede entregar')) {
        setTimeout(() => reiniciar(), 3000);
      }
    }
  };

  const reiniciar = () => {
    setTipoRetiroState(null);
    setNumero('');
    setClave('');
    setMonto('');
    setClaveVisible('');
    setTiempoRestante(0);
    setResultado(null);
    setError('');
    setPaso('inicio');
    setBilletesPrevios(null);
  };

  // Pantalla de inicio
  if (paso === 'inicio') {
    return (
      <div className="cajero-container">
        <div className="cajero-card">
          <h1>Cajero Automático</h1>
          <button onClick={() => seleccionarTipo('nequi')} className="cajero-btn btn-nequi">
            <img src="/iconos/nequi.png" alt=""  className="btn-icon"/>
            Retiro NEQUI
          </button>
          <button onClick={() => seleccionarTipo('ahorro-mano')} className="cajero-btn btn-ahorro">
            <img src="/iconos/ahorro.png" alt=""  className="btn-icon"/>
            Retiro Ahorro a la Mano
          </button>
          <button onClick={() => seleccionarTipo('cuenta-ahorros')} className="cajero-btn btn-cuenta">
            <img src="/iconos/cuenta.png" alt=""  className="btn-icon"/>
            Retiro Cuenta de Ahorros
          </button>
        </div>
      </div>
    );
  }

  // Pantalla de datos
  if (paso === 'datos') {
    return (
      <div className="cajero-container">
        <div className="cajero-card">
            <h2 className="cajero-title">
            {tipoRetiro === 'nequi' ? (
                <>
                <img src="/iconos/nequi.png" alt="Nequi" className="cajero-icon" />
                Retiro NEQUI
                </>
            ) : tipoRetiro === 'ahorro-mano' ? (
                <>
                <img src="/iconos/ahorro.png" alt="Ahorro a la Mano" className="cajero-icon" />
                Ahorro a la Mano
                </>
            ) : (
                <>
                <img src="/iconos/cuenta.png" alt="Cuenta de Ahorros" className="cajero-icon" />
                Cuenta de Ahorros
                </>
            )}
            </h2>


          {tipoRetiro === 'nequi' && claveVisible && (
            <div className="clave-box">
              <p>Clave temporal (válida por {tiempoRestante}s):</p>
              <p className="clave">{claveVisible}</p>
            </div>
          )}
            <small className="input-hint">
              Numero de Celular 
            </small>
            <input
              type="text"
              value={numero}
              onChange={(e) => setNumero(e.target.value.replace(/\D/g, ''))}
              placeholder="Número"
              className="cajero-input"
            />


          {(tipoRetiro === 'ahorro-mano' || tipoRetiro === 'cuenta-ahorros') && (
            
            <input
              type="password"
              value={clave}
              onChange={(e) => setClave(e.target.value.replace(/\D/g, ''))}
              placeholder="Clave (4 dígitos)"
              className="cajero-input"
            />
          )}

          {error && <div className="cajero-error">{error}</div>}

          <div className="btn-row">
            <button onClick={reiniciar} className="cajero-btn btn-secondary">Cancelar</button>
            <button onClick={validarDatos} className="cajero-btn btn-primary">Continuar</button>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de monto
  if (paso === 'monto') {
    return (
      <div className="cajero-container">
        <div className="cajero-card">
          <h2>Seleccionar Monto</h2>
          <div className="monto-grid">
            {montosDisponibles.map((montoOption) => (
              <button key={montoOption} onClick={() => setMonto(montoOption.toString())} className="cajero-btn btn-monto">
                ${montoOption.toLocaleString()}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={monto ? parseInt(monto).toLocaleString("es-CO") : ""}
            onChange={(e) => {
              const valor = e.target.value.replace(/\D/g, "");
              setMonto(valor);
            }}
            placeholder="Otro monto"
            className="cajero-input"
          />

          {error && <div className="cajero-error">{error}</div>}

          <div className="btn-row">
            <button onClick={() => setPaso('datos')} className="cajero-btn btn-secondary">Atrás</button>
            <button onClick={mostrarConfirmacion} className="cajero-btn btn-primary">Continuar</button>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla confirmación
  if (paso === 'confirmacion') {
    return (
      <div className="cajero-container">
        <div className="cajero-card">
          <ConfirmacionRetiro
            monto={parseInt(monto)}
            billetes={billetesPrevios}
            onConfirmar={procesarRetiro}
            onCancelar={() => setPaso('monto')}
            tipoRetiro={tipoRetiro}
          />
        </div>
      </div>
    );
  }

  // Pantalla resultado
  if (resultado) {
    return (
      <div className="cajero-container">
        <div className="cajero-card">
          <h2>¡Retiro Exitoso!</h2>
          <div className="resultado-box">
            <pre>{resultado.reporte}</pre>
            <p>Monto: ${resultado.monto.toLocaleString()}</p>
          </div>
          <button onClick={reiniciar} className="cajero-btn btn-primary">Nueva Transacción</button>
        </div>
      </div>
    );
  }

  return null;
};

export default CajeroAutomatico;
