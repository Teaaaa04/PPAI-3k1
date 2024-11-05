// Reseñas de Sommelier: Utiliza solo las reseñas de Sommeliers registrados de los vinos que cumplen con los filtros del ranking. Es decir que debe buscar solo las reseñas de Sommeliers entre las reseñas existentes y considerar esas calificaciones para realizar el ranking.
import IEstrategiaReporte from "./IEstrategiaReporte.js";

class EstrategiaReseniaNormal extends IEstrategiaReporte {
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

  buscarVinos(fechaDesde, fechaHasta, vinos) {
    const vinosParaReporte = [];
    vinos.forEach((vino) => {
      if (vino.buscarReseñaEnPeríodo(fechaDesde, fechaHasta) !== null) {
        vinosParaReporte.push(vino);
      }
    });
    return vinosParaReporte;
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

  // Ordenamos los vinosReporte por puntaje promedio general de reseñas de mejor a peor
  ordenarVinosPorRanking(datosVinosReporte) {
    let vinosOrdenados = datosVinosReporte.sort((vino1, vino2) => {
      return vino2.puntajePromedio - vino1.puntajePromedio;
    });
    let vinosRanking = vinosOrdenados.slice(0, 10); // tomamos los 10 primeros
    return vinosRanking;
  }
}

export default EstrategiaReseniaNormal;
