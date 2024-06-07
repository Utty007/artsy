// server.js or custom-server.js (or any filename of your choice)
const { join } = require("path");
const next = require("next");
const isDev = process.env.NODE_ENV !== "production";

const nextjsDistDir = join("src", require("./src/next.config.js").distDir);
const nextjsServer = next({
  dev: isDev,
  conf: {
    distDir: nextjsDistDir,
    images: {
      domains: ["firebasestorage.googleapis.com"],
    },
  },
});

const handle = nextjsServer.getRequestHandler();

nextjsServer.prepare().then(() => {
  const express = require("express");
  const server = express();

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
