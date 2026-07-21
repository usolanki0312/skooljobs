import { useEffect, useState } from "react";

const WebSocketTest = () => {
  const [status, setStatus] = useState("Disconnected");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8085/ws");

    socket.onopen = () => {
      console.log("Connected");
      setStatus("Connected");
    };

    socket.onmessage = (event) => {
      console.log("Received:", event.data);

      setMessages((prev) => [...prev, event.data]);
    };

    socket.onclose = () => {
      console.log("Disconnected");
      setStatus("Disconnected");
    };

    socket.onerror = (error) => {
      console.error(error);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>WebSocket Test</h2>

      <h3>Status: {status}</h3>

      <h3>Messages</h3>

      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketTest;