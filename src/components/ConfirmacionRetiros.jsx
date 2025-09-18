import "../css/ConfirmacionRetiro.css";

const ConfirmacionRetiro = ({ monto, billetes, onConfirmar, onCancelar, tipoRetiro }) => {
  const totalBilletes = Object.values(billetes).reduce((sum, cantidad) => sum + cantidad, 0);

  return (
    <div className="confirm-container">
      <h3>Confirmar Retiro</h3>
      
      <div className={`confirm-card ${tipoRetiro}`}>
        <p className="confirm-amount">
          Cantidad a retirar: ${monto.toLocaleString()}
        </p>
        
        <div className="confirm-billetes">
          <h4>Billetes a dispensar:</h4>
          {Object.entries(billetes).map(([valor, cantidad]) => (
            cantidad > 0 && (
              <div key={valor} className="billete-row">
                <span>Billetes de ${parseInt(valor).toLocaleString()}</span>
                <span className="cantidad">{cantidad} billetes</span>
              </div>
            )
          ))}
          <div className="total-row">
            <span>Total de billetes:</span>
            <span>{totalBilletes} unidades</span>
          </div>
        </div>
      </div>

      <div className="btn-row">
        <button onClick={onCancelar} className="btn btn-cancelar">Cancelar</button>
        <button onClick={onConfirmar} className="btn btn-confirmar">Confirmar Retiro</button>
      </div>
    </div>
  );
};

export default ConfirmacionRetiro;
