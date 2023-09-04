const express = require('express')
const { dialogFlowRouter } = require('./routes/webhookRoute')
const { recepRouter } = require('./routes/recepsRoute')


const app = express()
app.use(express.json())

app.use("/webhook", dialogFlowRouter)
app.use("/api/v1/receps", recepRouter) 


module.exports = app


/*En resumen, este código configura una aplicación Express que incluye dos enrutadores personalizados:
 uno para manejar solicitudes de webhook relacionadas con DialogFlow y otro para manejar rutas relacionadas con operaciones "recep" a través de una API en el camino /api/v1/receps.*/