import { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
function App() {
  const socket = useMemo(()=> io("http://localhost:3000"), []);

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    socket.emit('message', {message, room});
    setMessage("");
    setRoom("");
  }

  useEffect(()=> {
    socket.on('connect', ()=> {
      setSocketId(socket.id);
      console.log("connected");
    });

    socket.on("welcome", (msg)=> {
      console.log(msg);
    });

    socket.on('receive-msg', (message)=> {
      console.log(message);
    })

    return ()=> {
      socket.disconnect();
    }

  }, []);

  return (
    <>
      <h1>App ID</h1>
      <p>{socketId}</p>
      <form onSubmit={submitHandler}>
        <input type="text" value={message} onChange={(e)=> setMessage(e.target.value)} placeholder="your message"></input>
        <input type="text" value={room} onChange={(e)=> setRoom(e.target.value)} placeholder="enter room id"></input>
        <button type="submit">Send</button>
      </form>
    </>
  )
}

export default App
