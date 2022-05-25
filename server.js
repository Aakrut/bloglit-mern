import express from "express";

import dotenv from "dotenv";
dotenv.config();

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//Database Connection
import databaseConnection from "./db/connect.js";

//Middleware
import notFoundMiddleware from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import authenticateUser from "./middlewares/auth.js";

//Routes
import authRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// app.get("/", (req, res) => {
//   res.send("Welcome 😁!");
// });

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/blog", authenticateUser, postRoute);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

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
