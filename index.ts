import express, {
  Application,
  json,
  urlencoded,
} from "express";
import morgan from "morgan";
import cors from "cors";
import spesaRoute from "./routes/spesaRoutes";
import { verifyToken } from "./verification/verification";
import loginRoutes from "./routes/loginRoutes";


import mongoose from "mongoose"
import userRoutes from "./routes/userRoutes";





class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.set("port", 3000);
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use((req, res, next) => {
      if (req.headers['content-type'] !== 'application/json') {
        return res.status(400).json({ error: 'Content-Type non specificato' });
      }
      next(); // Prosegui con la richiesta se il Content-Type è corretto
    });
    this.app.use(json());
    this.app.use(urlencoded({ extended: false }));
    this.app.use(verifyToken);
    mongoose.connect(`mongodb+srv://betto:123123!@cluster0.csnpalo.mongodb.net/`)

  }

  routes(): void {
    this.app.use("/spesa", spesaRoute);
    this.app.use("/login", loginRoutes);
    this.app.use("/user", userRoutes);

  }

  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log(
        "server run in ",
        this.app.get("port") + " ",
        this.app.get("host")
      );
    });
  }
}

const server = new Server();
server.start();

// Rotte



