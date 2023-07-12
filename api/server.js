const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const router = require("#router/router.js");
const { errHandler } = require("./middlewares.js");

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan("combined"));
server.use("/api", router);
server.use(errHandler);

module.exports = server;
