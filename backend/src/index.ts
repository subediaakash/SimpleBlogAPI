import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { userRouter } from "./routes/user.route";
const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/v1", userRouter);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
