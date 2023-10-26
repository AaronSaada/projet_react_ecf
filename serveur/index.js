import express from "express"
import mysql from "mysql"
import "dotenv/config"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.json("Hello")
})

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books"
  db.query(q, (err, data) => {
    if(err) return res.status(400).json(err)
    return res.json(data)
  })
})

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `description`, `cover`) VALUES (?)"
  const values = [
    req.body.title,
    req.body.description, 
    req.body.cover
  ]

  db.query(q, [values], (err, data) => {
    if(err) return res.json(err)
    return res.json("Le livre a bien été ajouté")
  })
})

app.listen(4567, () => {
  console.log("Connecté au port 4567")
})