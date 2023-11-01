import { Router } from "express";
import { login } from "../services/loginService";
import { checkUserMiddlewares } from "../services/registerService/registerService";


class UserRoute {
  router: Router = Router();

  constructor() {
    this.config();
  }
  config(): void {
    this.router.post("/register",checkUserMiddlewares);
  }
}

const userRoute = new UserRoute();
export default userRoute.router;
