const express = require('express')
const { connectDialogflow, webhookGreenApi, webhookDaniel } = require('../controllers/webhookcontrollers')

const router = express.Router()

router.post("/dialogflow", connectDialogflow)
//router.post("/greenapi", webhookGreenApi) se puede borrar
router.post("/daniel", webhookDaniel)

module.exports = { dialogFlowRouter : router}

/*En resumen, este código crea un enrutador de Express que maneja  dos rutas POST: una para interactuar con Dialogflow y otra 
para interactuar con una API llamada "greenapi". Cada ruta está asociada a una función de manejo específica 
que probablemente se encargará de procesar las solicitudes y generar respuestas adecuadas.*/