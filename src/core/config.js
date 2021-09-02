require('dotenv').config()

module.exports = {
  TOKEN: process.env.TOKEN,
  ENVIRONMENT: process.env.ENVIRONMENT,
  URL: process.env.URL,
  PORT: process.env.PORT,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS
}