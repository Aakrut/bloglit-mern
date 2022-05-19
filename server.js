import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

// cors

//Database Connection
import databaseConnection from './db/connect.js';
// const databaseConnection = require("./db/connect");

//Middleware
import notFoundMiddleware from './middlewares/not-found.js';
import errorHandlerMiddleware from './middlewares/error-handler.js';
import authenticateUser from './middlewares/auth.js';

// const notFoundMiddleware = require("./middlewares/not-found");
// const errorHandlerMiddleware = require("./middlewares/error-handler");
// const authenticateUser = require('./middlewares/auth');

//Routes
import authRoute from './routes/userRoute.js';
import postRoute from './routes/postRoute.js'
// const authRoute = require("./routes/userRoute");
// const PostRoute = require("./routes/postRoute");

const app = express();
app.use(express.json());
// app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome 😁!");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/blog",authenticateUser, postRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await databaseConnection(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is Running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
