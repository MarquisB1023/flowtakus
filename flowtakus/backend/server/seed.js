const pg = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { query } = require("express");
const { v4: uuidv4 } = require("uuid");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/ecommerce_flowtakus"
);
const JWT = process.env.JWT_SECRET || "preptime";

const UUID = "uuid";
const dropTables = async () => {
  const SQL = `
  DROP TABLE IF EXISTS products CASCADE;
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS carts;
  Drop TABLE IF EXISTS productImages;
  DROP TABLE IF EXISTS quantiy;
  `;

  await client.query(SQL);
};

const createTables = async () => {
  const SQL = `
    CREATE TABLE products(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        price VARCHAR(255) NOT NULL,
        artist VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL
        );
       
        CREATE TABLE users(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL
            );
        
           CREATE TABLE carts(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES users(id),
            product_id UUID REFERENCES products(id),
            CONSTRAINT unique_product_user UNIQUE (user_id,product_id)
            );

            CREATE TABLE productImages(
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name VARCHAR(255) NOT NULL,
                product_id UUID REFERENCES products(id)
                );
          
    `;
  await client.query(SQL);
};
const seedUsers = async () => {
  const SQL = ` 
INSERT INTO  users (name, password,email) VALUES ('Frank',$1,'wnfiw@email'),
 ('jake',$2,'ninwf@email'),
 ('gill',$3,'tonnoe@email'),
 ('Michael',$4,'fownf@email'),
 ('Len',$5,'cwck@email'),
 ('Gary',$6,'lwcl@email'),
 ('Sue',$7,'knwkn@email'),
 ('Charlie',$8,'infiw@email')

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
  INSERT INTO products (name, price, artist, description) VALUES
  ('Bleach Grimmjows', '120', 'GriddyMave', 'Lowtop custom design for Bleach fans of Grimjow with a variety of sizes to choose from. Comfortable soles and great with other otaku outfits.'),
  ('Akatsuki Design', '210', 'AlexTheGreat', 'Hightop custom design from Narutos Akatsuki. Customized from Nikes hightop shoes.'),
  ('Gojo', '110', 'MadHatter', 'Low top Nike shoe design of JuJutsu Kaisens Gojo styled by MadHatter. Comfortable fit for walking, or running and goes well with other outfits.'),
  ('Deku', '123', 'LotusFlare', 'Hightop custom design from My Hero Academias character Deku.'),
  ('Trunks', '230', 'CrimsonKicks', 'DBZ Trunks designed in the lowtop Nike custom from the artist CrimsonKicks.'),
  ('Mikasa', '130', 'Dylan Mitchell', 'Attack on Titan Mikasa artwork custom made into a well-fitting lowtop Nike.'),
  ('Gon', '95', 'Stacy Manes', 'Hightop custom design from Hunter x Hunters Gon created by the talented Stacy Manes.'),
  ('Baki', '130', 'Craig Maves', 'Lowtop work of Yujiro Hanma from Baki designed by artist Craig Maves.')
RETURNING *;
  `;

  const result = await client.query(SQL);
  return result.rows;
};

const seedProductImages = async (products) => {
  const queryParams = [
    products[0].id,
    "grimmjow.jpeg",
    products[1].id,
    "Akatsuki.webp",
    products[2].id,
    "Gojo.jpeg",
    products[3].id,
    "Deku.jpeg",
    products[4].id,
    "Trunks.jpeg",
    products[5].id,
    "mikasa.jpeg",
    products[6].id,
    "Gon.jpeg",
    products[7].id,
    "Baki_yujiro.jpg",
  ];
  const SQL = `
    INSERT INTO productImages (product_id,name) VALUES
    ($1,$2 ),
  ($3,$4),
  ($5,$6),
  ($7,$8),
  ($9,$10),
  ($11,$12),
  ($13,$14),
  ($15,$16)
  RETURNING *
   `;
  await client.query(SQL, queryParams);
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
  await seedProductImages(seedTestProducts);
};

const authenticateUser = async (username, password) => {
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
const fetchProducts = async () => {
  const SQL = `
      SELECT * from products;
      
      `;
  const response = await client.query(SQL);

  return response.rows;
};
const fetchProductsById = async (product_id) => {
  const SQL = `
    SELECT * FROM products
    WHERE id =$1
    `;
  const response = await client.query(SQL, [product_id]);

  return response.rows[0];
};

const fetchCarts = async (user_id, product_id) => {
  const SQL = `
  SELECT * 
  FROM carts
  WHERE user_id = $1 AND product_id = $2;
    `;
  const response = await client.query(SQL, [user_id, product_id]);

  return response.rows;
};

const createCarts = async ({ user_id, product_id }) => {
  const id = uuidv4();
  const SQL = `
  INSERT INTO carts 
  (id, user_id, product_id)
  VALUES ($1, $2, $3)
  RETURNING *;
      `;
  const response = await client.query(SQL, [id, user_id, product_id]);

  return response.rows[0];
};

const deleteCarts = async (user_id, product_id) => {
  const SQL = `
  DELETE 
  FROM carts
  WHERE user_id = $1 AND product_id = $2;
      `;
  const response = await client.query(SQL, [user_id, product_id]);

  return response.rows;
};

// const fetchProductsImages = async (product_id) => {
//   const SQL = `
//     SELECT * from productImages
//     where id =$1
//     `;
//   const response = await client.query(SQL, [product_id]);
//   return response.rows;
// };

const fetchProductsImagesById = async (product_id) => {
  const SQL = `
      SELECT * FROM productImages
      where product_id =$1
      `;
  const response = await client.query(SQL, [product_id]);
  return response.rows;
};

const fetchAllProductsImages = async () => {
  const SQL = `
   SELECT * FROM productImages;
   `;

  const response = await client.query(SQL);
  return response.rows;
};
const Carts = async (user_id, product_id) => {
  const SQL = `
    INSERT INTO users_products(id, user_id,product_id)
    VALUES($1 ,$2, $3)
    `;
  const response = await client.query(SQL, [uuidv4(), user_id, product_id]);
  return response.rows;
};

module.exports = {
  seed,
  client,
  //   fetchProductsImages,
  fetchAllProductsImages,
  authenticateUser,
  createUser,
  createProducts,
  createCarts,
  deleteCarts,
  fetchUsers,
  fetchProducts,
  fetchProductsById,
  fetchProductsImagesById,
  fetchCarts,
  Carts,
};
