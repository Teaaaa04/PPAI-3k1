// importamos las clases necesarias
import Bodega from "../backend/models/bodega.js";
import Pais from "../backend/models/pais.js";
import Provincia from "../backend/models/provincia.js";
import Vino from "../backend/models/vino.js";
import RegionVitivinicola from "../backend/models/regionVitivinicola.js";
import Varietal from "../backend/models/varietal.js";
import Reseña from "../backend/models/resenia.js";
import GestorRankingVinos from "../backend/services/gestorRankingVinos.js";
import abrirModal from "./scripts/modal.js";

// CREAMOS LAS FUNCIONES QUE NOS PERMITIRAN INSTANCIAR LOS OBJETOS DE LAS CLASES A PARTIR DE LOS DATOS DEL JSON
// ruta donde se encuentran los datos de los objetos en .json
const ruta = "../../backend/data/objetos.json";

// Funcion para cargar el array de bodegas, con datos extraidos del JSON
async function loadBodegas() {
  try {
    // Leer el archivo JSON con las bodegas
    return fetch(ruta).then((response) =>
      response.json().then((data) => {
        let listaBodegas = data[0].bodega;
        let bodegasTemp = listaBodegas.map((bodega) => {
          // Convertir regionVitivinicola en una instancia de la clase RegionVitivinicola
          let regionTemp = new RegionVitivinicola(
            bodega.regionVitivinicola.nombre,
            bodega.regionVitivinicola.descripcion
          );

          // Crear una instancia de Bodega con la instancia de RegionVitivinicola
          return new Bodega(
            bodega.coordenadasUbicacion,
            bodega.nombre,
            bodega.descripcion,
            bodega.fechaUltimaActualizacion,
            bodega.historia,
            bodega.periodoActualizacion,
            regionTemp
          );
        });
        // Devolución del array
        return bodegasTemp;
      })
    );
  } catch (error) {
    console.error("Error loading JSON:", error);
    throw error;
  }
}

// Funcion para cargar el array de paises, con datos extraidos del JSON
async function loadPaises() {
  try {
    // Leer el archivo JSON con los paises
    return fetch(ruta).then((response) =>
      response.json().then((data) => {
        let listaPaises = data[0].pais;

        // Crear un nuevo array para almacenar los objetos creados
        let paisesTemp = [];
        listaPaises.forEach((pais) => {
          // Convertir cada provincia en una instancia de la clase Provincia
          let provinciasTemp = pais.provincias.map((provincia) => {
            // Convertir cada región en una instancia de la clase RegionVitivinicola
            let regionesTemp = provincia.regiones.map(
              (region) =>
                new RegionVitivinicola(region.nombre, region.descripcion)
            );
            // Crear la instancia de Provincia con las regiones creadas
            return new Provincia(provincia.nombre, regionesTemp);
          });

          // Crear la instancia de Pais con las provincias creadas
          paisesTemp.push(new Pais(pais.nombre, provinciasTemp));
        });

        return paisesTemp;
      })
    );
  } catch (error) {
    console.error("Error al cargar el JSON:", error);
  }
}

// Funcion para cargar el array de provincias, con datos extraidos del JSON
// Funcion para cargar el array de provincias, con datos extraidos del JSON
async function loadProvincias() {
  try {
    // Leer el archivo JSON con las provincias
    return fetch(ruta).then((response) =>
      response.json().then((data) => {
        let listaPais = data[0].pais;

        // Crear un nuevo array para almacenar los objetos creados
        let provinciasTemp = [];
        listaPais.forEach((pais) => {
          pais.provincias.forEach((provincia) => {
            // Convertir cada region en una instancia de la clase RegionVitivinicola
            let regionesTemp = provincia.regiones.map(
              (region) =>
                new RegionVitivinicola(region.nombre, region.descripcion)
            );

            // Crear la instancia de Provincia con las regiones creadas
            provinciasTemp.push(new Provincia(provincia.nombre, regionesTemp));
          });
        });

        return provinciasTemp;
      })
    );
  } catch (error) {
    console.error("Error al cargar el JSON:", error);
  }
}

async function loadRegiones() {
  try {
    // Leer el archivo JSON con las regiones
    return fetch(ruta).then((response) =>
      response.json().then((data) => {
        let listaPais = data[0].pais;
        // Crear un nuevo array para almacenar los objetos creados
        let regionesTemp = [];
        listaPais.forEach((pais) => {
          pais.provincias.forEach((provincia) => {
            provincia.regiones.forEach((region) => {
              regionesTemp.push(
                new RegionVitivinicola(region.nombre, region.descripcion)
              );
            });
          });
        });
        // Devolucion del array

        return regionesTemp;
      })
    );
    // También podríamos devolver las regiones o realizar otras operaciones aquí
  } catch (error) {
    console.error("Error al cargar el JSON:", error);
  }
}

