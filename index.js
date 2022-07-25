import express,  { json } from "express"
import cors from "cors";
import dotenv from "dotenv";
import categorieRouter from "./src/routes/categoriesRoute.js";
import gameRouter from "./src/routes/gamesRoute.js";
import clientRouter from "./src/routes/clientRoute.js";
import rentRouter from "./src/routes/rentRoute.js";


dotenv.config();

const server = express()

server.use(json())
server.use(cors())
server.use(categorieRouter)
server.use(gameRouter)
server.use(clientRouter)
server.use(rentRouter)

server.listen( process.env.PORT ,()=>{
    console.log("servidor no ar ", process.env.PORT)
})