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
  get coordenadasUbicacion() {
    return this.coordenadasUbicacion;
  }
  get nombre() {
    // return this._nombre;
  }
  get descripcion() {
    return this._descripcion;
  }
  get fechaUltimaActualizacion() {
    return this._fechaUltimaActualizacion;
  }
  get historia() {
    return this._historia;
  }
  get periodoActualizacion() {
    return this._periodoActualizacion;
  }

  get regionVitivinicola() {
    return this._regionVitivinicola;
  }

  // setters
  set coordenadasUbicacion(coordenadasUbicacion) {
    this._coordenadasUbicacion = coordenadasUbicacion;
  }
  set nombre(nombre) {
    this._nombre = nombre;
  }
  set descripcion(descripcion) {
    this._descripcion = descripcion;
  }
  set fechaUltimaActualizacion(fechaUltimaActualizacion) {
    this._fechaUltimaActualizacion = fechaUltimaActualizacion;
  }
  set historia(historia) {
    this._historia = historia;
  }
  set periodoActualizacion(periodoActualizacion) {
    this._periodoActualizacion = periodoActualizacion;
  }

  set regionVitivinicola(regionVitivinicola) {
    this._regionVitivinicola = regionVitivinicola;
  }

  // metodos

  // devuelve la region y el pais al que pertenece la bodega
  obtenerRegionYPais(provincia, paises) {
    return [
      this._regionVitivinicola.nombre,
      this._regionVitivinicola.obtenerPais(provincia, paises),
    ];
  }
}

export default Bodega;