async function loadVarietal() {
  try {
    // Leer el archivo JSON con las variedades
    return fetch(ruta).then((response) =>
      response.json().then((data) => {
        let listaVarietal = data[0].varietal;
        // Crear un nuevo array para almacenar los objetos creados
        let variedadesTemp = [];
        listaVarietal.forEach((varietal) => {
          variedadesTemp.push(
            new Varietal(varietal.descripcion, varietal.porcentajeDeComposicion)
          );
        });
        // Devolucion del array
        return variedadesTemp;
      })
    );
  } catch (error) {
    console.error("Error al cargar el JSON:", error);
  }
}

async function loadVinos() {
  try {
    // Leer el archivo JSON con los vinos
    return fetch(ruta).then((response) =>
      response.json().then((data) => {
        let listaVinos = data[0].vinos;

        // Crear un nuevo array para almacenar los objetos creados
        let vinosTemp = listaVinos.map((vino) => {
          // Convertir cada reseña en una instancia de la clase Resenia
          let reseniasTemp = vino.reseña.map(
            (resenia) =>
              new Reseña(
                resenia.comentario,
                resenia.esPremium,
                resenia.fechaResenia,
                resenia.puntaje
              )
          );

          // Convertir bodega en una instancia de la clase Bodega

          let regionVitivinicolaTemp = new RegionVitivinicola(
            vino.bodega.regionVitivinicola.nombre,
            vino.bodega.regionVitivinicola.descripcion
          );

          let bodegaTemp = new Bodega(
            vino.bodega.coordenadasUbicacion,
            vino.bodega.nombre,
            vino.bodega.descripcion,
            vino.bodega.fechaUltimaActualizacion,
            vino.bodega.historia,
            vino.bodega.periodoActualizacion,
            regionVitivinicolaTemp
          );

          // Convertir varietal en una instancia de la clase Varietal
          let varietalTemp = vino.varietal.map(
            (elVarietal) =>
              new Varietal(
                elVarietal.descripcion,
                elVarietal.porcentajeDeComposicion
              )
          );

          // Crear una instancia de Vino con las instancias de Resenia, Bodega y Varietal
          return new Vino(
            vino.aniada,
            vino.imagenEtiqueta,
            vino.nombre,
            vino.notaDeCata,
            vino.precio,
            varietalTemp,
            bodegaTemp,
            reseniasTemp
          );
        });

        // Devolucion del array
        return vinosTemp;
      })
    );
  } catch (error) {
    console.error("Error al cargar el JSON:", error);
  }
}

async function loadReseñas() {
  try {
    // Leer el archivo JSON con las reseñas
    return fetch(ruta).then((response) =>
      response.json().then((data) => {
        let listaReseñas = data[0].reseñas;
        // Crear un nuevo array para almacenar los objetos creados
        let reseñasTemp = [];
        listaReseñas.forEach((resenia) => {
          reseñasTemp.push(
            new Reseña(
              resenia.comentario,
              resenia.esPremium,
              resenia.fechaResenia,
              resenia.puntaje
            )
          );
        });
        return reseñasTemp;
      })
    );
  } catch (error) {
    console.error("Error al cargar el JSON:", error);
  }
}

// EVENTO AL HACER CLICK EN EL BOTON CONFIRMAR RANKING, COMIENZA LA EJECUCION DEL PROGRAMA

// definimos el boton confirmar
let buttonConfirm = document.getElementById("ButtonConfirm");

buttonConfirm.addEventListener("click", async () => {
  try {
    // cargamos los datos de los objetos en arrays
    const bodegas = await loadBodegas();
    const paises = await loadPaises();
    const provincias = await loadProvincias();

    const regiones = await loadRegiones();

    const variedades = await loadVarietal();
    const vinos = await loadVinos();
    const reseñas = await loadReseñas();

    // obtenemos los valores de los inputs necesarios por el gestor para generar el ranking
    const fechaDesde = document.getElementById("fechaDesde").value;
    const fechaHasta = document.getElementById("fechaHasta").value;
    const tipoReseña = document.getElementById("selectReseña").value;

    let inputSeleccionado = document.querySelector(
      'input[name="formatoReporte"]:checked'
    );

    // la pantalla valida que se haya seleccionado un formato de reporte
    if (inputSeleccionado == null) {
      alert("Debe seleccionar un formato de reporte");
      return;
    } else {
      inputSeleccionado = inputSeleccionado.value;
    }

    // la pantalla valida que la fecha desde sea menor a la fecha hasta
    if (fechaDesde >= fechaHasta) {
      alert("La fecha desde debe ser menor a la fecha hasta");
      return;
    }

    // creamos una instancia de GestorRankingVinos con los datos obtenidos de los inputs
    const gestor = new GestorRankingVinos(
      fechaDesde,
      fechaHasta,
      inputSeleccionado,
      tipoReseña
    );

    // invocamos a la funcion opcionGenerarRanking del gestor para obtener el ranking

    let ranking = gestor.opcionGenerarRanking(vinos, provincias, paises);

    // la pantalla valida que haya reseñas para mostrar
    if (ranking.length == 0) {
      alert("No hay datos para mostrar");
      return;
    }

    // la pantalla abre el modal con el ranking
    if (tipoReseña === 3) {
      alert(
        "No se puede visualizar el ranking de los vinos con ese tipo de reseña aún"
      );
    } else {
      abrirModal(ranking, tipoReseña);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
