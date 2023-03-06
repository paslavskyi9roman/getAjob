const express = require('express');
const app = express();

const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const errorMiddleware = require('./middleware/error');
const ErrorHandler = require('./middleware/error');

dotenv.config({ path: './config/config.env' });

process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});

connectDatabase();

app.use(express.json());

const jobs = require('./routes/jobs.routes');

app.use('/api/v1', jobs);

app.all('*', (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} route not found, 404`));
});

app.use(errorMiddleware);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`server running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
