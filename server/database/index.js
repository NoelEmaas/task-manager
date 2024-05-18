import Sequelize from "sequelize";
import {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
} from "../config/index.js";

import task from "../models/task.model.js";

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false,
  operationsAliases: false,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

const database = {};
database.Sequelize = Sequelize;
database.sequelize = sequelize;
database.tasks = task(sequelize);

export default database;