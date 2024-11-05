import EstrategiaReseniaSommelier from "./strategies/EstrategiaReseniaSommelier.js";

class GestorRankingVinos {
  constructor(
    fechaDesde,
    fechaHasta,
    formaVisualizacionSeleccionado,
    tipoReseniaSeleccionado
  ) {
    this._fechaDesde = fechaDesde;
    this._fechaHasta = fechaHasta;
    this._formaVisualizacionSeleccionado = formaVisualizacionSeleccionado;
    this._tipoReseniaSeleccionado = tipoReseniaSeleccionado;
  }

  // Getter functions
  getFechaDesde() {
    return this._fechaDesde;
  }

  getFechaHasta() {
    return this._fechaHasta;
  }

  getFormaVisualizacionSeleccionado() {
    return this._formaVisualizacionSeleccionado;
  }

  getTipoReseniaSeleccionado() {
    return this._tipoReseniaSeleccionado;
  }

  getVinosConReseniaDeSommelier() {
    return this._vinosConReseniaDeSommelier;
  }

  getVinosOrdenados() {
    return this._vinosOrdenados;
  }

  // Setter functions
  setFechaDesde(fechaDesde) {
    this._fechaDesde = fechaDesde;
  }

  setFechaHasta(fechaHasta) {
    this._fechaHasta = fechaHasta;
  }

  setFormaVisualizacionSeleccionado(formaVisualizacionSeleccionado) {
    this._formaVisualizacionSeleccionado = formaVisualizacionSeleccionado;
  }

  setTipoReseniaSeleccionado(tipoReseniaSeleccionado) {
    this._tipoReseniaSeleccionado = tipoReseniaSeleccionado;
  }

  setVinosConReseniaDeSommelier(vinosConReseniaDeSommelier) {
    this._vinosConReseniaDeSommelier = vinosConReseniaDeSommelier;
  }

  setVinosOrdenados(vinosOrdenados) {
    this._vinosOrdenados = vinosOrdenados;
  }

  // metodos
  // función principal
  opcionGenerarRanking(vinos, provincias, paises) {
    // Si es 1 --> reseñas normales
    // Si es 2 --> reseñas de sommelier
    // Si es 3 --> reseñas de amigos
    let tiposReseñas = [
      "Reseñas Normales",
      "Reseñas de Sommelier",
      "Reseñas de Amigos",
    ];

    // Creamos la estrategia
    let estrategiaResenia = this.crearEstrategia(
      tiposReseñas[this._tipoReseniaSeleccionado - 1]
    );

    // Delegamos la busqueda de los datos de los vinos para el reporte a la estrategia
    let datosVinosReporte = estrategiaResenia.buscarDatosVinosParaReporte(
      vinos,
      fechaDesde,
      fechaHasta,
      provincias,
      paises
    );
    console.log("Datos de los vinos para el reporte: ");
    console.log(datosVinosReporte);

    // Ordenamos los vinos por ranking
    let vinosRanking = this.ordenarVinosPorRanking(datosVinosReporte);

    return vinosRanking;
  }

  // Creacion de la estrategia
  crearEstrategia(tipoResenia) {
    let estrategia = null;
    if (tipoResenia === "Reseñas de Sommelier") {
      estrategia = new EstrategiaReseniaSommelier();
    } // Faltarian las otras estrategias
    return estrategia;
  }

  // Ordenamos los vinosReporte por puntaje promedio sommelier de reseñas de mejor a peor
  ordenarVinosPorRanking(datosVinosReporte) {
    let vinosOrdenados = datosVinosReporte.sort((vino1, vino2) => {
      return vino2.puntajePromedioSommelier - vino1.puntajePromedioSommelier;
    });
    let vinosRanking = vinosOrdenados.slice(0, 10); // tomamos los 10 primeros
    return vinosRanking;
  }

  tomarConfirmacion() {}
}

export default GestorRankingVinos;
