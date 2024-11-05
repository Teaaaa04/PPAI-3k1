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
}

export default IEstrategiaReporte;
