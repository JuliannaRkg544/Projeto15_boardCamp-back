import db from "../../db.js";

export async function creatCategory(req, res){
    const {name} = req.body
    try {
        const existentName  = await db.query(`SELECT FROM categories WHERE name = $1`, [name])
        if (existentName.rows.length!=0) 
        {
            res.status(409).send("Categoy name already exist");
            return
        } 
         await db.query(`INSERT INTO categories (name) VALUES ($1)`, [name])
         res.sendStatus(201)
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
        return
    }

}

export async function listCategories(req, res){
    //acessar banco pegar nomes das categorias
    try {
        const categoriesNames = await db.query(`SELECT * FROM categories`)
        res.status(200).send(categoriesNames.rows)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
        return
    }


}