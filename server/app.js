import express from "express";
import routes from "./routes/index.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import model from "./models/index.js";

// intialize Express framework
const app = express();

mongoose.connect("mongodb://localhost:27017/taskTracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// allowing cross origin to let access the BE
app.use(cors());
app.use(express.json());
// accepting the repsonse in JSON format
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// initializing all the routes
routes(app);

export default app;
