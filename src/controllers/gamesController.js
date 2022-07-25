import db from "../../db.js";

export async function createGame(req, res){
    const game = req.body
    
    try {
        const existentGame = await db.query(`SELECT FROM games WHERE name ILIKE '${game.name}'`)
        if(existentGame.rows.length>0){
            return res.status(409).send("game name already exist")
        }
        const existentId = await db.query(`SELECT FROM categories WHERE id = $1`, [game.categoryId] )
        if(existentId.rows.length==0){
            return res.status(400).send("invalid category id")
        }
        await db.query(`INSERT INTO games (name,image,"stockTotal","categoryId","pricePerDay") VALUES ($1,$2,$3,$4,$5)`,
         [game.name, game.image, game.stockTotal, game.categoryId, game.pricePerDay])
         res.sendStatus(201)
        
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export async function listGame(req, res){
     const {name} = req.query
     
     try {
    if(!name){
        const gameList = await db.query(`SELECT games.*, categories.name as "categoryName" FROM games
        JOIN categories 
        ON games."categoryId" = categories.id`)
        if(gameList.rows.length==0){
            return res.sendStatus(404)
        }
        res.status(200).send(gameList.rows)
     } else{
        const gameListQuery = await db.query(`SELECT * FROM games WHERE name ILIKE '${name}%'`)
        if(gameListQuery.rows.length==0){
            return res.sendStatus(404)
        }
        res.status(200).send(gameListQuery.rows)

     }
       
     } catch (error) {
        console.log(error)
        return res.sendStatus(500)
     }
}