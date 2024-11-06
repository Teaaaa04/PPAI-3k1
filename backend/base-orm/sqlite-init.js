// CrearBaseSiNoExiste.js
import db from "aa-sqlite";

async function CrearBaseSiNoExiste() {
  try {
    // Abrir base de datos (si no existe, la crea)
    await db.open("./data/tp-db.db");

    // Verificar si la tabla Bodegas existe
    let res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Bodegas'",
      []
    );
    if (res.contar === 0) {
      await db.run(
        `CREATE TABLE Bodegas (
          id_bodega INTEGER PRIMARY KEY AUTOINCREMENT,
          coordenadasUbicacion TEXT NOT NULL,
          nombre TEXT NOT NULL,
          descripcion TEXT,
          fechaUltimaActualizacion DATE,
          historia TEXT,
          periodoActualizacion TEXT,
          regionVitivinicolaId INTEGER,
          FOREIGN KEY (regionVitivinicolaId) REFERENCES RegionVitivinicola(id_region)
        );`
      );
      console.log("Tabla Bodegas creada!");
      await db.run(
        "INSERT INTO Bodegas (coordenadasUbicacion, nombre, descripcion, fechaUltimaActualizacion, historia, periodoActualizacion, regionVitivinicolaId) VALUES ('40.4168° N, 3.7038° W', 'Bodega García', 'Bodega familiar con más de 100 años de tradición en la elaboración de vinos.', '2023-12-15', 'Fundada en 1910 por la familia García, la bodega se ha mantenido en manos de la misma familia durante cuatro generaciones.', 'Anual', 2), ('45.4642° N, 9.1900° E', 'Bodega Verde', 'Bodega boutique especializada en la producción de vinos orgánicos.', '2023-10-20', 'La bodega fue establecida en 2005 por un grupo de amigos apasionados por el vino y el respeto al medio ambiente.', 'Semestral', 3), ('39.6578° N, 8.1393° W', 'Bodega Innovadora', 'Bodega moderna con tecnología de última generación.', '2023-11-30', 'Inaugurada en 2017 por un consorcio de inversores internacionales, la bodega se ha destacado por su innovación y calidad.', 'Trimestral', 6), ('38.7223° N, 9.1393° W', 'Bodega Centenaria', 'Bodega familiar con viñedos centenarios.', '2023-09-05', 'Construida en 1890 por el bisabuelo de la actual propietaria, la bodega ha sido gestionada por la misma familia durante más de 130 años.', 'Anual', 8) ;"
      );
    }

    // Verificar si la tabla Pais existe
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Pais'",
      []
    );
    if (res.contar === 0) {
      await db.run(
        `CREATE TABLE Pais (
          id_pais INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL
        );`
      );
      console.log("Tabla Pais creada!");
      await db.run(
        "INSERT INTO Pais (nombre) VALUES ('Argentina'), ('Brasil'), ('Mexico');"
      );
    }

    // Verificar si la tabla Provincia existe
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Provincia'",
      []
    );
    if (res.contar === 0) {
      await db.run(
        `CREATE TABLE Provincia (
          id_provincia INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          id_pais INTEGER,
          FOREIGN KEY (id_pais) REFERENCES Pais(id_pais)
        );`
      );
      console.log("Tabla Provincia creada!");
      await db.run(
        "INSERT INTO Provincia (nombre, id_pais) VALUES ('Buenos Aires', 1), ('Córdoba', 1), ('Sao Paulo', 2), ('Rio de Janeiro', 2), ('Yucatán', 3), ('Guerrero', 3);"
      );
    }

    // Verificar si la tabla RegionVitivinicola existe
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'RegionVitivinicola'",
      []
    );
    if (res.contar === 0) {
      await db.run(
        `CREATE TABLE RegionVitivinicola (
          id_region INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          descripcion TEXT,
          id_provincia INTEGER,
          FOREIGN KEY (id_provincia) REFERENCES Provincia(id_provincia)
        );`
      );
      console.log("Tabla RegionVitivinicola creada!");
      await db.run(
        "INSERT INTO RegionVitivinicola (nombre, descripcion, id_provincia) VALUES ('La Plata', 'La Plata es una región muy beneficiosa para la producción de vinos debido a su clima templado y suelos fértiles.', 1), ('Mar del Plata', 'Mar del Plata tiene un clima marítimo que contribuye a la producción de vinos frescos y aromáticos.', 1), ('Córdoba Norte', 'Córdoba Norte se destaca por sus bodegas que producen vinos de alta calidad, aprovechando sus suelos ricos y condiciones climáticas favorables.', 2), ('Villa Carlos Paz', 'Villa Carlos Paz, aunque más conocida por el turismo, también alberga viñedos que producen vinos boutique.', 2), ('Sao Paulo Sur', 'Sao Paulo Sur cuenta con varias bodegas emergentes que se benefician del clima variado para producir vinos innovadores.', 3), ('Campinas', 'Campinas es reconocida por su creciente industria vitivinícola, produciendo vinos de uvas adaptadas al clima tropical.', 3), ('Rio de Janeiro Sur', 'Rio de Janeiro Sur está desarrollando su industria vinícola con plantaciones experimentales que muestran buen potencial.', 4), ('Niteroi', 'Niteroi tiene un pequeño pero creciente número de viñedos que producen vinos destinados principalmente al consumo local.', 4), ('Mérida', 'Mérida está explorando la producción de vinos con uvas adaptadas al clima cálido de la región.', 5), ('Progreso', 'Progreso está comenzando a establecer viñedos que aprovechan las brisas marinas para el cultivo de uvas de calidad.', 5), ('Acapulco', 'Acapulco tiene un clima tropical que presenta desafíos y oportunidades únicas para la viticultura en pequeña escala.', 6), ('Zihuatanejo', 'Zihuatanejo está incursionando en la viticultura con viñedos experimentales que buscan diversificar la producción agrícola local.', 6);"
      );
    }

    // Verificar si la tabla Resenia existe
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Resenia'",
      []
    );
    if (res.contar === 0) {
      await db.run(
        `CREATE TABLE Resenia (
          id_resenia INTEGER PRIMARY KEY AUTOINCREMENT,
          comentario TEXT NOT NULL,
          esPremium BOOLEAN NOT NULL,
          fechaResenia TEXT NOT NULL,
          puntaje INTEGER NOT NULL,
          id_vino INTEGER,
          FOREIGN KEY (id_vino) REFERENCES Vino(id_vino)
        );`
      );
      console.log("Tabla Resenia creada!");
      await db.run(
        "INSERT INTO Resenia (comentario, esPremium, fechaResenia, puntaje, id_vino) VALUES \
        ('Excelente vino, gran relación calidad-precio.', false, '2023-01-12', 4, 1),\
        ('Un vino excepcional, perfecto para ocasiones especiales', false, '2023-08-20', 5, 1), \
        ('Un vino delicioso, lo recomiendo ampliamente.', false, '2023-10-10', 4, 2),\
        ('Buena relación calidad-precio, pero nada extraordinario.', false, '2023-11-25', 3, 2),\
        ('Un vino único, me encantó la complejidad de sabores.', false, '2023-12-30', 5, 2),\
        ('No lo volvería a comprar, bastante ordinario.', false, '2024-01-15', 2, 3),\
        ('Un vino decente, pero esperaba algo más por el precio.', true, '2024-02-20', 3, 3),\
        ('No cumplió con mis expectativas, bastante decepcionante.', false, '2023-09-05', 2, 4),\
        ('Buena relación calidad-precio, pero nada extraordinario.', false, '2023-11-25', 3, 4),\
        ('Buena relación calidad-precio, pero nada extraordinario.', false, '2023-11-25', 3, 5),\
        ('Un vino único, me encantó la complejidad de sabores.', true, '2023-12-30', 5, 5),\
        ('No lo volvería a comprar, bastante ordinario.', false, '2024-01-15', 2, 5), \
        ('Excelente vino, gran relación calidad-precio.', false, '2023-07-15', 4, 6),\
        ('Un vino excepcional, perfecto para ocasiones especiales.', true, '2023-08-20', 5, 6),\
        ('Un vino delicioso, lo recomiendo ampliamente.', true, '2023-10-10', 4, 6),\
        ('Un vino único, me encantó la complejidad de sabores.', true, '2023-12-30', 5, 6),\
        ('Un vino decente, pero esperaba algo más por el precio.', true, '2024-02-20', 3, 7),\
        ('Un vino muy equilibrado y agradable al paladar.', false, '2024-03-05', 4, 7),\
        ('Un vino muy equilibrado y agradable al paladar.', false, '2024-03-05', 4, 8),\
        ('Definitivamente uno de los mejores vinos que he probado.', true, '2024-04-10', 5, 8),\
        ('No lo volvería a comprar, bastante ordinario.', false, '2024-01-15', 2, 9),\
        ('Un vino decente, pero esperaba algo más por el precio.', true, '2024-02-20', 3, 9),\
        ('Un vino único, me encantó la complejidad de sabores.', true, '2023-12-30', 5, 10),\
        ('No lo volvería a comprar, bastante ordinario.', false, '2024-01-15', 2, 10),\
        ('Un vino decente, pero esperaba algo más por el precio.', true, '2024-02-20', 3, 10),\
        ('Un vino único, me encantó la complejidad de sabores.', true, '2023-12-30', 5, 11),\
        ('Un vino muy equilibrado y agradable al paladar.', false, '2024-03-05', 4, 11),\
        ('Definitivamente uno de los mejores vinos que he probado.', true, '2024-04-10', 5, 11),\
        ('Un vino excepcional, perfecto para ocasiones especiales.', true, '2023-08-20', 5, 12),\
        ('No cumplió con mis expectativas, bastante decepcionante.', false, '2023-09-05', 2, 12),\
        ('Buena relación calidad-precio, pero nada extraordinario.', false, '2023-11-25', 3, 13),\
        ('No lo volvería a comprar, bastante ordinario.', false, '2024-01-15', 2, 13),\
        ('Un vino decente, pero esperaba algo más por el precio.', true, '2024-02-20', 3, 13),\
        ('No lo volvería a comprar, bastante ordinario.', false, '2024-01-15', 2, 14),\
        ('Un vino decente, pero esperaba algo más por el precio.', true, '2024-02-20', 3, 14),\
        ('Un vino muy equilibrado y agradable al paladar.', false, '2024-03-05', 4, 14),\
        ('No cumplió con mis expectativas, bastante decepcionante.', false, '2023-09-05', 2, 15),\
        ('Buena relación calidad-precio, pero nada extraordinario.', false, '2023-11-25', 3, 15),\
        ('No lo volvería a comprar, bastante ordinario.', false, '2024-01-15', 2, 15),\
        ('Un vino decente, pero esperaba algo más por el precio.', true, '2024-02-20', 3, 15);"
      );
    }

    // Verificar si la tabla Varietal existe
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Varietal'",
      []
    );
    if (res.contar === 0) {
      await db.run(
        `CREATE TABLE Varietal (
          id_varietal INTEGER PRIMARY KEY AUTOINCREMENT,
          descripcion TEXT NOT NULL,
          porcentajeComposicion INTEGER NOT NULL,
          id_vino INTEGER
        );`
      );
      console.log("Tabla Varietal creada!");
      await db.run(
        "INSERT INTO Varietal (descripcion, porcentajeComposicion, id_vino) VALUES \
          ('Un varietal de uva tinto con cuerpo, conocido por sus taninos firmes y aromas de grosella negra, tabaco y cedro', 20, 1), \
          ('Varietal tinto suave con sabores de cereza, ciruela y un toque de chocolate. Menos tánico que el Cabernet Sauvignon', 15, 1), \
          ('Un varietal de uva tinto con cuerpo, conocido por sus taninos firmes y aromas de grosella negra, tabaco y cedro', 20, 2), \
          ('Varietal tinto suave con sabores de cereza, ciruela y un toque de chocolate. Menos tánico que el Cabernet Sauvignon', 15, 2), \
          ('Vino tinto elegante y ligero con aromas de fresas, frambuesas y notas terrosas. Ideal para maridar con aves y pescados.', 10, 3), \
          ('Varietal tinto robusto con sabores de mora, arándano y especias, a menudo con un toque de pimienta negra.', 25, 3), \
          ('Vino tinto elegante y ligero con aromas de fresas, frambuesas y notas terrosas. Ideal para maridar con aves y pescados.', 10, 4), \
          ('Varietal blanco con cuerpo, con sabores de manzana, pera y un toque de mantequilla y roble, dependiendo del estilo', 5, 4), \
          ('Varietal blanco con cuerpo, con sabores de manzana, pera y un toque de mantequilla y roble, dependiendo del estilo', 5, 5), \
          ('Variedad tinta española con sabores a frutas rojas, vainilla y especias. Es la uva principal en muchos vinos tintos de España.', 5, 5), \
          ('Varietal tinto suave con sabores de cereza, ciruela y un toque de chocolate. Menos tánico que el Cabernet Sauvignon', 15, 6), \
          ('Vino tinto elegante y ligero con aromas de fresas, frambuesas y notas terrosas. Ideal para maridar con aves y pescados.', 10, 6), \
          ('Varietal tinto robusto con sabores de mora, arándano y especias, a menudo con un toque de pimienta negra.', 25, 6), \
          ('Varietal tinto robusto con sabores de mora, arándano y especias, a menudo con un toque de pimienta negra.', 25, 7), \
          ('Vino tinto con cuerpo, conocido por sus intensos sabores de frutas negras, ciruela y notas de cacao.', 10, 7), \
          ('Varietal blanco con cuerpo, con sabores de manzana, pera y un toque de mantequilla y roble, dependiendo del estilo', 5, 7), \
          ('Vino tinto con cuerpo, conocido por sus intensos sabores de frutas negras, ciruela y notas de cacao.', 10, 8), \
          ('Varietal tinto robusto con sabores de mora, arándano y especias, a menudo con un toque de pimienta negra.', 25, 8), \
          ('Un varietal de uva tinto con cuerpo, conocido por sus taninos firmes y aromas de grosella negra, tabaco y cedro', 20, 9), \
          ('Variedad tinta española con sabores a frutas rojas, vainilla y especias. Es la uva principal en muchos vinos tintos de España.', 5, 9), \
           ('Vino tinto elegante y ligero con aromas de fresas, frambuesas y notas terrosas. Ideal para maridar con aves y pescados.', 10, 10), \
          ('Varietal tinto robusto con sabores de mora, arándano y especias, a menudo con un toque de pimienta negra.', 25, 10), \
          ('Vino tinto elegante y ligero con aromas de fresas, frambuesas y notas terrosas. Ideal para maridar con aves y pescados.', 10, 10), \
          ('Varietal tinto suave con sabores de cereza, ciruela y un toque de chocolate. Menos tánico que el Cabernet Sauvignon', 15, 11), \
          ('Vino tinto elegante y ligero con aromas de fresas, frambuesas y notas terrosas. Ideal para maridar con aves y pescados.', 10, 11), \
          ('Un varietal de uva tinto con cuerpo, conocido por sus taninos firmes y aromas de grosella negra, tabaco y cedro', 20, 12), \
          ('Varietal tinto suave con sabores de cereza, ciruela y un toque de chocolate. Menos tánico que el Cabernet Sauvignon', 15, 12), \
          ('Varietal tinto robusto con sabores de mora, arándano y especias, a menudo con un toque de pimienta negra.', 25, 12), \
          ('Varietal tinto suave con sabores de cereza, ciruela y un toque de chocolate. Menos tánico que el Cabernet Sauvignon', 15, 13), \
          ('Vino tinto elegante y ligero con aromas de fresas, frambuesas y notas terrosas. Ideal para maridar con aves y pescados.', 10, 13), \
          ('Varietal tinto robusto con sabores de mora, arándano y especias, a menudo con un toque de pimienta negra.', 25, 14), \
          ('Vino tinto con cuerpo, conocido por sus intensos sabores de frutas negras, ciruela y notas de cacao.', 10, 14), \
          ('Vino tinto con cuerpo, conocido por sus intensos sabores de frutas negras, ciruela y notas de cacao.', 10, 15), \
          ('Varietal tinto robusto con sabores de mora, arándano y especias, a menudo con un toque de pimienta negra.', 25, 15), \
          ('Vino tinto elegante y ligero con aromas de fresas, frambuesas y notas terrosas. Ideal para maridar con aves y pescados.', 10, 15);"
      );
    }

    // Verificar si la tabla Vino existe
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Vino'",
      []
    );
    if (res.contar === 0) {
      await db.run(
        `CREATE TABLE Vino (
          id_vino INTEGER PRIMARY KEY AUTOINCREMENT,
          aniada INTEGER NOT NULL,
          imagenEtiqueta TEXT NOT NULL,
          nombre TEXT NOT NULL,
          notaDeCataBodega INTEGER NOT NULL,
          precioARS INTEGER NOT NULL,
          id_bodega INTEGER
        );`
      );
      console.log("Tabla Vino creada!");
      await db.run(
        "INSERT INTO Vino (aniada, imagenEtiqueta, nombre, notaDeCataBodega, precioARS, id_bodega) VALUES \
        (2018, 'imgen1', 'El Supremo', 4, 12000, 1),\
        (2015, 'imgen2', 'La Estrella', 8, 27000, 4),  \
        (2012, 'imgen3', 'El Gran Reserva', 5, 18000, 2), \
        (2019, 'imgen4', 'La Cumbre', 9, 42000, 1), \
        (2013, 'imgen5', 'El Dorado', 3, 25000, 1), \
        (2022, 'imgen6', 'La Perla', 7, 38000, 4), \
        (2017, 'imgen7', 'El Majestuoso', 6, 15000, 4), \
        (2011, 'imgen8', 'La Leyenda', 10, 48000, 2), \
        (2021, 'imgen9', 'El Noble', 2, 35000, 4), \
        (2014, 'imgen10', 'La Gloria', 7, 5000, 3),\
        (2016, 'imgen11', 'El Triunfador', 8, 40000, 2),\
        (2023, 'imgen12', 'La Excelencia', 9, 30000, 3),\
        (2010, 'imgen13', 'El Diamante', 5, 22000, 3),\
        (2020, 'imgen14', 'La Suprema', 3, 32000, 3),\
        (2013, 'imgen15', 'El Brillante', 10, 26000, 1);"
      );
    }

    // Cerrar conexión a la base de datos
    await db.close();
  } catch (error) {
    console.log(error);
  }
}

export default CrearBaseSiNoExiste;
