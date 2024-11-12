PORT = 3000
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')



const app = express()
app.use(express.json())
app.use(cors())


/* Conexão com o Banco */
async function conectarAoMongoDB() {
    await mongoose.connect(`mongodb+srv://cururu995:1234@cluster0.vlxky.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
}



/* Schema Filme */
const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: { type: String },
    sinopse: { type: String }
}))



/* Schema Usuário */
const usuarioSchema = mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})
usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuario", usuarioSchema)



app.get("/filmes", async (req, res) => {
    const filmes = await Filme.find()
    res.json(filmes)
})



app.post("/filmes", async (req, res) => {
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse

    const filme = new Filme({ titulo: titulo, sinopse: sinopse })

    await filme.save()                  // salva no banco de dados
    const filmes = await Filme.find()   // Retorna todos os registros existentes na coleção

    res.json(filmes)
})


// Endpoint que cadastra usuários na base
app.post('/signup', async (req, res) => {
    try {
        const login = req.body.login
        const password = req.body.password

        const criptografada = await bcrypt.hash(password, 10)

        const usuario = new Usuario({
            login: login,
            password: criptografada
        })

        const respMongo = await usuario.save()

        console.log(respMongo)

        res.status(201).end()

    } catch (error) {
        console.log(error)
        res.status(409).end()
    }
});


// Endpoint que autentica usuários na base
app.post('/login', async (req, res) => {

    const login = req.body.login
    const password = req.body.password

    const u = await Usuario.findOne({ login: req.body.login })
    if (!u) {
        return res.status(401).json({ mensagem: "login inválido" })
    }

    const senhaValida = await bcrypt.compare(password, u.password)
    if (!senhaValida) {
        return res.status(401).json({ mensagem: "senha inválida" })
    }

    const token = jwt.sign(
        { login: login },
        "chave-secreta",
        { expiresIn: "1h" }
    )
    res.status(200).json({ token: token })
})




// Rodar servidor | Função de calback: função que é executada sempre que um evento acontece
app.listen(PORT, () => {
    try {
        conectarAoMongoDB()
        console.log("up and running")
    }
    catch (e) {
        console.log('Erro', e)
    }
})

