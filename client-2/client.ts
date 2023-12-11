import WebSocket from "ws";
import { v4 as uuidV4 } from "uuid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname);

function createId() {
  let wsId;
  const wsIdDir = `${rootDir}/wsId`;

  if (fs.existsSync(wsIdDir)) {
    wsId = fs.readFileSync(wsIdDir, { encoding: "utf-8" });
  } else {
    const uuid = uuidV4();
    fs.writeFileSync(wsIdDir, uuid);
    wsId = fs.readFileSync(wsIdDir, { encoding: "utf-8" });
  }

  return wsId;
}

const ws = new WebSocket("ws://localhost:8080");
const wsId = createId();

ws.on("open", () => {
  console.log("Connected to server");

  process.stdin.on("data", (data) => {
    const msg = {
      id: wsId,
      message: data.toString(),
    };
    ws.send(`${JSON.stringify(msg)} \n`);
  });
});

ws.on("message", (message: string) => {
  const msg = JSON.parse(message);
  if (msg.id !== wsId) {
    console.log(`Message from Client 1: ${msg.message}`);
  }
});

ws.on("close", () => {
  console.log("Disconnected from server");
});
