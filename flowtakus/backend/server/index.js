require("dotenv").config();
const express = require("express");
const app = express();
const apiRouter = require("../RoutesApi");
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(require("morgan")("dev"));
app.use(express.static(path.join(__dirname, "images")));
app.use("/api", apiRouter);
const initFunctions = require("./seed.js");

app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(err.status || 500)
    .send({ error: err.message ? err.message : err });
});

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await findUserByToken(req.headers.authorization);
    next();
  } catch (ex) {
    next(ex);
  }
};

app.get("/api/auth/me", isLoggedIn, (req, res, next) => {
  try {
    res.send(req.user);
  } catch (ex) {
    next(ex);
  }
});

console.log(initFunctions);

const init = async () => {
  await initFunctions.client.connect();
  await initFunctions.seed();

  const port = process.env.PORT || 4000;

  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
