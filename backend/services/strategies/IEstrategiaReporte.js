// Clase base (superclase)
class IEstretegiaResenia {
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
