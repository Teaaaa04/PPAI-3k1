// Reseñas de Sommelier: Utiliza solo las reseñas de Sommeliers registrados de los vinos que cumplen con los filtros del ranking. Es decir que debe buscar solo las reseñas de Sommeliers entre las reseñas existentes y considerar esas calificaciones para realizar el ranking.

class EstrategiaReseñaSommelier extends IEstretegiaReporte {
  buscarDatosVinosParaReporte(
    vinos,
    fechaDesde,
    fechaHasta,
    provincias,
    paises
  ) {
    let vinosParaReporte = this.buscarVinosConReseniaDeSommelier(
      fechaDesde,
      fechaHasta,
      vinos
    ); //

    let datosVinosReporte = this.buscarDatosParaReporte(
      vinosParaReporte,
      provincias,
      paises
    );

    return datosVinosReporte; // Object []
  }

  buscarVinosConReseniaDeSommelier(fechaDesde, fechaHasta, vinos) {
    const vinosParaReporte = [];
    vinos.forEach((vino) => {
      if (
        vino.buscarReseñaSommelierEnPeríodo(fechaDesde, fechaHasta) !== null
      ) {
        vinosParaReporte.push(vino);
      }
    });
    return vinosParaReporte;
  }

  buscarDatosParaReporte(vinos, provincias, paises) {
    let datosVinosReporte = [];
    vinos.forEach((vino) => {
      let datosVino = {
        nombre: vino.getNombre(),
        bodega: vino.getBodega(),
        anio: vino.getAnio(),
        puntaje: vino.buscarReseñaSommelier().getPuntaje(),
        precio: vino.getPrecio(),
        provincia: vino.getProvincia(),
        pais: vino.getPais(),
      };
      datosVinosReporte.push(datosVino);
    });
    return datosVinosReporte;
  }
}
