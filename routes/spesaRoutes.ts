import { Router } from "express";
import { addSpesa, checkSpesa } from "../services/spesaService/spesaService";

class SpesaRoute {
  router: Router = Router();

  constructor() {
    this.config();
  }
  config(): void {
    this.router.post("/add",checkSpesa,addSpesa);
    /*this.router.get("/:id", gamesController.getOne)
        this.router.post("/",gamesController.create)
        this.router.delete('/:id',gamesController.delete)
    this.router.put('/:id',gamesController.update) */
  }
}

const spesaRoute = new SpesaRoute();
export default spesaRoute.router;
