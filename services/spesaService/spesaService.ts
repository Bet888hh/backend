import { NextFunction, Request, Response } from "express";
import { AddspesaRequest } from "../../models/request.model";
import mongoose from "mongoose";
import { Spesa} from "../../dbModel/mongoose.model";

export async function addSpesa(
  req: Request<{}, {}, AddspesaRequest>,
  res: Response
) {
  const spesa = await Spesa.create({
    ...req.body,
  });
  res.end()
}

export function checkSpesa(
  req: Request<{}, {}, AddspesaRequest>,
  res: Response,
  next: NextFunction
) {
    console.log(req.body)
  req.body.importo != null && req.body.importo != undefined
    ? next()
    : res.status(404).end();
}
