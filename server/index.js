require('dotenv').config();
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const productsRouter = require('./routes/Products');
const categoriesRouter = require('./routes/Categories');
const brandsRouter = require('./routes/Brands');
const usersRouter = require('./routes/Users');
const authRouter = require('./routes/Auth');
const cartRouter = require('./routes/Cart');
const ordersRouter = require('./routes/Order');

// Serve static files
server.use(express.static(path.join(__dirname, 'build')));

// MIDDLEWARE
server.use(
  cors({
    exposedHeaders: ['X-Total-Count']
  })
);
server.use(express.json());

// API routes
server.use('/products', productsRouter.router);
server.use('/categories', categoriesRouter.router);
server.use('/brands', brandsRouter.router);
server.use('/users', usersRouter.router);
server.use('/auth', authRouter.router);
server.use('/cart', cartRouter.router);
server.use('/orders', ordersRouter.router);

// Catch-all route for client-side routing
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URI);
  console.log('database connected');
}

server.listen(process.env.PORT, () => {
  console.log('Server Started');
});
