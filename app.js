/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const rateLimit = require('express-rate-limit');

const mongoSanitize = require('express-mongo-sanitize');

const cookieParser = require('cookie-parser');

const path = require('path');

const hpp = require('hpp');

const xss = require('xss-clean');

const helmet = require('helmet');

const morgan = require('morgan');

// const { title } = require('process');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//Set Security HTTP headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],

      scriptSrc: [
        "'self'",
        'https://api.mapbox.com',
        'https://cdnjs.cloudflare.com',
        'https://js.stripe.com', // allow Stripe
      ],

      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        'https://api.mapbox.com',
        'https://fonts.googleapis.com',
      ],

      connectSrc: [
        "'self'",
        'https://api.mapbox.com',
        'https://events.mapbox.com',
        'https://tiles.mapbox.com',
        'https://js.stripe.com', // Stripe requests
        'ws://127.0.0.1:*', // Parcel websocket
      ],

      imgSrc: [
        "'self'",
        'data:',
        'blob:',
        'https://api.mapbox.com',
        'https://tiles.mapbox.com',
        'https://*.stripe.com', // Stripe images
      ],

      frameSrc: [
        "'self'",
        'https://js.stripe.com', // Stripe checkout iframe
      ],

      workerSrc: ["'self'", 'blob:'],

      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
    },
  }),
);

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  window: 60 * 60 * 1000,
  message: 'Too many requests form this IP, Please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, basically reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against Nosql query injection
app.use(mongoSanitize());

// Data sanitization against xss
app.use(xss());

// Prevent parameter Pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

// 3) ROUTES

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
