class RegionVitivinicola {
  constructor(descripcion, nombre) {
    this._descripcion = descripcion;
    this._nombre = nombre;
  }

  // Getter functions
  getDescripcion() {
    return this._descripcion;
  }

  getNombre() {
    return this.nombre;
  }

  // Setter functions
  setDescripcion(descripcion) {
    this._descripcion = descripcion;
  }

  setNombre(nombre) {
    this._nombre = nombre;
  }

  //metodos

  // devuelve el pais al que pertenece la region vitivinicola, recibe como parametros un array de provincias y un array de paises
  obtenerPais(provincias, paises) {
    provincias.forEach((provincia) => {
      console.log(provincia.getRegiones());
    });

    let provincia = provincias.find((provincia) => {
      return provincia
        .getRegiones()
        .find((region) => region.getNombre() === this.getNombre());
    });

    return provincia.obtenerPais(paises);
  }
}

export default RegionVitivinicola;
