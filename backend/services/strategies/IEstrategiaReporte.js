// Clase base (superclase)
class IEstrategiaReporte {
  buscarDatosVinosParaReporte(
    vinos,
    fechaDesde,
    fechaHasta,
    provincias,
    paises
  ) {
    throw new Error("Este método debe ser implementado por subclases");
  }

  buscarDatosParaReporte(vinosParaReporte, provincias, paises) {
    throw new Error("Este método debe ser implementado por subclases");
  }

  buscarVinos(fechaDesde, fechaHasta, vinos) {
    throw new Error("Este método debe ser implementado por subclases");
  }

  ordenarVinosPorRanking(datosVinosReporte) {
    throw new Error("Este método debe ser implementado por subclases");
  }
}

export default IEstrategiaReporte;
