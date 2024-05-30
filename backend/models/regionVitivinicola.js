class RegionVitivinicola {
  constructor(descripcion, nombre) {
    this._descripcion = descripcion;
    this._nombre = nombre;
  }

  //getters
  get descripcion() {
    return this._descripcion;
  }
  get nombre() {
    return this._nombre;
  }
  //setters
  set descripcion(descripcion) {
    this._descripcion = descripcion;
  }
  set nombre(nombre) {
    this._nombre = nombre;
  }

  //metodos

  // devuelve el pais al que pertenece la region vitivinicola, recibe como parametros un array de provincias y un array de paises
  obtenerPais(provincias, paises) {
    let provincia = provincias.find((provincia) => {
      return provincia.regionesVitivinicolas.find(
        (region) => region.nombre === this._nombre
      );
    });

    return provincia.obtenerPais(paises);
  }
}

export default RegionVitivinicola;
