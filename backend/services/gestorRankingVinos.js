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
    let vinosConReseniaDeSommelier = this.buscarVinosConReseniaDeSommelier(
      fechaDesde,
      fechaHasta,
      vinos
    );

    let datosVinoReporte = this.buscarDatosParaReporte(
      vinosConReseniaDeSommelier,
      provincias,
      paises
    );

    let vinosRanking = this.ordenarVinosPorRanking(datosVinoReporte);
    return vinosRanking;
  }

  // buscamos los vinos con reseñas de sommelier en el período
  buscarVinosConReseniaDeSommelier(fechaDesde, fechaHasta, vinos) {
    const listaADevolver = [];
    vinos.forEach((vino) => {
      if (
        vino.buscarReseñaSommelierEnPeríodo(fechaDesde, fechaHasta) !== null
      ) {
        listaADevolver.push(vino);
      }
    });

    return listaADevolver;
  }

  // ordenamos los vinosReporte por puntaje promedio sommelier de reseñas de mejor a peor
  ordenarVinosPorRanking(datosVinosReporte) {
    let vinosOrdenados = datosVinosReporte.sort((vino1, vino2) => {
      return vino2.puntajePromedioSommelier - vino1.puntajePromedioSommelier;
    });
    let vinosRanking = vinosOrdenados.slice(0, 10); // tomamos los 10 primeros
    return vinosRanking;
  }

  // buscamos los datos necesarios para el reporte de los vinos con reseñas de sommelier en el período
  buscarDatosParaReporte(vinosConReseniaDeSommelier, provincias, paises) {
    let datosVinosReporte = [];

    vinosConReseniaDeSommelier.forEach((vino) => {
      let VinoReporte = {
        nombre: vino.getNombre(),
        precio: vino.getPrecioARS(),
        datosBodega: vino.buscarDatosBodega(provincias, paises), // nombre, región y país
        varietal: vino.buscarVarietales(), // descripción de los varietales
        puntajePromedio: vino.calcularPuntajePromedio(), // puntaje promedio de todas las reseñas en el período
        puntajePromedioSommelier: vino.calcularPuntajePromedioSommelier(), // puntaje promedio de las reseñas de sommelier en el período
      };

      datosVinosReporte.push(VinoReporte);
    });
    return datosVinosReporte;
  }

  tomarConfirmacion() {}
}

export default GestorRankingVinos;
