const express = require("express")
const app = express()
const PORT = 3000

// Middleware para analisar o corpo das requisições JSON
app.use(express.json());

const usuarios = []

app.get("/usuarios", (req, res) =>{
    res.json(usuarios)
})

app.post("/usuarios", (req, res) =>{
    const {nome, email, senha} = req.body


    usuarios.push({nome, email, senha})

    return res.send("Dados enviados para o servidor")
})


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
}) // Rodar servidor. http://localhost:3000/


