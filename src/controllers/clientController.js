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