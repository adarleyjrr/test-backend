// Imports
import cors from "cors";
import express from "express";
// import requireAll from 'require-all';
import http from "http";
import bodyParser from "body-parser";
import routes from "./routes";

require("./firebase-admin");
require("dotenv").config();

process.env.BASEPATH = __dirname;

const normalizePort = (val): number => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return 3000;
};

// Initialization function
const init = (listeningCallback, errorCallback): void => {
  try {
    // App Configurations
    const app = express();
    app.use(
      cors({
        origin: /.*/,
        allowedHeaders: ["Authorization", "X-Requested-With", "Content-Type"],
        maxAge: 86400, // NOTICE: 1 day
        credentials: true
      })
    );
    app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));
    app.use(bodyParser.json({ limit: "20mb" }));

    // Initializing all middlewares
    // requireAll({
    //   dirname: __dirname + '/middlewares',
    //   recursive: true,
    //   resolve: Module => new Module(app)
    // });

    // Initializing other libraries

    // Initializing routes
    app.use(routes);

    // Server start
    const server = http.createServer(app);
    server.listen(normalizePort(process.env.PORT));
    server.on("error", errorCallback);
    server.on("listening", listeningCallback);
  } catch (e) {
    errorCallback(e);
  }
};

// Start failure callback
const onError = (error): void => {
  if (error.syscall !== "listen") {
    throw error;
  }
  switch (error.code) {
    case "EACCES":
      console.error("Port requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error("Port is already in use");
      process.exit(1);
    default:
      throw error;
  }
};

// Start successful callback
const onListening = (): void => {
  console.log(
    `Up and running - ${process.env.NODE_ENV} - http://${process.env.HOSTNAME}:${process.env.PORT}`
  );
};

// Initializing API
init(onListening, onError);
