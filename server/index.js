import express from "express";

import { position, normal } from "./bunny.js";

const app = express();
const port = 4000;

app.get("/api", async (_, res) => {
  const timeout = 1000 + 1000 * Math.random();

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });

  res.set("Access-Control-Allow-Origin", "*");

  res.send({
    position,
    normal,
  });
});

app.listen(port);
