import messagesManagerDB from "../dao/mongo/msgManager.js";
import { Router } from "express";
import { Server as HTTPServer } from "http";
import { Server as SocketIO } from "socket.io";// inicio socket
import express from "express"; 

const appPm = express();
 const httpServer = HTTPServer(appPm);
 const socketio = new SocketIO(httpServer);

//middleware socket
 appPm.use((req, res, next) => {
   req.io = socketio;
   next();
 });


const msgRouter = Router();

msgRouter.get("/", (req, res) => {
  res.render("messages");
  req.emit("sendMessage");
});



socketio.on("connection", async (socket) => {
  let getMsg = await messagesManagerDB.getMessages();
  socket.emit("", getMsg);

  socket.on("createMessage", async (message) => {
    await messagesManagerDB.createMessage(message);
    console.log(message);
    let getMsg = await messagesManagerDB.getMessages();
    socket.emit("sendAllMessages", getMsg);
  });

  socket.on("deleteMessages", async (message) => {
    await messagesManagerDB.deleteAllMessages(message);
    console.log(message);
    let getMsg = await messagesManagerDB.getMessages();
    socket.emit("sendAllMessages", getMsg);
  });
});

msgRouter.post("/chat", (req, res) => {
  res.render("messages");
  req.broadcast.emit("sendAllMessages");
});

// const socketEnRouter = new SocketServer(appPm)
export default msgRouter;
// fin socket