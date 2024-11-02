// import { WebSocketServer } from 'ws';
// import ConnectionManager from './connectionManager.js';
// import http from 'http';
// import dotenv from 'dotenv';
// import path from 'path';
// import fs from 'fs';


// dotenv.config();

// const PORT = process.env.PORT || 8080;

// const server = http.createServer((req, res) => {
//   if (req.url === '/health') {
//     res.writeHead(200);
//     res.end('Server is healthy');
//   }
// //    else {
// //     // Serve the frontend
// //     const filePath = path.join(__dirname, '../frontend/build', req.url === '/' ? 'index.html' : req.url);
// //     fs.readFile(filePath, (err, content) => {
// //       if (err) {
// //         if (err.code === 'ENOENT') {
// //           res.writeHead(404);
// //           res.end('404 Not Found');
// //         } else {
// //           res.writeHead(500);
// //           res.end('Server Error');
// //         }
// //       } else {
// //         res.writeHead(200, { 'Content-Type': 'text/html' });
// //         res.end(content, 'utf-8');
// //       }
// //     });
// //   }
// });

// const wss = new WebSocketServer({ noServer: true });

// const connectionManager = new ConnectionManager();

// wss.on('connection', function connection(ws) {
//   ws.on('error', console.error);
//   connectionManager.addUser(ws);

//   ws.on('message', function message(data) {
//     console.log('Received message:', data);
//   });

//   ws.on('close', () => {
//     console.log('Player disconnected');
//     connectionManager.removeUser(ws);
//   });

//   ws.send('Welcome to the your Virtual Headquarters!');
// });

// server.on('upgrade', (request, socket, head) => {
//   wss.handleUpgrade(request, socket, head, (ws) => {
//     wss.emit('connection', ws, request);
//   });
// });

// server.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });
// import { WebSocketServer } from 'ws';
// import ConnectionManager from './connectionManager.js';
// import http from 'http';
// import dotenv from 'dotenv';
// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';

// // Setting up __dirname for ES module compatibility
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config();

// const PORT = process.env.PORT || 8080;

// const server = http.createServer((req, res) => {
//   if (req.url === '/health') {
//     res.writeHead(200);
//     res.end('Server is healthy');
//   } 
// //   else {
// //     const filePath = path.join(__dirname, '../frontend/build', req.url === '/' ? 'index.html' : req.url);

// //     fs.readFile(filePath, (err, content) => {
// //       if (err) {
// //         if (err.code === 'ENOENT') {
// //           res.writeHead(404);
// //           res.end('404 Not Found');
// //         } else {
// //           res.writeHead(500);
// //           res.end('Server Error');
// //         }
// //       } else {
// //         const ext = path.extname(filePath);
// //         const mimeTypes = {
// //           '.html': 'text/html',
// //           '.js': 'application/javascript',
// //           '.css': 'text/css',
// //           '.json': 'application/json',
// //           '.png': 'image/png',
// //           '.jpg': 'image/jpeg',
// //         };
// //         const contentType = mimeTypes[ext] || 'text/html';
// //         res.writeHead(200, { 'Content-Type': contentType });
// //         res.end(content, 'utf-8');
// //       }
// //     });
// //   }
// });

// const wss = new WebSocketServer({ noServer: true });
// const connectionManager = new ConnectionManager();
// const map = new Map();
// wss.on('connection', (ws) => {
//   ws.on('error', console.error);
//   connectionManager.addUser(ws);

//   ws.on('message', (data) => {
//     data=JSON.parse(data);
//     map[data.playerId]={x:data.x,y:data.y};
//     ws.send(JSON.stringify({type:'position_update',map:map}));
//     console.log('Received message:', data);
//   });

//   ws.on('close', () => {
//     console.log('Player disconnected');
//     connectionManager.removeUser(ws);
//   });

//   ws.send(JSON.stringify({type:'Welcome to your Virtual Headquarters!'}));
 
// });

// server.on('upgrade', (request, socket, head) => {
//   wss.handleUpgrade(request, socket, head, (ws) => {
//     wss.emit('connection', ws, request);
//   });
// });

// server.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });


import { WebSocketServer } from 'ws';
import ConnectionManager from './connectionManager.js';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Setting up __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200);
    res.end('Server is healthy');
  }
});

const wss = new WebSocketServer({ noServer: true });
const connectionManager = new ConnectionManager();
const players = new Map(); // Store player positions

wss.on('connection', (ws) => {
  ws.on('error', console.error);
  connectionManager.addUser(ws);

  // Send initial welcome message
  ws.send(JSON.stringify({ type: 'Welcome to your Virtual Headquarters!' }));

  // Handle incoming messages from clients
  ws.on('message', (data) => {
    const parsedData = JSON.parse(data);

    if (parsedData.type === 'position_update') {
      // Update the position for the player
      const playerId = parsedData.playerId;
      players.set(playerId, { x: parsedData.x, y: parsedData.y });

      // Broadcast updated player positions to all connected clients
      const broadcastData = JSON.stringify({ type: 'position_update', map: Object.fromEntries(players) });
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(broadcastData);
        }
      });
    }
  });

  // Handle disconnection
  ws.on('close', () => {
    console.log('Player disconnected');
    connectionManager.removeUser(ws);
  });
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
