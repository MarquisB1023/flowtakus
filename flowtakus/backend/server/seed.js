const pg = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { query } = require("express");
const { v4: uuidv4 } = require('uuid');
const client = new pg.Client(
  process.env.DATABASE_URL || 'postgres://localhost/ecommerce_flowtakus'
);
const JWT = process.env.JWT_SECRET || "preptime";

const UUID = "uuid";
const dropTables = async () => {
  const SQL = `
  DROP TABLE IF EXISTS products CASCADE;
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS carts;
  DROP TABLE IF EXISTS orderItems;
  `;

  await client.query(SQL);
};

const createTables = async () => {
  const SQL = `
    CREATE TABLE products(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        price VARCHAR(255) NOT NULL
        );
       
        CREATE TABLE users(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL
            );
        
           CREATE TABLE carts(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES users(id),
            product_id UUID REFERENCES products(id),
            CONSTRAINT unique_product_user UNIQUE (user_id,product_id)
            );
    
          
    `;
  await client.query(SQL);
};
const seedUsers = async () => {

    
  const SQL = ` 
INSERT INTO  users (name, password,email) VALUES ('Frank',$1,'email'),
 ('jake',$2,'email'),
 ('gill',$3,'email'),
 ('Michael',$4,'email'),
 ('Len',$5,'email'),
 ('Gary',$6,'email'),
 ('Sue',$7,'email'),
 ('Charlie',$8,'email')

 RETURNING * 
 ;
`;


  const result = await client.query(SQL, [
    await bcrypt.hash("password", 5),
    await bcrypt.hash("password", 5),
    await bcrypt.hash("password", 5),
    await bcrypt.hash("password", 5),
    await bcrypt.hash("password", 5),
    await bcrypt.hash("password", 5),
    await bcrypt.hash("password", 5),
    await bcrypt.hash("password", 5),
  ]);
  return result.rows;
};

const seedProducts = async () => {
  const SQL = ` 
 
  INSERT INTO products (name,price) VALUES('Bleach GRimmjows','120'),
  ('Akatsuki Design','210'),
  ('JJK Gojo','110'),
  ('My hero  Acedemia Deku','123'),
  ('DBZ Trunks','230'),
  ('Attack On Titans Female Titan','130'),
  ('Hunter x Hunter Gon','95'),
  ('Baki','130')
  RETURNING *
  ;

  `;

  
  const result = await client.query(SQL);
  return result.rows;
};

const seedCarts = async (users, products) => {
  const queryParams = [
    users[0].id,
    products[0].id,
    users[0].id,
    products[1].id,
    users[1].id,
    products[2].id,
  ];
  const SQL = ` 
 
  INSERT INTO carts (user_id,product_id) VALUES ($1,$2),
  ($3,$4),
  ($5,$6);
  
  `;
  await client.query(SQL, queryParams);
};

const seed = async () => {
  const SQL = await dropTables();
  await createTables();
  const seedTestUsers = await seedUsers();
  console.log("seedUsers", seedTestUsers);
  const seedTestProducts = await seedProducts();
  console.log("seedProducts", seedTestProducts);
  await seedCarts(seedTestUsers, seedTestProducts);
};

const authenticateUser = async (username,password) => {
  const SQL = `
    SELECT id, password
    FROM users
    WHERE name = $1
    `;
  const response = await client.query(SQL, [username]);
  userInfo = response.rows;
  if (
    userInfo.length ||
    (await bcrypt.compare(userInfo[0].password, password))
  ) {
    const error = Error("Not Authorized");
    error.status = 401;
    throw error;
  }
  const token = await jwt.sign({ id: response.rows[0].id }, JWT);
  console.log(token, "here");
  return { token: token };
};

const createUser = async (name, password) => {
  const SQL = `
  INSERT INTO  users (name, password) 
  VALUES ($1, $2)
   RETURNING *;
    `;
  const response = await client.query(
    SQL,
    [name, password][await bcrypt.hash("password", 5)]
  );
  return response.rows;
};
const createProducts = async (products_id) => {
  const SQL = `
  INSERT INTO  products (price) 
  VALUES ($1, $2)
   RETURNING *;
    `;
  const response = await client.query(
    SQL,
    [await bcrypt.hash("password", 5)],
    [products_id]
  );
  return response.rows;
};

const fetchUsers = async (user_id) => {
  const SQL = `
    SELECT * from users
    WHERE id =$1
    `;
  const response = await client.query(SQL, [user_id]);
  return response.rows;
};

const fetchProducts = async (products_id) => {
  const SQL = `
    SELECT * from products
    WHERE id =$1
    `;
  const response = await client.query(SQL, [products_id]);

  return response.rows;
};

const fetchCarts = async (user_id, products_id) => {
  const SQL = `
  SELECT *
  FROM order
  WHERE user_id = $1
    `;
  const response = await client.query(SQL, [user_id, products_id]);

  return response.rows;
};

const Carts = async (user_id, product_id) => {
  const SQL = `
    INSERT INTO users_products(id, userId,productId)
    VALUES($1 ,$2, $3)
    `;
  const response = await client.query(SQL, [uuidv4(), user_id, product_id]);
  return response.rows;
};

module.exports = {
  seed,
  client,
  authenticateUser,
  createUser,
  createProducts,
  fetchUsers,
  fetchProducts,
  fetchCarts,
  Carts,
};
