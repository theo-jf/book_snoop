const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');

const searchRouter = require('./routes/search.router');
const editionsRouter = require('./routes/editions.router');
const addressRouter = require('./routes/address.router') ;
const librariesRouter = require('./routes/libraries.router');
const wishlistsRouter = require('./routes/wishlists.router');
const newAddressRouter = require('./routes/newAddress.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);

app.use('/api/search', searchRouter);
app.use('/api/editions', editionsRouter);
app.use('/api/addresses', addressRouter);
app.use('/api/library', librariesRouter);
app.use('/api/wishlist', wishlistsRouter);
app.use('/api/newaddress', newAddressRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
