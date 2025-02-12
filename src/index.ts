import express, { Express } from "express";
import cors from "cors";
import http from "http";
import { WebSocket } from "ws";

(async () => {
  const app: Express = express();
  const port = 3000;

  app.use(cors());
  app.options("*", cors());

  app.use(express.json());

  // Error handler
  app.use((err: any, req: any, res: any, next: any) => {
    console.log(err);
    res.status(500).json({ error: err.message });
  });

  const WSS = new WebSocket.Server({ noServer: true });
  const server = http.createServer(app);

  // Websocket Server
  server.on("upgrade", async (request, socket, head) => {
    const token = request.url?.split("?token=").at(-1);

    if (!token) {
      socket.destroy();
      return;
    }

    WSS.handleUpgrade(request, socket, head, (ws) => {
      WSS.emit("connection", ws, request);
    });
  });

  server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
})();
