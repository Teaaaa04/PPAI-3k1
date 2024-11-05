import EstrategiaReseniaSommelier from "./strategies/EstrategiaReseniaSommelier.js";
import EstrategiaReseniaNormal from "./strategies/EstrategiaReseniaNormal.js";
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
    return this.buscarDatosVinosParaReporte(vinos, provincias, paises);
  }

  buscarDatosVinosParaReporte(vinos, provincias, paises) {
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
    let vinosRanking = estrategiaResenia.buscarDatosVinosParaReporte(
      vinos,
      fechaDesde,
      fechaHasta,
      provincias,
      paises
    );

    return vinosRanking;
  }

  // Creacion de la estrategia
  crearEstrategia(tipoResenia) {
    let estrategia = null;
    if (tipoResenia === "Reseñas de Sommelier") {
      estrategia = new EstrategiaReseniaSommelier();
    } else if (tipoResenia === "Reseñas Normales") {
      estrategia = new EstrategiaReseniaNormal();
    } else {
      ("Este tipo de reseña no esta disponible");
    }
    return estrategia;
  }

  tomarConfirmacion() {}
}

export default GestorRankingVinos;
