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
  opcionGenerarRanking(vinos, provincias, pais) {
    let vinosConReseniaDeSommelier = this.buscarVinosConReseniaDeSommelier(
      fechaDesde,
      fechaHasta,
      vinos
    );
    // ESTO YA FUNCIONA
    console.log(vinosConReseniaDeSommelier);

    let datosVinoReporte = this.buscarDatosParaReporte(
      vinosConReseniaDeSommelier,
      provincias,
      pais
    );
    console.log(datosVinoReporte);

    // let vinosRanking = this.ordenarVinosPorRanking(datosVinoReporte);
  }

  // USADO
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

  // ordenamos los vinos por puntaje promedio sommelier de reseñas  de mejor a peor
  ordenarVinosPorRanking(datosVinosReporte) {
    let vinosOrdenados = datosVinosReporte.sort((vino1, vino2) => {
      return vino2.puntajePromedioSommelier - vino1.puntajePromedioSommelier;
    });
    //el ranking solo quiere 10 vinos
    let vinosRanking = vinosOrdenados.slice(0, 10);
    return vinosRanking;
  }

  // por cada vino que cree un json con los datos necesarios nombre, precio, datos bodega, varietales (descripciones), puntaje promedio y puntaje promedio sommelier
  buscarDatosParaReporte(vinosConReseniaDeSommelier, provincias, pais) {
    let datosVinosReporte = [];
    vinosConReseniaDeSommelier.forEach((vino) => {
      let VinoReporte = {
        nombre: vino.nombre,
        precio: vino.precio,
        datosBodega: vino.buscarDatosBodega(provincias, pais), // nombre, región y país
        varietal: vino.buscarVarietales(), // descripción del varietal
        puntajePromedio: vino.calcularPuntajePromedio(),
        puntajePromedioSommelier: vino.calcularPuntajePromedioSommelier(),
      };
      datosVinosReporte.push(VinoReporte);
    });
    return datosVinosReporte;
  }

  crearReporteRanking() {}

  validarPeriodo() {}

  getConfirmacion() {}
}

export default GestorRankingVinos;
