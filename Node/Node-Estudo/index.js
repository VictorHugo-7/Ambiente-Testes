PORT = 3000                         // Porta

const express = require('express')  // Importa o módulo Express.
const app = express()               // Instância do Express. Usar suas funcionalidades
app.use(express.json())             // Middleware. Suporta requisições com JSON.

let filmes = [
    {
        titulo: "Forrest Gump - O Contador de Histórias",
        sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump(Tom Hanks), um rapaz com QI abaixo da média e boas intenções."
    },
    {
        titulo: "Um Sonho de Liberdade",
        sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela"
    }
]


app.get("/filmes", (request, response) => {

    response.json(filmes)
})


app.post("/filmes", (request, response) => {

    const titulo = request.body.titulo
    const sinopse = request.body.sinopse

    const filme = { titulo: titulo, sinopse: sinopse }

    filmes.push(filme)

    response.send("filme cadastrado")
})





app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`))   // Rodar servidor | Função de calback: função que é executada sempre que um evento acontece