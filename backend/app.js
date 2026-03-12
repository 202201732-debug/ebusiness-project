const express = require("express");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Mobile Store API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});