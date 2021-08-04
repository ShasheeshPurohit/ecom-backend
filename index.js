const express = require('express');
const bodyParser = require('body-parser')
const cors = require("cors")
const app = express();

app.use(express.json())
app.use(cors())

const user = require("./routes/user.router")
const products = require("./routes/product.router")
const cart = require('./routes/cart.router')
const wishlist = require('./routes/wishlist.router')

const { initializeDBConnection } = require("./db/db.connect.js")

const PORT = 5000;

initializeDBConnection();

app.use("/api/users", user)
app.use("/api/products", products);
app.use("/api/cart", cart);
app.use("/api/wishlist", wishlist );

app.get('/', (request, response) => {
  response.json({ hello: "world"})
});


app.use((req, res) => {
  res.status(404).json({ success: false, message: "route not found on server, please check"})
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "error occured, see the errMessage key for more details", errorMessage: err.message})
})

app.listen(process.env.PORT || PORT, () => {
  console.log('server started on port: ', PORT);
});
