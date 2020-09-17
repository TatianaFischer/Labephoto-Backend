import dotenv from "dotenv";
import { AddressInfo } from "net";
import express from "express";
import userRouter from "./routes/userRouter";
import imageRouter from "./routes/imageRouter";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.use("/users", userRouter);
app.use("/images", imageRouter);

const server = app.listen(3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Failed to run the server`);
  }
});
