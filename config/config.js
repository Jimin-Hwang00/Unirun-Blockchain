require('dotenv').config();
const env = process.env;

const development = {
  username: env.DEV_DB_USERNAME,
  password: env.DEV_DB_PASSWORD,
  database: env.DEV_DB_DATABASE,
  host: env.DEV_DB_HOST,
  port: env.DEV_DB_PORT, 
  dialect: "mariadb",
}

const production = {
  username: env.PRD_DB_USERNAME,
  password: env.PRD_DB_PASSWORD,
  database: env.PRD_DB_DATABASE,
  host: env.PRD_DB_HOST,
  port: env.PRD_DB_PORT,
  dialect: "mariadb",
}

const test = {
  username: env.DEV_DB_USERNAME,
  password: env.DEV_DB_PASSWORD,
  database: env.DEV_DB_DATABASE,
  host: env.DEV_DB_HOST,
  port: env.DEV_DB_PORT, 
  dialect: "mariadb",
}

module.exports = {
  development,
  production,
  test,
}