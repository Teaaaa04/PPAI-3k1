class RegionVitivinicola {
  constructor(nombre, descripcion) {
    this._nombre = nombre;
    this._descripcion = descripcion;
  }

  // Getter functions
  getDescripcion() {
    return this._descripcion;
  }

  getNombre() {
    return this._nombre;
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
    console.log(provincias);
    let provincia = provincias.find((provincia) => {
      return provincia.getRegiones().find((region) => {
        return region.getNombre() === this.getNombre();
      });
    });

    return provincia.obtenerPais(paises);
  }
}

export default RegionVitivinicola;
