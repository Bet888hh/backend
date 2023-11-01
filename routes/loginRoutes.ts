import { Router } from "express";
import { login } from "../services/loginService";

class LoginRoute {
  router: Router = Router();

  constructor() {
    this.config();
  }
  config(): void {
    this.router.route("/")
                          .post(login);
  }
}

const loginRoute = new LoginRoute();
export default loginRoute.router;
