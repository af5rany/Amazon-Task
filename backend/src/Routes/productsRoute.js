const express = require("express");
const {
  getAllArticles,
  getProductByKeyword,
} = require("../Controllers/articlesController");

const routers = express.Router();

/////////////get methods////////////
// routers.get("/", getAllArticles);
routers.get("/", getProductByKeyword);

routers.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    status: statusCode,
    message: err?.message || "internal server error",
    errors: err?.errors || [],
  });
});

module.exports = routers;
