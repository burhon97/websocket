import WebSocket from "ws";

const wss = new WebSocket.Server({ port: 8080 });

function run() {
  console.log("Server started successfully!");

  wss.on("connection", (ws: WebSocket) => {
    console.log("New client connected");

    ws.on("message", (message: string) => {
      console.log(`Received message: ${message}`);
      wss.clients.forEach((client) => {
        client.send(message);
      });
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
}

run();
