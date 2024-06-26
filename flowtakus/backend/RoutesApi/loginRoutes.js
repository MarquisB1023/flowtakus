const express = require("express");
const cors = require("cors");

const loginRouter = express.Router();

const bcrypt = require("bcrypt");
const { authenticate } = require("../server/user.js");

loginRouter.use(cors());

loginRouter.post("/", async function (req, res) {
  try {
    console.log("yep");
    const token = await authenticate({
      email: req.body.email,
      password: req.body.password,
    });

    res.send(token);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

module.exports = loginRouter;
