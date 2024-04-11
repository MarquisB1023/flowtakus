const { client } = require("./index.js");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT_SECRET || "preptime";
if (JWT === "preptime") {
  console.log("jwt functional");
}

async function createCarts({ password }) {
  const SQL = `
    INSERT INTO Carts(id, password) VALUES($1) RETURNING *
  `;
  const response = await client.query(SQL, [
    uuid.v4(),
    await bcrypt.hash(password, 5),
  ]);
  return response.rows[0];
}

async function fetchCarts() {
  const SQL = `
    SELECT id FROM carts;
  `;
  const response = await client.query(SQL);
  return response.rows;
}

async function findCartsWithToken(token) {
  let id;
  try {
    const payload = jwt.verify(token, JWT);
    id = payload.id;
  } catch (ex) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  const SQL = `
    SELECT id FROM carts WHERE id=$1;
  `;
  const response = await client.query(SQL, [id]);
  if (!response.rows.length) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  return response.rows[0];
}

async function authenticate({ id , password }) {
  const SQL = `
    SELECT id, password FROM carts WHERE id=$1;
  `;
  const response = await client.query(SQL, [id]);
  if (
    !response.rows.length ||
    (await bcrypt.compare(password, response.rows[0].password)) === false
  ) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  const token = jwt.sign({ id: response.rows[0].id }, JWT);
  return { token };
}

module.exports = {
  createCarts,
  fetchCarts,
  findCartsWithToken,
  authenticate,
};
