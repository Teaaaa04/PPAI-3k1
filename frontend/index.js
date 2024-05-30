import Bodega from "../backend/models/bodega.js";
import Pais from "../backend/models/pais.js";
import Provincia from "../backend/models/provincia.js";
import Vino from "../backend/models/vino.js";
import RegionVitivinicola from "../backend/models/regionVitivinicola.js";
import Varietal from "../backend/models/varietal.js";
import Reseña from "../backend/models/resenia.js";
import GestorRankingVinos from "../backend/services/gestorRankingVinos.js";
// Definicion de la ruta donde se encuentran los objetos
const ruta = "../../backend/data/objetos.json";

// Funcion para cargar el array de bodegas, con datos extraidos del JSON
async function loadBodegas() {
  try {
    // Fetch the JSON file with the bodegas data
    return fetch(ruta).then((response) =>
      response.json().then((data) => {
        let listaBodegas = data[0].bodega;
        let bodegasTemp = listaBodegas.map((bodega) => {
          // Convertir regionVitivinicola en una instancia de la clase RegionVitivinicola
          let regionTemp = new RegionVitivinicola(
            bodega.regionVitivinicola.nombre,
            bodega.regionVitivinicola.descripcion,
            bodega.regionVitivinicola.fechaUltimaActualizacion
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
    //Leer el archivo JSON con los paises
    return fetch(ruta).then(
      (response) =>
        response.json().then((data) => {
          let listaPaises = data[0].pais;

          // Crear un nuevo array para almacenar los objetos creados
          let paisesTemp = [];
          listaPaises.forEach((pais) => {
            paisesTemp.push(new Pais(pais.nombre, pais.provincias));
          });
          // console.log(paisesTemp);
          return paisesTemp;
        })
      //Devolucion del array
    );
  } catch (error) {
    console.error("Error al cargar el JSON:", error);
  }
}

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
            provinciasTemp.push(
              new Provincia(provincia.nombre, provincia.regiones)
            );
          });
        });
        // console.log(provinciasTemp);
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
                new RegionVitivinicola(region.descripcion, region.nombre)
              );
            });
          });
        });
        // Devolucion del array
        return regionesTemp;
      })
    );
    // También podrías devolver las regiones o realizar otras operaciones aquí
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
            vino.bodega.regionVitivinicola.descripcion,
            vino.bodega.regionVitivinicola.fechaUltimaActualizacion
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
          let varietalTemp = new Varietal(
            vino.varietal.nombre,
            vino.varietal.descripcion,
            vino.varietal.fechaUltimaActualizacion
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

// BOTON
let buttonConfirm = document.getElementById("ButtonConfirm");

buttonConfirm.addEventListener("click", async () => {
  try {
    // COMIENZO DEL CASO DE USO
    const bodegas = await loadBodegas();
    const paises = await loadPaises();
    const provincias = await loadProvincias();
    const regiones = await loadRegiones();
    const variedades = await loadVarietal();
    const vinos = await loadVinos();
    const reseñas = await loadReseñas();

    // OBTENCION DE DATOS DEL HTML
    const fechaDesde = document.getElementById("fechaDesde").value;
    const fechaHasta = document.getElementById("fechaHasta").value;
    const tipoReseña = document.getElementById("selectReseña").value;

    //console.log(fechaDesde, fechaHasta, tipoReseña);

    // CREACION DEL GESTOR
    const gestor = new GestorRankingVinos(
      fechaDesde,
      fechaHasta,
      "",
      tipoReseña
    );

    gestor.opcionGenerarRanking(vinos, provincias, paises);
  } catch (error) {
    console.error("Error:", error);
  }
});
