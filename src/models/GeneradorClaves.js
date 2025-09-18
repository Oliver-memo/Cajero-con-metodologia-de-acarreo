class GeneradorClaves {
  static generarClaveNequi() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
export default GeneradorClaves;