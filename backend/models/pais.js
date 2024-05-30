class Pais {
  constructor(
    nombre, //string
    provincias //array
  ) {
    this._nombre = nombre;
    this._provincias = provincias;
  }

  // getters
  get nombre() {
    return this._nombre;
  }

  get provincias() {
    return this._provincias;
  }

  // setters
  set nombre(nombre) {
    this._nombre = nombre;
  }

  set provincias(provincias) {
    this._provincias = provincias;
  }
}

export default Pais;
