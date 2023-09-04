const { DataTypes } = require('sequelize') //ORM
const db = require('../config/database')

const Recipes = db.define("recipe", {   // Una conexion, a la base de datos creada en database.js, esto es una autentificacion.
    id: {
        primaryKey: true,
        autoIncrement : true,
        allowNull : false,
        type : DataTypes.INTEGER
    },
    rezeptart:{
        allowNull: false,
        type: DataTypes.STRING
    },
    zutaten : {
        allowNull: false,
        type: DataTypes.TEXT
    },
    anleitung : {
        allowNull: false,
        type: DataTypes.TEXT
    }
})

module.exports = Recipes  