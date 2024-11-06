import { Sequelize } from "sequelize";

const sequelize = new Sequelize("sqlite:" + "./data/tp-db.db");

export { sequelize };
