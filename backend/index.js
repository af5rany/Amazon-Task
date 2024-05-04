const express = require("express");
// const cors = require("cors");

const app = express();
const PORT = 3000;
const productsRoute = require("./src/Routes/productsRoute.js");

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/products", productsRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ error: message });
});

// Server Listen Along with Database
app.listen(PORT, (error) => {
  if (!error) console.log("Server is Running, and listening on port " + PORT);
  else console.log("Error occurred, server can't start", error);
});
