const { default: axios } = require("axios");
const detectIntent = require("../utils/dialogflowIntent");
const {WebhookClient} = require('dialogflow-fulfillment');
const Recipes = require("../models/recipesModel");
const { Op } = require("sequelize");

const connectDialogflow = (req,res) => {  // Dónde sucede la magia,puedes acceder a terceros, chatgpt, gmail, basedatos, google sheet.

  const agent = new WebhookClient({ request:req, response:res  });

    const test = (agent) => {
      agent.add(`esto me llega desde en webhook`);
    } 

    const receta = async (agent) => { //  async + await. Todo lo que sea pedir informacion y esperar a ella, se usa async + await.
      const {typeFood	} = agent.parameters

      const tokens = typeFood[0].split(' ')

      const searchconditions = tokens.map( token => {
        return {
          rezeptart : { [Op.iLike] : `%${token}%` }
        }
      } )    

      const res = await Recipes.findOne({ where: {[Op.or] : searchconditions} }) // Lo devuelve en forma de array,por eso [0] para acceder a la posicion 0
      //rezeptart, en la base de datos busca esta palabra clave.

      console.log(res)


      if (!res) {
        return agent.add(`!!Hopla, ich habe sollches rezept noch nicht,warte ein paar Wochen *${typeFood}*`)
        // guardar en un excel, una persona pide una receta que no tienes, te interesa hacerla? 
      }

      agent.add(`Mira la receta que encontre para ti\n*Nombre:* ${res.rezeptart}\n\n*Ingredientes:* ${res.zutaten}\n\n*Preparacion:* ${res.anleitung}\n\n Espero que te guste`)
 
  
      
    }


  let intentMap = new Map();
  intentMap.set('testing', test)
  intentMap.set('rezept', receta) // Si cambio en dialogflow el intent, aquí también debo cambiar.
  // intentMap.set('sauce', salsa)

 
  agent.handleRequest(intentMap);
    
//La línea de código res.status(200).json(jsonResponse) se utiliza para enviar una respuesta al cliente (en este caso, a Dialogflow)
// con un estado HTTP 200 y con el contenido de jsonResponse en formato JSON.
}
const webhookGreenApi =  (req,res) => {
    console.log(req.body.messageData.extendedTextMessageData.text)
  }


const webhookDaniel = async (req,res) =>{

  const { body, from } = req.body.message
  const message = await detectIntent(body)  //DetectIntent es exportado desde dialogflowintent

  if(from === process.env.PHONE){
    const data = {
      phone : from,
      message,
      nameSession: 'miguel' 
  }

   await axios.post('https://7ba9-79-117-198-62.ngrok-free.app/api/v1/user/sendmessage', data )
  }

  


}


module.exports = {connectDialogflow, webhookGreenApi, webhookDaniel}


/*res.status(200).json(jsonResponse)
Enviar una respuesta a través de un webhook es esencial en la comunicación entre una plataforma de procesamiento de lenguaje natural, como Dialogflow, y una aplicación o 
servicio externo. En el contexto de la interacción con Dialogflow, enviar una respuesta es fundamental para que el asistente virtual o chatbot pueda proporcionar respuestas 
personalizadas y relevantes a los usuarios.

Cuando un usuario interactúa con un asistente virtual o chatbot en Dialogflow, la plataforma procesa el mensaje del usuario y determina la "intención" detrás del mensaje,
 es decir, qué es lo que el usuario está tratando de comunicar o hacer. Luego, la plataforma envía esta información a un webhook configurado,
  que es donde entra en juego la función connectDialogflow que has proporcionado.

Esta función se encarga de:

Procesar la intención detectada y otros datos relevantes de la solicitud entrante.

Construir una respuesta personalizada en función de la intención detectada y otros criterios.

Enviar esta respuesta de vuelta a Dialogflow para que se la presente al usuario.

Dialogflow, a su vez, toma esta respuesta y la presenta al usuario en la conversación, proporcionando así una experiencia conversacional interactiva.
 Por ejemplo, si el usuario está pidiendo una receta, como se detectó por la intención "receta", el webhook genera una respuesta relacionada con recetas y la envía a Dialogflow. 
 Luego, Dialogflow presenta esa respuesta al usuario para que continúe la conversación de manera natural.

En resumen, enviar una respuesta a través del webhook es cómo se logra la comunicación bidireccional entre Dialogflow y la aplicación o servicio externo,
 permitiendo que el asistente virtual responda de manera inteligente y personalizada a las interacciones del usuario.*/