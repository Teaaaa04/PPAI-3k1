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

  // getters
  get fechaDesde() {
    return this._fechaDesde;
  }
  get fechaHasta() {
    return this._fechaHasta;
  }
  get formaVisualizacionSeleccionado() {
    return this._formaVisualizacionSeleccionado;
  }
  get tipoReseniaSeleccionado() {
    return this._tipoReseniaSeleccionado;
  }
  get vinosConReseniaDeSommelier() {
    return this._vinosConReseniaDeSommelier;
  }
  get vinosOrdenados() {
    return this._vinosOrdenados;
  }

  // setters
  set fechaDesde(fechaDesde) {
    this.fechaDesde = fechaDesde;
  }
  set fechaHasta(fechaHasta) {
    this.fechaHasta = fechaHasta;
  }
  set formaVisualizacionSeleccionado(formaVisualizacionSeleccionado) {
    this.formaVisualizacionSeleccionado = formaVisualizacionSeleccionado;
  }
  set tipoReseniaSeleccionado(tipoReseniaSeleccionado) {
    this.tipoReseniaSeleccionado = tipoReseniaSeleccionado;
  }
  set vinosConReseniaDeSommelier(vinosConReseniaDeSommelier) {
    this.vinosConReseniaDeSommelier = vinosConReseniaDeSommelier;
  }
  set vinosOrdenados(vinosOrdenados) {
    this.vinosOrdenados = vinosOrdenados;
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
        nombre: vino.nombre,
        precio: vino.precioARS,
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
