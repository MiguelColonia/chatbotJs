const express = require('express')
const { addReceps } = require('../controllers/recepscontroller')

const router = express.Router()

router.post("/add", addReceps )

module.exports = { recepRouter : router}

/*const express = require('express') Después de ejecutar esta línea,la variable express contendrá todas las funcionalidades proporcionadas por el módulo Express, 
 { addReceps }: Esta es una destructuración de objeto de JavaScript. Si el archivo recepscontroller.js exporta varios elementos, como funciones o variables, 
 esto permite extraer específicamente la función addReceps del objeto exportado y asignarla a la constante addReceps.
 En resumen, esta línea de código te permite importar la función addReceps desde el archivo recepscontroller.js en tu aplicación. Esto te permitiría utilizar
  la función addReceps en el archivo actual para ejecutar las acciones definidas en recepscontroller.js, por ejemplo, en el contexto de un servidor web basado 
  en Node.js utilizando Express. 
router.post es un método proporcionado por el enrutador de Express en Node.js que se utiliza para manejar solicitudes HTTP POST en una aplicación web. 
En el contexto de Express, un enrutador es una manera de organizar y manejar diferentes rutas y acciones dentro de tu aplicación.*/

