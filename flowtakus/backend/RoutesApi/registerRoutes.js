const jwt = require("jsonwebtoken");
const JWT = process.env.JWT_SECRET || "preptime";
if (JWT === "preptime") {
  console.log("jwt functional");
}
const express = require("express");

const registerRouter = express.Router();

const bcrypt = require("bcrypt");
const { createUser } = require("../server/user.js");

registerRouter.post("/", async (req, res, next) => {
  try {
    console.log("register");

    const user = await createUser({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(user);
    const token = jwt.sign({ id: user.id }, JWT);
    res.send({ token });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = registerRouter;
