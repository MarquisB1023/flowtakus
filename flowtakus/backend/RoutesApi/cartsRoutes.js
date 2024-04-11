const express = require("express");

const cartsRouter = express.Router();
const client = require("../server/seed");

cartsRouter.get(async (req, res, next) => {
  try {
    res.send(await client.fetchCarts());
  } catch {
    error;
  }
  {
    next(error);
  }
});

cartsRouter.post("/api/carts", async (req, res, next) => {
  try {
    res.send(await client.createCarts(req.body));
  } catch {
    error;
  }
  {
    next(error);
  }
});

cartsRouter.get("/api/carts", async (req, res, next) => {
  try {
    res.send(await client.fetchCarts());
  } catch {
    error;
  }
  {
    next(error);
  }
});

cartsRouter.get("/carts/:id/", async (req, res, next) => {
  try {
    res.send(await client.fetchCarts(req.params.id));
  } catch {
    error;
  }
  {
    next(error);
  }
});

module.exports = cartsRouter;
