import express from "express"
import connectDatabase from "./database/db.js"
import routes from "./routes.js"

const app = express()

app.use(express.json())
app.use(routes)




// Tentar fazer a coneção
connectDatabase()       

    // Se der bom: Conexão deu certo                            
    .then(() => {
        app.listen(3000, () => console.log("Servidor rodando e banco de dados conectado"))
    })

    // Se der ruim: Conexão deu errado
    .catch((error) => console.log(error))                 

