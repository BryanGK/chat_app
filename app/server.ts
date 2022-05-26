import express from "express";
import next from "next";
import http from "http";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST;
const port: number = (process.env.PORT as unknown as number) || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.all("*", async (req, res) => handle(req, res));

  http
    .createServer(server)
    .listen(port, () => {
      console.log(`> Server ready on http://localhost:${port}`);
    })
    .on("error", (err) => {
      console.log(err);
    });
});
