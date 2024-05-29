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
  // Funcion para ver si la fecha de la reseña esta dentro de los rangos pasados por parametro
  esDelPeriodo(fechaDesde, fechaHasta) {
    if (this._fechaResenia >= fechaDesde && this._fechaResenia <= fechaHasta) {
      return true;
    }
  }

  // Funcion que determina si la reseña es de un sommelier, es decir, es premium
  sosDeSommelier() {
    return this._esPremium;
  }
}

export default Resenia;
