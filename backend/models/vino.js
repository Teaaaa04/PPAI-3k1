class Vino {
  constructor(
    aniada, //int
    imagenEtiqueta, //string
    nombre, //string
    notaDeCataBodega, //int
    precioARS, //int
    varietal, // array obj
    bodega, // obj
    resenias // array obj
  ) {
    this._aniada = aniada;
    this._imagenEtiqueta = imagenEtiqueta;
    this._nombre = nombre;
    this._notaDeCataBodega = notaDeCataBodega;
    this._precioARS = precioARS;
    this._bodega = bodega;
    this._varietales = varietal;
    this._resenias = resenias;
  }

  // Getter functions
  getAniada() {
    return this._aniada;
  }

  getImagenEtiqueta() {
    return this._imagenEtiqueta;
  }

  getNombre() {
    return this._nombre;
  }

  getNotaDeCataBodega() {
    return this._notaDeCataBodega;
  }

  getPrecioARS() {
    return this._precioARS;
  }

  getBodega() {
    return this._bodega;
  }

  getVarietales() {
    return this._varietales;
  }

  getReseña() {
    return this._reseña;
  }

  // Setter functions
  setAniada(aniada) {
    this._aniada = aniada;
  }

  setImagenEtiqueta(imagenEtiqueta) {
    this._imagenEtiqueta = imagenEtiqueta;
  }

  setNombre(nombre) {
    this._nombre = nombre;
  }

  setNotaDeCataBodega(notaDeCataBodega) {
    this._notaDeCataBodega = notaDeCataBodega;
  }

  setPrecioARS(precioARS) {
    this._precioARS = precioARS;
  }

  setBodega(bodega) {
    this._bodega = bodega;
  }

  setVarietales(varietales) {
    this._varietales = varietales;
  }

  setReseña(reseña) {
    this._reseña = reseña;
  }

  // metodos

  // buscar datos de la bodega implica buscar su nombre, región y país.
  buscarDatosBodega(provincias, paises) {
    return [
      this._bodega.getNombre(),
      this._bodega.obtenerRegionYPais(provincias, paises),
    ];
  }

  // buscar reseñas de sommelier en el período
  buscarReseñaSommelierEnPeríodo(fechaDesde, fechaHasta) {
    let listaADevolver = this._resenias.filter((resenia) => {
      return (
        resenia.esDelPeriodo(fechaDesde, fechaHasta) && resenia.sosDeSommelier()
      );
    });
    if (listaADevolver.length > 0) {
      return true;
    } else {
      return null;
    }
  }

  // busca varietales, devuelve un array con las descripciones de los varietales
  buscarVarietales() {
    return this._varietales.map((varietal) => varietal.getDescripcion());
  }

  // calcula el puntaje promedio de todas las reseñas en el período
  calcularPuntajePromedio() {
    let reseniasEnPeriodo = this._resenias.filter((resenia) => {
      return resenia.esDelPeriodo(fechaDesde, fechaHasta);
    });
    return (
      reseniasEnPeriodo.reduce(
        (acc, resenia) => acc + resenia.getPuntaje(),
        0
      ) / reseniasEnPeriodo.length
    );
  }

  // calcula el puntaje promedio de las reseñas de sommelier en el período
  calcularPuntajePromedioSommelier() {
    let reseniasEnCondicion = this._resenias.filter((resenia) => {
      return (
        resenia.esDelPeriodo(fechaDesde, fechaHasta) && resenia.sosDeSommelier()
      );
    });

    return (
      reseniasEnCondicion.reduce(
        (acc, resenia) => acc + resenia.getPuntaje(),
        0
      ) / reseniasEnCondicion.length
    );
  }
}

export default Vino;
