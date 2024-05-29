class Varietal {
  constructor(
    descripcion, //string
    porcentajeComposicion //int
  ) {
    this._descripcion = descripcion;
    this._porcentajeComposicion = porcentajeComposicion;
  }

  //getters
  get descripcion() {
    return this._descripcion;
  }
  get porcentajeComposicion() {
    return this._porcentajeComposicion;
  }

  //setters
  set descripcion(descripcion) {
    this._descripcion = descripcion;
  }
  set porcentajeComposicion(porcentajeComposicion) {
    this._porcentajeComposicion = porcentajeComposicion;
  }
}

export default Varietal;
