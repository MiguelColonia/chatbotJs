const app = require("./app")
const db = require("./config/database")


db.authenticate()
    .then(() => {
        console.log("[+] Base de datos conectada!!")
    })
    .catch((err) => {
        console.log("[!] Error", err)
    })  
    
db.sync() // en produccion esto sería un desastre,lo borra todo, la lias parda. db.sync({force : true})
    .then(() => {
        console.log("[+] Base de datos sincronizada")
    })
    .catch((err) => {
        console.log("[!] Error : ", err)
    })
        

app.listen(4000, () => {
    console.log('Server runnig for port 4000')
})


/*const app = require("./app"): Importa el módulo app desde el archivo "app.js" 
Const db = require("./config/database"): Importa el módulo db desde el archivo "database.js" 
ubicado en el directorio "config" db.authenticate(): Invoca el método authenticate() del objeto db, que representa la conexión a la base de datos utilizando Sequelize. 
Este método intenta autenticarse en la base de datos.

.then(() => { ... }): Este bloque de código se ejecutará si la autenticación en la base de datos es exitosa. En este caso, muestra un mensaje en la consola 
indicando que la base de datos se ha conectado correctamente.

.catch((err) => { ... }): Este bloque de código se ejecutará si ocurre un error durante la autenticación en la base de datos.
En este caso, muestra un mensaje de error en la consola.

app.listen(4000, () => { ... }): Inicia el servidor Express y lo hace escuchar en el puerto 4000. Cuando el servidor se inicie correctamente, 
se ejecutará la función de devolución de llamada, que muestra un mensaje en la consola indicando que el servidor está en funcionamiento en el puerto 4000 */



//En resumen, este código está realizando dos acciones principales: autenticar la conexión a la base de datos utilizando Sequelize y
//luego iniciar el servidor Express para que escuche en el puerto 4000. Las funciones de devolución de llamada .then() y .catch() 
//se utilizan para manejar los resultados exitosos y los errores de la autenticación de la base de datos.
