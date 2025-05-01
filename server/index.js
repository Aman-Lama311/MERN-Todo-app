import express from "express";
import dotenv from "dotenv";
import connectDB from "./mongoDB/dataBase.js";
import userRoute from "./routes/userRoute.js";
import bodyParser from "body-parser";
import todoRoute from "./routes/todoRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://mern-todo-app-c4ui.vercel.app/",
    credentials: true,
  })
);

app.use("/users", userRoute);
app.use("/todos", todoRoute);

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
