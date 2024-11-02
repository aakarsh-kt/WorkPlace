// import { Boot } from './scenes/Boot';
// import {WorkStation} from './scenes/WorkStation';
// import Phaser from 'phaser';
// import { Preloader } from './scenes/Preloader';

// // Find out more information about the Game Config at:
// // https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
// const socket = new WebSocket('ws://localhost:8080');

// // When the connection is established
// socket.addEventListener('open', () => {
//   console.log('Connected to WebSocket server');
// });

// // Listen for position updates from other players
// socket.addEventListener('message', (event) => {
//   const data = JSON.parse(event.data);
//   console.log(data);
//   // Check if the data is a position update
//   if (data.type === 'position_update') {
//     const { playerId, x, y } = data;

//     // Update the other player’s position based on their ID
//     if (otherPlayers[playerId]) {
//       otherPlayers[playerId].sprite.setPosition(x, y);
//     }
//   }
// });

// const config = {
//     type: Phaser.AUTO,
//     width: 1024,
//     height:800,
//     parent: 'game-container',
//     backgroundColor: '#028af8',
//     scene: [
//         Boot,
//         Preloader,
//         WorkStation
//     ],
//     physics: {
//         default: 'arcade',
//         arcade: {
//             debug: false // Set to true if you want to see debug information
//         }
//     },
//     mySocket:{socket}

// };

// const StartGame = (parent) => {

//     return new Phaser.Game({ ...config, parent });

// }

// export default StartGame;
import Phaser from 'phaser';
import { Boot } from './scenes/Boot';
import { Preloader } from './scenes/Preloader';
import { WorkStation } from './scenes/WorkStation';

const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', () => {
  console.log('Connected to WebSocket server');
});

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 800,
  parent: 'game-container',
  backgroundColor: '#028af8',
  scene: [
    Boot,
    Preloader,
    WorkStation
  ],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  },
};

// Start Game function
const StartGame = (parent) => {
  // Pass the socket to each scene using a custom property or an init method
  const game = new Phaser.Game({ ...config, parent });
  game.socket = socket; // Make the socket available to all scenes as `this.game.socket`
//   game.uid=
  
  return game;
};

export default StartGame;
