import { NextFunction, Request, Response } from "express";
import { RegisterUserDTO } from "../../models/request.model";
import { User } from "../../dbModel/mongoose.model";
import bcrypt from "bcrypt"

const saltRounds = 10; // Il numero di "giri" per la crittografia (10 è un valore comune)

 async function registerUser(
  req: Request<{}, {}, RegisterUserDTO>,
  res: Response
) {
    User.create({
        ...req.body , password:await  bcrypt.hash(req.body.password,saltRounds)  /* criptata... */
    }).then(()=>{
        res.end()
    })
}

 function checkIfAnotherUserexists(
  req: Request<{}, {}, RegisterUserDTO>,
  res: Response,
  next: NextFunction
) {
  User.exists({$or:[{ email: req.body.email },{username:req.body.username}]}).then((e) => {
    if (!e) {
      next();
    } else {
      res.status(404).json({ message: "utente già presente " });
    }
  });
}

 function checkIfAllFieldAreHere(
  req: Request<{}, {}, RegisterUserDTO>,
  res: Response,
  next: NextFunction
) {
  const user = req.body;
  if (
    !user ||
    !user.username ||
    !user.email ||
    !user.password ||
    !user.nome ||
    !user.cognome
  ) {
    res
      .status(404)
      .json({ message: "Almeno uno dei campi obbligatori è mancante" }); // Almeno uno dei campi obbligatori è mancante
  }
  next();
}

export const checkUserMiddlewares = [
  checkIfAllFieldAreHere,
  checkIfAnotherUserexists,

  registerUser
];
