const { Sequelize } = require('sequelize') // libreria 
require('dotenv').config()


const db = new Sequelize({
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOSTNAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    logging: false
})


module.exports = db

//require('dotenv').config();: Aquí estás utilizando la librería "dotenv".
//"dotenv" es una librería que te permite cargar variables de entorno desde un archivo .env en tu proyecto. 