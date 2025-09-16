export function validarMonto(monto) {
  if (monto <= 0) {
    return { valido: false, mensaje: "El monto debe ser mayor a 0." };
  }
  if (monto % 10000 !== 0) {
    return { valido: false, mensaje: "El monto debe ser múltiplo de 10.000." };
  }
  return { valido: true, mensaje: "Monto válido." };
}
