class Varietal {
  constructor(
    descripcion, //string
    porcentajeComposicion //int
  ) {
    this._descripcion = descripcion;
    this._porcentajeComposicion = porcentajeComposicion;
  }

  // Getter functions
  getDescripcion() {
    return this._descripcion;
  }

  getPorcentajeComposicion() {
    return this._porcentajeComposicion;
  }

  // Setter functions
  setDescripcion(descripcion) {
    this._descripcion = descripcion;
  }

  setPorcentajeComposicion(porcentajeComposicion) {
    this._porcentajeComposicion = porcentajeComposicion;
  }
}

export default Varietal;
