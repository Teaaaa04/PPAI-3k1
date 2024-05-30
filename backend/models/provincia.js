class Provincia {
  constructor(
    nombre, //string
    regionesVitivinicolas //array
  ) {
    this._nombre = nombre;
    this.regionesVitivinicolas = regionesVitivinicolas;
  }

  // getters
  get nombre() {
    return this._nombre;
  }

  get regiones() {
    return this._regiones;
  }

  // setters
  set nombre(nombre) {
    this._nombre = nombre;
  }

  set regiones(regiones) {
    this._regiones = regiones;
  }
  // metodos
  // funcion para obtener el pais de la provincia
  obtenerPais(paises) {
    // encontrar el pais que tiene esta provincia
    let pais = paises.find((pais) => {
      return pais.provincias.find(
        (provincia) => provincia.nombre === this.nombre
      );
    });
    return pais.nombre;
  }
}

export default Provincia;
