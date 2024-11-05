class Bodega {
  constructor(
    coordenadasUbicacion, //string
    nombre, //string
    descripcion, //string
    fechaUltimaActualizacion, //date
    historia, //string
    periodoActualizacion, //int
    regionVitivinicola
  ) {
    this._coordenadasUbicacion = coordenadasUbicacion;
    this._nombre = nombre;
    this._descripcion = descripcion;
    this._fechaUltimaActualizacion = fechaUltimaActualizacion;
    this._historia = historia;
    this._periodoActualizacion = periodoActualizacion;
    this.regionVitivinicola = regionVitivinicola;
  }

  // getters
  getCoordenadasUbicacion() {
    return this._coordenadasUbicacion;
  }
  getNombre() {
    return this._nombre;
  }
  getDescripcion() {
    return this._descripcion;
  }
  getFechaUltimaActualizacion() {
    return this._fechaUltimaActualizacion;
  }
  getHistoria() {
    return this._historia;
  }
  getPeriodoActualizacion() {
    return this._periodoActualizacion;
  }
  getRegionVitivinicola() {
    return this._regionVitivinicola;
  }

  // Setter functions
  setCoordenadasUbicacion(coordenadasUbicacion) {
    this._coordenadasUbicacion = coordenadasUbicacion;
  }
  setNombre(nombre) {
    this._nombre = nombre;
  }
  setDescripcion(descripcion) {
    this._descripcion = descripcion;
  }
  setFechaUltimaActualizacion(fechaUltimaActualizacion) {
    this._fechaUltimaActualizacion = fechaUltimaActualizacion;
  }
  setHistoria(historia) {
    this._historia = historia;
  }
  setPeriodoActualizacion(periodoActualizacion) {
    this._periodoActualizacion = periodoActualizacion;
  }
  setRegionVitivinicola(regionVitivinicola) {
    this._regionVitivinicola = regionVitivinicola;
  }

  // metodos

  // devuelve la region y el pais al que pertenece la bodega
  obtenerRegionYPais(provincia, paises) {
    return [
      this.regionVitivinicola.getNombre(),
      this.regionVitivinicola.obtenerPais(provincia, paises),
    ];
  }
}

export default Bodega;
