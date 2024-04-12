require('dotenv').config();
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors')

const productsRouter = require('./routes/Products');
const categoriesRouter = require('./routes/Categories');
const brandsRouter = require('./routes/Brands');
const usersRouter = require('./routes/Users');
const authRouter = require('./routes/Auth');
const cartRouter = require('./routes/Cart');
const ordersRouter = require('./routes/Order');

//! MIDDLEWARE
server.use(cors({
    exposedHeaders:['X-Total-Count']
}))
server.use(express.json()); 
server.use('/products', productsRouter.router);
server.use('/categories', categoriesRouter.router)
server.use('/brands', brandsRouter.router)
server.use('/users', usersRouter.router)
server.use('/auth', authRouter.router)
server.use('/cart', cartRouter.router)
server.use('/orders', ordersRouter.router)

main().catch(err=> console.log(err));

/*//! ----------------------------- STRIPE PAYMENT ----------------------------- */
const stripe = require('stripe')(process.env.STRIPE_KEY);

server.post('/create-payment-intent', async (req, res) => {
  const {totalAmount} = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount*100,
    currency: 'inr',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

async function main(){
    await mongoose.connect(process.env.DB_URI);
    console.log('database connected')
}

server.get('/',(req, res)=>{
    res.json({status:'success'})
})


server.listen(process.env.PORT, ()=>{
    console.log('Server Started')
})
