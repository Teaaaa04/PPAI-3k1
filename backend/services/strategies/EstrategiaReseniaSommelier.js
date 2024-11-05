// Reseñas de Sommelier: Utiliza solo las reseñas de Sommeliers registrados de los vinos que cumplen con los filtros del ranking. Es decir que debe buscar solo las reseñas de Sommeliers entre las reseñas existentes y considerar esas calificaciones para realizar el ranking.
import IEstretagiaReporte from "./IEstrategiaReporte.js";

class EstrategiaReseniaSommelier extends IEstretagiaReporte {
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
}

export default EstrategiaReseniaSommelier;
