import React from "react";

function Billetes({ billetes }) {
  // Contar cuántos billetes de cada tipo se entregaron
  const conteo = billetes.reduce((acc, billete) => {
    acc[billete] = (acc[billete] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{ marginTop: "20px" }}>
      <h4>Billetes entregados:</h4>
      <ul>
        {Object.entries(conteo).map(([valor, cantidad]) => (
          <li key={valor}>
            {cantidad} x ${valor}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Billetes;
