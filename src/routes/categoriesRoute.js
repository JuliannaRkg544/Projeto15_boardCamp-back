import { creatCategory, listCategories } from "../controllers/categoriesController.js";
import { Router } from "express";
import { categorieValidation } from "../middlewares/categoriesMiddleware.js";

const categorieRoute = Router()

categorieRoute.post("/categories", categorieValidation, creatCategory)
categorieRoute.get("/categories", listCategories)

export default categorieRoute