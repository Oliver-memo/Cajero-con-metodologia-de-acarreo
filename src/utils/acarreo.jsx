export function acarreo(matriz, monto) {
  let sumador = 0;
  let recorrido = [];
  let maxIteraciones = 1000; // seguridad contra bucles infinitos

  while (sumador < monto && maxIteraciones > 0) {
    for (let i = 0; i < matriz.length; i++) {
      for (let j = 0; j < matriz[i].length; j++) {
        let valor = matriz[i][j];

        if (valor <= (monto - sumador)) {
          sumador += valor;
          recorrido.push(valor);
        }

        if (sumador === monto) {
          return { exito: true, billetes: recorrido };
        }
      }
    }
    maxIteraciones--;
  }

  return { exito: false, billetes: recorrido };
}
