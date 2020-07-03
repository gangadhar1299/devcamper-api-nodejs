const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error');
const bootcampsRouter = require("./routes/bootcamps");
const coursesRouter = require('./routes/courses');

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

const app = express();

//Body parser
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));

//Mount routers
app.use('/api/v1/bootcamps', bootcampsRouter);
app.use('/api/v1/courses', coursesRouter);

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