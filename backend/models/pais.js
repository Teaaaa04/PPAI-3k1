class Pais {
  constructor(
    nombre, //string
    provincias //array
  ) {
    this._nombre = nombre;
    this._provincias = provincias;
  }

  // Getter functions
  getNombre() {
    return this._nombre;
  }

  getProvincias() {
    return this._provincias;
  }

  // Setter functions
  setNombre(nombre) {
    this._nombre = nombre;
  }

  setProvincias(provincias) {
    this._provincias = provincias;
  }
}

export default Pais;
