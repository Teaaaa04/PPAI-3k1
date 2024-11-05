function abrirModal(lista, tipoResenia) {
  const escondido = document.getElementById("escondido");
  const modal = document.getElementById("myModal");
  const span = document.getElementsByClassName("close")[0];
  const dataTable = document.getElementById("dataTable");

  loadTableData(lista, tipoResenia);
  escondido.classList.remove("hidden");

  span.onclick = function () {
    escondido.classList.add("hidden");
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      escondido.classList.add("hidden");
    }
  };

  function loadTableData(data, tipoResenia) {
    const tableHeader = document.getElementById("thead");
    tableHeader.innerHTML = `<tr>
                    <th class="px-2 py-3 text-center text-xs font-medium text-white uppercase tracking-wider w-1/12">#</th>
                    <th class="px-2 py-3 text-center text-xs font-medium text-white uppercase tracking-wider w-2/12">Nombre</th>
                    <th class="px-2 py-3 text-center text-xs font-medium text-white uppercase tracking-wider w-1/12">Calificación General</th>
                    ${
                      tipoResenia == 2
                        ? `<th class="px-2 py-3 text-center text-xs font-medium text-white uppercase tracking-wider w-1/12">Calificación Sommelier</th>`
                        : ""
                    }
                    <th class="px-2 py-3 text-center text-xs font-medium text-white uppercase tracking-wider w-3/12">Varietal</th>
                    <th class="px-2 py-3 text-center text-xs font-medium text-white uppercase tracking-wider w-1/12">Precio</th>
                    <th class="px-2 py-3 text-center text-xs font-medium text-white uppercase tracking-wider w-2/12">Bodega</th>
                    <th class="px-2 py-3 text-center text-xs font-medium text-white uppercase tracking-wider w-1/12">Región</th>
                    <th class="px-2 py-3 text-center text-xs font-medium text-white uppercase tracking-wider w-1/12">País</th>
                  </tr>`;

    const dataTable = document.getElementById("dataTable");
    dataTable.innerHTML = "";

    data.forEach((item, index) => {
      let varietalDescriptions = item.varietal
        .map((varietal) => `<li>${varietal}</li>`)
        .join("");
      let row = `
        <tr>
          <td class="px-2 py-2 whitespace-nowrap text-sm text-center text-white bg-red-600">${
            index + 1
          }</td>
          <td class="px-2 py-2 whitespace-nowrap text-sm text-center text-white bg-red-600">${
            item.nombre
          }</td>
          <td class="px-2 py-2 whitespace-nowrap text-sm text-center text-white bg-red-600">${item.puntajePromedio.toFixed(
            2
          )}</td>
          ${
            tipoResenia == 2
              ? `<td class="px-2 py-2 whitespace-nowrap text-sm text-center text-white bg-red-600">${item.puntajePromedioSommelier.toFixed(
                  2
                )}</td>`
              : ""
          }
          <td class="px-2 py-2 whitespace-nowrap text-sm text-center text-white bg-red-600 overflow-hidden text-ellipsis">
            <ul class="list-disc list-inside">${varietalDescriptions}</ul>
          </td>
          <td class="px-2 py-2 whitespace-nowrap text-sm text-center text-white bg-red-600">${
            item.precio
          }</td>
          <td class="px-2 py-2 whitespace-nowrap text-sm text-center text-white bg-red-600">${
            item.datosBodega[0]
          }</td>
          <td class="px-2 py-2 whitespace-nowrap text-sm text-center text-white bg-red-600">${
            item.datosBodega[1][0]
          }</td>
          <td class="px-2 py-2 whitespace-nowrap text-sm text-center text-white bg-red-600">${
            item.datosBodega[1][1]
          }</td>
        </tr>
      `;
      dataTable.innerHTML += row;
    });
  }
}

export default abrirModal;
