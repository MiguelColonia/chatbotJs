const dialogflow = require('@google-cloud/dialogflow'); // Importacion de la libreria,importante.

const sessionId = "some-unique-id"; // Puede ser cualquier identificador único, como un ID de usuario
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: "botwhatsapp_keys.json",
});

const sessionPath = sessionClient.projectAgentSessionPath(
  "mecanica-edkr",  //"futterne1d-wmxd"
  sessionId
);

const detectIntent = async (text) => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: text,
        languageCode: "de-DE",
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  /* console.log(responses)
  console.log(`Query: ${result.queryText}`);
  console.log(`Response: ${result.fulfillmentText}`); */

  return result.fulfillmentText;
};

module.exports = detectIntent;

/* const userInput = "Como cocinar un pollo";
    const response = await detectIntent(userInput);
    console.log(response); */

    