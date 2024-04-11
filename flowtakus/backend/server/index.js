require("dotenv").config();
const express = require("express");
const app = express();


app.use(require("cors")());
app.use(express.json());
app.use(require("morgan")("dev"));
app.use("/RoutesaApi", require("../RoutesApi/index.js"));

app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(err.status || 500)
    .send({ error: err.message ? err.message : err });
});

const isLoggedIn = async(req, res, next)=> {
    try {
      req.user = await findUserByToken(req.headers.authorization);
      next();
    }
    catch(ex){
      next(ex);
    }
  };
  
  
  app.post('/api/auth/login', async(req, res, next)=> {
    try {
      res.send(await authenticate(req.body));
    }
    catch(ex){
      next(ex);
    }
  });
  
  app.get('/api/auth/me', isLoggedIn, (req, res, next)=> {
    try {
      res.send(req.user);
    }
    catch(ex){
      next(ex);
    }
  });
  
const initFunctions = require("./seed.js");
console.log(initFunctions);

const init = async () => {
  await initFunctions.client.connect();
  await initFunctions.seed();


  const port = process.env.PORT || 3000;


  app.listen(port, () => console.log(`\nlistening on port ${port}`));
};

init();
