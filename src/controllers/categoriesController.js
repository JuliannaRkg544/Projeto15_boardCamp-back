import db from "../../db.js";

export async function creatCategory(req, res){
    const {name} = req.body
    //verificar se ja existe no banquinho;
    //const categories = await db.query("SELECT * FROM categories") 
    try {
        const existentName  = await db.query(`SELECT FROM categories WHERE name = $1`, [name])
        if (existentName.rows.length!=0) //array de objetos com resultado da consulta
        {
            res.status(409).send("Categoy name already exist");
            return
        } 
         await db.query(`INSERT INTO categories (name) VALUES ($1)`, [name])
         res.sendStatus(201)
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

}

export async function listCategories(){

}