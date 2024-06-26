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

  // getters de lo anterior
  get aniada() {
    return this._aniada;
  }
  get imagenEtiqueta() {
    return this._imagenEtiqueta;
  }
  get nombre() {
    return this._nombre;
  }
  get notaDeCataBodega() {
    return this._notaDeCataBodega;
  }
  get precioARS() {
    return this._precioARS;
  }
  get bodega() {
    return this._bodega;
  }
  get varietales() {
    return this._varietal;
  }
  get reseña() {
    return this._reseña;
  }

  // setters
  set aniada(añada) {
    this._añada = añada;
  }
  set imagenEtiqueta(imagenEtiqueta) {
    this._imagenEtiqueta = imagenEtiqueta;
  }
  set nombre(nombre) {
    this._nombre = nombre;
  }
  set notaDeCataBodega(notaDeCataBodega) {
    this._notaDeCataBodega = notaDeCataBodega;
  }
  set precioARS(precioARS) {
    this._precioARS = precioARS;
  }
  set bodega(bodega) {
    this._bodega = bodega;
  }
  set varietales(varietales) {
    this._varietales = varietales;
  }
  set reseña(reseña) {
    this._reseña = reseña;
  }

  // metodos

  // buscar datos de la bodega implica buscar su nombre, región y país.
  buscarDatosBodega(provincias, paises) {
    return [
      this._bodega.nombre,
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
    return this._varietales.map((varietal) => varietal.descripcion);
  }

  // calcula el puntaje promedio de todas las reseñas en el período
  calcularPuntajePromedio() {
    let reseniasEnPeriodo = this._resenias.filter((resenia) => {
      return resenia.esDelPeriodo(fechaDesde, fechaHasta);
    });
    console.log(reseniasEnPeriodo);
    return (
      reseniasEnPeriodo.reduce((acc, resenia) => acc + resenia.puntaje, 0) /
      reseniasEnPeriodo.length
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
      reseniasEnCondicion.reduce((acc, resenia) => acc + resenia.puntaje, 0) /
      reseniasEnCondicion.length
    );
  }
}

export default Vino;
