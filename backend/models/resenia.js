class Resenia {
  constructor(comentario, esPremium, fechaResenia, puntaje) {
    this._comentario = comentario; //string
    this._esPremium = esPremium; //boolean
    this._fechaResenia = fechaResenia; //string
    this._puntaje = puntaje; //int
  }

  //getters
  get comentario() {
    return this._comentario;
  }
  get esPremium() {
    return this._esPremium;
  }
  get fechaResenia() {
    return this._fechaResenia;
  }
  get puntaje() {
    return this._puntaje;
  }

  //setters
  set comentario(comentario) {
    this._comentario = comentario;
  }
  set esPremium(esPremium) {
    this._esPremium = esPremium;
  }
  set fechaResenia(fechaResenia) {
    this._fechaResenia = fechaResenia;
  }
  set puntaje(puntaje) {
    this._puntaje = puntaje;
  }

  //metodos

  // devuelve true si la resenia es de un sommelier
  esDelPeriodo(fechaDesde, fechaHasta) {
    if (
      this._fechaResenia >= fechaDesde.value &&
      this._fechaResenia <= fechaHasta.value
    ) {
      return true;
    } else {
      return false;
    }
  }

  // devuelve true si la resenia es Premium
  sosDeSommelier() {
    return this._esPremium;
  }
}

export default Resenia;
