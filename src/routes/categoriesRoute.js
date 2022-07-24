import { creatCategory, listCategories } from "../controllers/categoriesController.js";
import { Router } from "express";
import { categorieValidation } from "../middlewares/categoriesMiddleware.js";

const categorieRouter = Router()

categorieRouter.post("/categories", categorieValidation, creatCategory)
categorieRouter.get("/categories", listCategories)

export default categorieRouter