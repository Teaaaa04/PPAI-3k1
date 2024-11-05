// Clase base (superclase)
class IEstrategiaReporte {
  buscarDatosVinosParaReporte(
    vinos,
    fechaDesde,
    fechaHasta,
    provincias,
    paises
  ) {
    let vinosParaReporte = this.buscarVinos(fechaDesde, fechaHasta, vinos);

    let datosVinosReporte = this.buscarDatosParaReporte(
      vinosParaReporte,
      provincias,
      paises
    );

    let vinosRanking = this.ordenarVinosPorRanking(datosVinosReporte);

    return vinosRanking; // Object []
  }

  // buscamos los datos necesarios para el reporte de los vinos con reseñas de sommelier en el período
  buscarDatosParaReporte(vinosParaReporte, provincias, paises) {
    let datosVinosReporte = [];
    vinosParaReporte.forEach((vino) => {
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

  buscarVinos(fechaDesde, fechaHasta, vinos) {
    throw new Error("Este método debe ser implementado por subclases");
  }

  ordenarVinosPorRanking(datosVinosReporte) {
    throw new Error("Este método debe ser implementado por subclases");
  }
}

export default IEstrategiaReporte;
