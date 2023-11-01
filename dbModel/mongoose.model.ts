
import mongoose from "mongoose";

const {Schema} = mongoose;

export enum categorieSpese{
    ALIMENTARI,
    CARBURANTE,
    IMPOSTE_E_TASSE
 };
/* export const blogSchema = new Schema({
    title: String, // String is shorthand for {type: String}
    author: String,
    body: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs: Number
    }
  });
 */
 const SpesaSchema = new Schema({
   importo: Number,
   data:{ type: Date, default: Date.now } ,
   descrizione:String,
   categoria:String
 });
 export const Spesa = mongoose.model("Spesa", SpesaSchema);

 const userSchema = new Schema({
  username: String,
  email: {type:String,required:true},
  password: String,
  nome: String,
  cognome: String,

});
export const User = mongoose.model("User", userSchema);