const express = require("express");

const productsRouter = express.Router();
const client = require("../server/seed");
const { fetchProductsById } = require("../server/seed");

productsRouter.get(async (req, res, next) => {
  try {
    res.send(await client.fetchProducts());
  } catch (error) {
    next(error);
  }
});

productsRouter.post("/", async (req, res, next) => {
  try {
    res.send(await client.createProducts(req.body));
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const productImages = await client.fetchAllProductsImages();
    const products = await client.fetchProducts();

    for (const product of products) {
      const imageNames = productImages
        .filter((image) => image.product_id === product.id)
        .map((image) => image.name);
      product.images = imageNames;
    }

    res.send(products);
  } catch (error) {
    next(error);
  }
});



productsRouter.get("/:id", async (req, res, next) => {
  try {
    console.log("endpoint breached");
    const productImages = await client.fetchProductsImagesById(req.params.id);
    console.log("finding images", productImages);
    const product = await client.fetchProductsById(req.params.id);

    const imageNames = productImages
      .filter((image) => image.product_id === product.id)
      .map((image) => image.name);
    product.images = imageNames;

    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
