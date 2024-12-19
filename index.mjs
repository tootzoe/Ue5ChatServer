



import  http  from "http"
import  express  from "express"
import WebSocket, { WebSocketServer } from "ws"
import nanoid from 'nanoid-esm';


const portNum = 8908
const subNodePath = 'chat'

const clients = new Map(); // has to be a Map instead of {} due to non-string keys


const app = express()

const server = http.createServer(app)


app.get('/', (req, res) => {
  res.send(`${subNodePath} http server response`)
  console.log(`${subNodePath} http server response......`)
})

const wsServer = new WebSocketServer({
  server,
  path: `/${subNodePath}`,
})


wsServer.on('connection', (connection) => {
  connection.send('I am a websocket response')
  console.log(`I am a websocket response,................`)

  const id = nanoid() ;// randomUUID();
    clients.set(connection, id);
    console.log(`new connection assigned id: ${id}`);


    // send a message to all connected clients upon receiving a message from one of the connected clients
    connection.on('message', (data , isBinary) => {
          console.log(`received Data : ${isBinary ? 'Binary' : 'Text'} ${data}`);
          serverBroadcast(data, isBinary);


  });

  // stop tracking the client upon that client closing the connection
  connection.on('close', () => {
      console.log(`connection (id = ${clients.get(connection)}) closed`);
      clients.delete(connection);
  });

  // send the id back to the newly connected client
  connection.send(`You have been assigned id ${id}`);

});

// send a message to all the connected clients about how many of them there are every 15 seconds
setInterval(() => {
  console.log(`Number of connected clients: ${clients.size}`);
  serverBroadcast(`Number of connected clients: ${clients.size}`);
}, 15000);


// function for sending a message to every connected client
function serverBroadcast(message, isBinary) {
  wsServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
           client.send(message, {binary: isBinary})
      }
  });
}


server.listen(portNum, () => {
  console.log(`Server is now running on http://127.0.0.1:${portNum}`)
  console.log(`Websocket is now running on ws://127.0.0.1:${portNum}/${subNodePath}`)
})


