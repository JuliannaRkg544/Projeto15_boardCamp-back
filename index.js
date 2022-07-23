import express,  { json } from "express"
import cors from "cors";
import dotenv from "dotenv";
import categorieRoute from "./src/routes/categoriesRoute.js";

dotenv.config();

const server = express()

server.use(json())
server.use(cors())
server.use(categorieRoute)

server.listen( process.env.PORT ,()=>{
    console.log("servidor no ar ", process.env.PORT)
})