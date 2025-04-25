import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with  ${socket.id} in room ${data}`);
  });
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_data", data);
    console.log(data);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected!", socket.id);
  });
});
server.listen(3001, () => {
  console.log("Server Running!");
});
