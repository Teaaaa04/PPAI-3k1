class Provincia {
  constructor(
    nombre, //string
    regionesVitivinicolas //array
  ) {
    this._nombre = nombre;
    this.regionesVitivinicolas = regionesVitivinicolas;
  }

  // getters
  // Getter functions
  getNombre() {
    return this._nombre;
  }

  getRegiones() {
    return this.regionesVitivinicolas;
  }

  // Setter functions
  setNombre(nombre) {
    this._nombre = nombre;
  }

  setRegiones(regiones) {
    this.regionesVitivinicolas = regiones;
  }

  // metodos

  // devuelve el pais al que pertenece la provincia, recibe como parametro un array de paises
  obtenerPais(paises) {
    let pais = paises.find((pais) => {
      return pais
        .getProvincias()
        .find((provincia) => provincia.getNombre() === this.getNombre());
    });
    return pais.getNombre();
  }
}

export default Provincia;
