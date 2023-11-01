import { Request, Response } from "express";
import { sign } from "../verification/verification";
import { LoginBody } from "../models/request.model";
import { User } from "../dbModel/mongoose.model";
import bcrypt from "bcrypt";


export const login = (req: Request<any, any, LoginBody>, res: Response) => {
  const { username, password } = req.body;
  if (!password || !username) {
    res.status(404).json({ message: "no" });
  }

  User.findOne({ username: username }).then(async (e) => {
    if (!e) {
      res.status(404).json({ message: "username errato" });
    } else {
      /*  if ( ) {
        
        }  */
      bcrypt.compare(password, e.password!).then((e) => {
        if (e) {
          const token = sign(username);
          res.setHeader("authorization", token).status(200).end();
        } else {
          res.status(404).json({ message: "password errata" });
        }
      });
    }
  });
};
