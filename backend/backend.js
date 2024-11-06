import { sequelize } from "./base-orm/db-init.js";
import CrearBaseSiNoExiste from "./base-orm/sqlite-init.js";

CrearBaseSiNoExiste();
await sequelize.sync();
console.log("Base de datos sincronizada");
