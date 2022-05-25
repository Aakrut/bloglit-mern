import express from "express";

import dotenv from "dotenv";
dotenv.config();

//Database Connection
import databaseConnection from "./db/connect.js";

//Middleware
import notFoundMiddleware from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import authenticateUser from "./middlewares/auth.js";

//Routes
import authRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome 😁!");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/blog", authenticateUser, postRoute);

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
