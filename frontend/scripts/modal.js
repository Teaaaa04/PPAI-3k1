function abrirModal(lista) {
  const escondido = document.getElementById("escondido");
  const modal = document.getElementById("myModal");
  const span = document.getElementsByClassName("close")[0];
  const dataTable = document.getElementById("dataTable");

  loadTableData(lista);
  escondido.classList.remove("hidden");

  span.onclick = function () {
    escondido.classList.add("hidden");
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      escondido.classList.add("hidden");
    }
  };

  function loadTableData(data) {
    dataTable.innerHTML = "";
    data.forEach((item, index) => {
      let row = `<tr>
        <td class="px-1 py-4 whitespace-nowrap text-sm text-center text-white bg-red-600">${index}</td>
        <td class="px-1 py-4 whitespace-nowrap text-sm text-center text-white bg-red-600">${
          item.nombre
        }</td>
        <td class="px-1 py-4 whitespace-nowrap text-sm text-center text-white bg-red-600">${item.puntajePromedio.toFixed(
          2
        )}</td>
        <td class="px-1 py-4 whitespace-nowrap text-sm  text-center text-white bg-red-600">${item.puntajePromedioSommelier.toFixed(
          2
        )}</td>
        <td class="px-1 py-4 whitespace-nowrap text-sm  text-center text-white bg-red-600">
        ${item.varietal
          .map((varietal) => {
            varietal.descripcion;
          })
          .join(", ")}
        </td>
        <td class="px-1 py-4 whitespace-nowrap text-sm text-center text-white bg-red-600">${
          item.precio
        }</td>
        <td class="px-1 py-4 whitespace-nowrap text-sm  text-center text-white bg-red-600">${
          item.datosBodega[0] // nombre de la bodega
        }</td>
        <td class="px-1 py-4 whitespace-nowrap text-sm text-center text-white bg-red-600">${
          item.datosBodega[1][0] // region de la bodega
        }</td>
        <td class="px-1 py-4 whitespace-nowrap text-sm text-center text-white bg-red-600">${
          item.datosBodega[1][1] // pais de la bodega
        }</td>
        </tr>`;

      dataTable.innerHTML += row;
    });
  }
}

export default abrirModal;
