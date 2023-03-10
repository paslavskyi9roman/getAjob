const express = require('express');
const app = express();

const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const sanitizer = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const connectDatabase = require('./config/database');
const errorMiddleware = require('./middleware/error');
const ErrorHandler = require('./utils/errorHandler');

dotenv.config({ path: './config/config.env' });

process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});

connectDatabase();

app.use(helmet());

app.use(express.json());

app.use(cookieParser());

app.use(fileUpload());

app.use(sanitizer());

app.use(xssClean());

app.use(
  hpp({
    whitelist: ['positions'],
  })
);

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 Mints
  max: 100,
});

app.use(limiter);

app.use(cors());

const jobs = require('./routes/jobs.routes');
const auth = require('./routes/auth.routes');
const user = require('./routes/user.routes');

app.use('/api/v1', jobs);
app.use('/api/v1', auth);
app.use('/api/v1', user);

app.all('*', (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
});

app.use(errorMiddleware);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to Unhandled promise rejection.');
  server.close(() => {
    process.exit(1);
  });
});
