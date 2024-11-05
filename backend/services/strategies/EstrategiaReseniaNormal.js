// Reseñas de Sommelier: Utiliza solo las reseñas de Sommeliers registrados de los vinos que cumplen con los filtros del ranking. Es decir que debe buscar solo las reseñas de Sommeliers entre las reseñas existentes y considerar esas calificaciones para realizar el ranking.
import IEstrategiaReporte from "./IEstrategiaReporte.js";

class EstrategiaReseniaNormal extends IEstrategiaReporte {
  buscarVinos(fechaDesde, fechaHasta, vinos) {
    const vinosParaReporte = [];
    vinos.forEach((vino) => {
      if (vino.buscarReseñaEnPeríodo(fechaDesde, fechaHasta) !== null) {
        vinosParaReporte.push(vino);
      }
    });
    return vinosParaReporte;
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
