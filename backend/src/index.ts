import express from "express";
import dotenv from "dotenv";
import connectDB from "./db"; // Note: must end with `.js` for ES modules
import signup from "./controllers/signup";
import router from "./routes";
import cors from "cors";

import type { AuthObject } from "@clerk/express";

declare global {
  namespace Express {
    interface Request {
      auth?: AuthObject;
      email:string
    }
  }
}
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
// app.get("/", (req, res) => {
//   res.json({
//     msg: process.env.PORT,
//   });
// });
// API routes
app.use("/api", router);
app.post("/signup", signup);
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`⚙️ Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed!!!", err);
  });
