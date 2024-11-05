class Resenia {
  constructor(comentario, esPremium, fechaResenia, puntaje) {
    this._comentario = comentario; //string
    this._esPremium = esPremium; //boolean
    this._fechaResenia = fechaResenia; //string
    this._puntaje = puntaje; //int
  }

  // Getter functions
  getComentario() {
    return this._comentario;
  }

  getEsPremium() {
    return this._esPremium;
  }

  getFechaResenia() {
    return this._fechaResenia;
  }

  getPuntaje() {
    return this._puntaje;
  }

  // Setter functions
  setComentario(comentario) {
    this._comentario = comentario;
  }

  setEsPremium(esPremium) {
    this._esPremium = esPremium;
  }

  setFechaResenia(fechaResenia) {
    this._fechaResenia = fechaResenia;
  }

  setPuntaje(puntaje) {
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
