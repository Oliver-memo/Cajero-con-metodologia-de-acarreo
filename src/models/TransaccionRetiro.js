class TransaccionRetiro {
  constructor(tipoRetiro, monto, calculadoraAcarreo) {
    this.tipoRetiro = tipoRetiro;
    this.monto = monto;
    this.calculadoraAcarreo = calculadoraAcarreo;
    this.billetes = null;
    this.exitosa = false;
  }

  procesar() {
    if (!this.calculadoraAcarreo.validarMonto(this.monto)) {
      throw new Error('No se pueden dispensar billetes de $5.000. Solo billetes de $10.000, $20.000, $50.000 y $100.000');
    }

    this.billetes = this.calculadoraAcarreo.calcularBilletes(this.monto);
    
    if (!this.billetes) {
      throw new Error(`No se puede dispensar $${this.monto.toLocaleString()}. Por favor seleccione otro monto e inicie nuevamente el proceso.`);
    }

    this.exitosa = true;
    return this.generarResultado();
  }

  generarResultado() {
    return {
      reporte: this.tipoRetiro.generarReporte(),
      monto: this.monto,
      billetes: this.billetes,
      total: Object.values(this.billetes).reduce((sum, cantidad) => sum + cantidad, 0)
    };
  }
}
export default TransaccionRetiro;