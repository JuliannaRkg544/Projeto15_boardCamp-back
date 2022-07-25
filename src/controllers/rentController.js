import db from "../../db.js";

export async function insertRental(req, res){
    const rentInfo = req.body
    try {
        const verifyCustomerId = await db.query(`SELECT * FROM customers WHERE id =$1 `, [rentInfo.customerId])
        if(verifyCustomerId.rows.length==0){
            return res.status(400).send("custumer Id not found")
        }
        const verifyGameId = await db.query(`SELECT * FROM games WHERE id =$1 `, [rentInfo.gameId])
        if(verifyGameId.rows.length==0){
            return res.status(400).send("game Id not found")
        }
        const verifyStock = await db.query(`SELECT "stockTotal" FROM games WHERE id=$1`, [rentInfo.gameId])
        if(verifyStock.rows[0].stockTotal == 0 ){
            return res.status(400).send("not availble")
        } else {
            const updatedStock = (verifyStock.rows[0].stockTotal)-1
            await db.query(`UPDATE games SET "stockTotal" = $1 WHERE id = $2`, [updatedStock,rentInfo.gameId] )
        }
    
    const pricePerDay = await db.query(`SELECT "pricePerDay" FROM games WHERE id = $1`, [rentInfo.gameId])
    const originalPrice = (pricePerDay.rows[0].pricePerDay)*rentInfo.daysRented  
    console.log("price ", typeof pricePerDay.rows[0].pricePerDay) 
    const rentDate = new Date().toLocaleDateString() 
    await db.query(`INSERT INTO rentals 
    ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") 
    VALUES ($1,$2,$3,$4,$5,$6,$7)`,
    [rentInfo.customerId, rentInfo.gameId, rentDate,rentInfo.daysRented, null ,originalPrice, null ])
    res.sendStatus(201)

} catch (error) {
    console.log(error)
    return res.sendStatus(500)
}
}

export async function finishRental(req, res){
    const rentId= req.params.id
    const returnDate = new Date().toLocaleDateString()

    try {
        const rentedGame = await db.query(`SELECT * FROM rentals WHERE id=$1`, [rentId])
        if (rentedGame.rows.length == 0){
            return res.status(400).send("No game with this id found")
        } 
        const {delayFee} = rentedGame.rows[0]   
        const {daysRented} = rentedGame.rows[0]  
        const rentDate = rentedGame.rows[0].rentDate
        
        
        let rentDay = toString(rentDate)
        console.log(typeof rentDate)
        const returnDay = returnDate.split("-")
        const delayDays = returnDay[0]-rentDay[2]
        if (delayDays>daysRented){ //pegar o pricePerday
            const pricePerDay = await db.query (`SELECT rentals.*,games."pricePerDay" FROM rentals
            JOIN games
            ON rentals."gameId" = games.id WHERE rentals.id=$1`,[rentId]);
            delayFee = (delayDays-daysRented)*pricePerDay
        } 
        await db.query(`UPDATE rentals SET "returnDate"=$1 , "delayFee"=$2 WHERE id=$3`,[returnDate,delayFee,rentId])
    } catch (error) {
        console.log(error)
    return res.sendStatus(500)
    }

}

export async function listRental(req, res){
    const { customerId, gameId } = req.query;

    if(customerId){
        const costumerRentals = await db.query(`SELECT * FROM rentals WHERE id=$1`,[customerId]) 
        if(costumerRentals.rows.length===0){
        return res.status(404).send("client not found")
        }
    }
    else if(gameId){
        const games = await db.query(`SELECT * FROM rentals WHERE "gameId"=$1`,[gameId])
        if(games.rows.length===0){
        return res.status(404).send("game not found")
        }
} else {
    const allRentals = await db.query(`SELECT rentals.*, games.id as "gameId", games.name as "gameName", games."categoryId" as "gameCategoryId", customers.name as "customerName", customers.id as "customerId", categories.id as "categoryId", categories.name as "categoryName" FROM rentals
            JOIN games
            ON rentals."gameId" = games.id
            JOIN customers
            ON rentals."customerId" = customers.id
            JOIN categories
            ON games."categoryId" = categories.id`)
            if(allRentals.rows.length==0){
                res.status(404).send("no rentals information")
                return
            }
            const response = allRentals.rows.map((rentals)=>{
                return(
                 {
                     ...rentals,
                     game: {
                       id: rentals.gameId,
                       name: rentals.gameName,
                       categoryId: rentals.categoryId,
                       categoryName: rentals.categoryName,
                     },
                     customer: {
                         id: rentals.customerId,
                         name: rentals.customerName,
                     }
                 }
                ) 
             })
             res.status(200).send(response)
         }       
}


export async function deleteRental(req, res){
    const deleteId = req.params.id

    try {
     const verifyId = await db.query(`SELECT * FROM rentals WHERE id = $1`, [deleteId])
     if(verifyId.rows.length==0){
        return res.status(400).send("inexistent")
     }
     await db.query(`DELETE FROM rentals WHERE id=$1`,[deleteId])
     res.sendStatus(200)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
    
}