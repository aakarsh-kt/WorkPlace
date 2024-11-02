import { map } from "framer-motion/client";

export default class ConnectionManager {
  constructor() {
    // this.wss = new WebSocket.Server({ noServer: true });
    this.users=[];
  }

  addUser(ws) {
    this.users.push(ws);
  }
  removeUser(ws) {
        this.users.splice(this.users.indexOf(ws), 1);
  }
}