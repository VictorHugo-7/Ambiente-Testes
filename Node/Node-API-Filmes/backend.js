// mongodb+srv://cururu995:1234@cluster0.vlxky.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// npm install mongoose-unique-validator --legacy-peer-deps
// npm install bcrypt --legacy-peer-deps
// npm install --legacy-peer-deps
// npm install jsonwebtoken --legacy-peer-deps
// npm start

console.log("Hello, NodeJS")

const express = require ('express')
const app = express()
app.use(express.json())

const cors = require ('cors')
app.use(cors())

const mongoose = require('mongoose')
const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: {type:String},
    sinopse: {type:String}
}))

async function conectarAoMongoDB(){
    await mongoose.connect("mongodb+srv://cururu995:1234@cluster0.vlxky.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
}

const uniqueValidator = require("mongoose-unique-validator")
const usuarioSchema = mongoose.Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})
usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuario", usuarioSchema)

app.listen(3000, () => {
    try{
        conectarAoMongoDB()
        console.log("up and running")
    }catch(e){
        console.log("Erro", e)
    }
})


//GET http://localhost:3000/hey
app.get('/hey', (req, res) => {
    res.send('hey')
})



//GET http://localhost:3000/filmes
app.get("/filmes", async (req, res) => {
    const filmes = await Filme.find()
    res.json(filmes)
})


//POST http://localhost:3000/filmes
app.post("/filmes", async (req, res) => {
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    const filme = new Filme({titulo: titulo, sinopse: sinopse})
    await filme.save()
    const filmes = await Filme.find()
    res.json(filmes)
})

const bcrypt = require('bcrypt')


//POST http://localhost:3000/signup
app.post("/signup", async (req, res) => {
    try{
        const login = req.body.login
        const password = req.body.password
        const criptografada = await bcrypt.hash(password,10)
        const usuario = new Usuario({
            login: login,
            password: criptografada
        })
        const respMongo = await usuario.save()
        console.log(respMongo)
        res.status(201).end()
    }catch(error){
        console.log(error)
        res.status(409).end()
    }
})

const jwt = require("jsonwebtoken")


//POST http://localhost:3000/login
app.post('/login', async (req, res) => {
    const login = req.body.login
    const password = req.body.password
    const u = await Usuario.findOne({login: req.body.login})
    if(!u){
        return res.status(401).json({mensagem: "login inválido"})
    }
    const senhaValida = await bcrypt.compare(password, u.password)
    if (!senhaValida){
        return res.status(401).json({mensagem: "senha inválida"})
    }
    const token = jwt.sign(
        {login: login},
        "chave-secreta",
        {expiresIn: "1h"}
    )
    res.status(200).json({token: token})
})








