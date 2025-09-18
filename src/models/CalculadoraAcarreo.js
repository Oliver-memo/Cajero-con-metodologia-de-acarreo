class CalculadoraAcarreo {
  constructor() {
    this.matrizBilletes = [
      [10000, 20000, 50000, 100000],
      [10000, 20000, 50000, 100000],
      [10000, 20000, 50000, 100000],
      [10000, 20000, 50000, 100000]
    ];
  }

  acarreo(matriz, monto) {
    let sumador = 0;
    let recorrido = [];
    let maxIteraciones = 1000;

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

  calcularBilletes(cantidad) {
    const resultado = this.acarreo(this.matrizBilletes, cantidad);
    
    if (!resultado.exito) {
      return null;
    }

    const billetes = { 10000: 0, 20000: 0, 50000: 0, 100000: 0 };
    
    resultado.billetes.forEach(billete => {
      billetes[billete]++;
    });

    return billetes;
  }

  validarMonto(monto) {

    return monto % 10000 === 0 && monto <= 10000000;
  }
}

export default CalculadoraAcarreo;
