import db from "../../db.js";

export async function addClient(req, res, next){
  const client = req.body 
  //ir no banquinho procurar pelo cpf
  try {
    const existentCpf = await db.query("SELECT FROM customers WHERE cpf = $1", [client.cpf])
    if (existentCpf.rows.length>0){
        console.log("cpf ja cadastrado")
        return res.status(409).send("cpf already in")
    }
    await db.query("INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4) ",
    [client.name, client.phone, client.cpf, client.birthday] )
    res.sendStatus(201)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }

}

export async function listClient(req, res){
   try {
    const clientList = await db.query("SELECT * FROM customers")
    res.status(200).send(clientList.rows)
   } catch (error) {
    console.log(error)
    return res.sendStatus(500)
   }
}

export async function listClientById (req, res){
    const id = req.params.id
    
    try {
        const clientById = await db.query(`SELECT * FROM customers WHERE id=$1`,[id])
        if(clientById.rows.length==0){
            console.log("client not found")
            return res.sendStatus(404)
        }
        res.status(200).send(clientById.rows)
        
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export async function updateClient(req, res){
    try {
        //inserir cliente no db pelo id
        const id = req.body.id
        const client = req.body

        const existentCpf = await db.query("SELECT FROM customers WHERE cpf = $1", [client.cpf])
    if (existentCpf.rows.length>0){
        console.log("cpf ja cadastrado")
        return res.status(409).send("cpf already in")
    }
        const updatedClient = await db.query("UPDATE customers SET (name=$2 phone=$3 cpf=$4 birthday=$5) WHERE id=$1", 
        [id, client.name, client.phone, client.cpf, client.birthday ] )
        res.send(201).status(updatedClient.rows)

    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}