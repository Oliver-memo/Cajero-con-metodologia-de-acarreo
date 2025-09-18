import ValidadorNumeros from "./ValidarNumeros";

class TipoRetiro {
  constructor(tipo, numero, clave = null, claveVisible = null) {
    this.tipo = tipo;
    this.numero = numero;
    this.clave = clave;
    this.claveVisible = claveVisible;
    this.error = ""; // para guardar el mensaje de error
  }

  generarReporte() {
    switch (this.tipo) {
      case 'nequi':
        const numeroConCero = '0' + this.numero;
        return `Retiro NEQUI\nNúmero: ${numeroConCero}\nClave utilizada: ${this.claveVisible}`;
      case 'ahorro-mano':
        return `Retiro Ahorro a la Mano\nNúmero: ${this.numero}`;
      case 'cuenta-ahorros':
        return `Retiro Cuenta de Ahorros\nNúmero: ${this.numero}`;
      default:
        return '';
    }
  }

  validar() {
    switch (this.tipo) {
      case 'nequi':
        return ValidadorNumeros.validarNumeroNequi(this.numero);
      case 'ahorro-mano':
        return ValidadorNumeros.validarNumeroAhorroMano(this.numero, this.clave);
      case 'cuenta-ahorros':
        return ValidadorNumeros.validarNumeroCuentaAhorros(this.numero, this.clave);
      default:
        return { valido: false, mensaje: 'Tipo de retiro no válido' };
    }
  }

}

export default TipoRetiro;
