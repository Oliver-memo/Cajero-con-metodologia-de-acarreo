class ValidadorNumeros {
  static validarNumeroNequi(numero) {
    if (!/^\d{10}$/.test(numero)) {
      return { valido: false, mensaje: "El número de celular debe tener exactamente 10 dígitos." };
    }
    return { valido: true };
  }

  static validarNumeroAhorroMano(numero, clave) {
    if (!/^\d{11}$/.test(numero)) {
      return { valido: false, mensaje: "El número debe tener 11 dígitos." };
    }
    if (!(numero[0] === '0' || numero[0] === '1')) {
      return { valido: false, mensaje: "El número debe iniciar con 0 o 1." };
    }
    if (numero[1] !== '3') {
      return { valido: false, mensaje: "El segundo dígito debe ser 3." };
    }
    if (!/^\d{4}$/.test(clave)) {
      return { valido: false, mensaje: "La clave debe tener exactamente 4 dígitos." };
    }
    return { valido: true };
  }

  static validarNumeroCuentaAhorros(numero, clave) {
    if (!/^\d{11}$/.test(numero)) {
      return { valido: false, mensaje: "El número de cuenta debe tener exactamente 11 dígitos." };
    }
    if (!/^\d{4}$/.test(clave)) {
      return { valido: false, mensaje: "La clave debe tener exactamente 4 dígitos." };
    }
    return { valido: true };
  }
}
export default ValidadorNumeros;
