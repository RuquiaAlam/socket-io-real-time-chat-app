import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";
import Chat from "./Chat";
const socket = io.connect("http://localhost:3001", {
  withCredentials: true,
});
function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
useEffect(() => {
  socket.on("connect", () => {
    console.log("Connected with id:", socket.id);
    // Emit or listen here after connection
  });



 
}, []);
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <input
            type="text"
            placeholder="John..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="number"
            placeholder="room..."
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join a room</button>
        </div>
      ) : (
        <Chat socket={socket} room={room} username={username} />
      )}
    </div>
  );
}

export default App;
