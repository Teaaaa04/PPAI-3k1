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

  // la region no conoce a que provincia pertenece, pero las provincias si conocen que regiones tienen,  además los paises tienen provincias, las provincias tienen un método obtenerPias() que devuelve el país, quiero obtener el pais de la región.

  obtenerPais(provincias, paises) {
    // buscar entre todas las provincias, la que tenga la regionVitivinicola con el nombre de la región actual
    let provincia = provincias.find((provincia) => {
      return provincia.regionesVitivinicolas.find(
        (region) => region.nombre === this._nombre
      );
    });

    return provincia.obtenerPais(paises);
  }
}

export default RegionVitivinicola;
