const path = require('path');
const dotenv = require("dotenv");
const express = require("express");
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const expressMongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const expressRateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error');
const bootcampsRouter = require("./routes/bootcamps");
const coursesRouter = require('./routes/courses');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const reviewsRouter = require('./routes/reviews');

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

const app = express();


//Body parser
app.use(express.json());


// Cookie parser
app.use(cookieParser());


//Dev logging middleware
if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));


// File uploading
app.use(fileUpload());


// Sanitize express mongo
app.use(expressMongoSanitize());


// Security headers using helmet
app.use(helmet());


// Prevent XSS using xss-clean
app.use(xssClean());


// Manage rate limit
const rateLimiter = expressRateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
});

app.use(rateLimiter);


// Prevent HTTP prama pollution
app.use(hpp());


// Enable cors
app.use(cors());


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount routers
app.use('/api/v1/bootcamps', bootcampsRouter);
app.use('/api/v1/courses', coursesRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/reviews', reviewsRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 6000;

const server = app.listen(PORT, () =>
    console.log(
        `Server started and running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
);


//Handle unhandled promise rejections
process.on('unhandledRejection', (error, promise) => {
    console.log(`Error: ${error.message}`.red.bold);
    server.close(() => process.exit(1));
});