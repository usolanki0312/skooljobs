import { useEffect } from "react";
import AppRoutes from "./routes/Approutes";

function App() {

  useEffect(() => {

    const socket = new WebSocket("ws://localhost:8085/ws?userId=teacher-101");
    // Agar backend 8081 par hai to 8085 ki jagah 8081 use karo

    socket.onopen = () => {
      console.log("✅ WebSocket Connected");
      socket.send("Hello from React Client");
    };

    socket.onmessage = (event) => {
      console.log("📩 Message Received:", event.data);
    };

    socket.onerror = (error) => {
      console.error("❌ WebSocket Error:", error);
    };

    socket.onclose = (event) => {
      console.log("🔌 WebSocket Closed", event.code, event.reason);
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };

  }, []);

  return <AppRoutes />;
}

export default App;