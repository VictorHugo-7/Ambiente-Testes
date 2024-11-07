/* 
Back-End
	- O back-end é a parte de uma aplicação que roda no servidor, "por trás das cenas". Tecnologia que roda dentro de um servidor
	- Ele é responsável pelo processamento dos dados, regras de negócios e pela lógica da aplicação.
	- Esse código geralmente não é visível para o usuário final, pois é processado em um servidor antes de enviar os dados ou a resposta para o front-end (parte visível da aplicação).


Servidor
	- Um servidor é um computador (geralmente com alta capacidade de processamento) que roda e mantém as aplicações de back-end, garantindo que elas fiquem acessíveis para os usuários via internet.
	- Ele lida com as requisições dos usuários e responde com os dados ou ações apropriadas.
	- Em aplicações web, o servidor processa as requisições feitas pelo navegador, realiza operações necessárias e devolve uma resposta.


Node.js
	- É uma tecnologia que permite rodar código JavaScript no back-end. 
	- Originalmente, o JavaScript era executado apenas no navegador (front-end), mas o Node.js expandiu esse uso para o servidor.
	- Ele é um ambiente de execução (runtime) para JavaScript, o que significa que ele traduz e executa o código JavaScript diretamente no servidor.
	- Com o Node.js, é possível desenvolver APIs, acessar banco de dados, manipular arquivos, entre outras tarefas típicas de desenvolvimento back-end.

	- É uma tecologia que faz o servidor, computador entender javascript 
	- Com isso eu consigo fazer códigos no servidor que roda javascript


NPM 
	Explicação
		- (Node Package Manager)
		- O NPM é um gerenciador de pacotes para o Node.js. 
		- Ele facilita a instalação, atualização e remoção de bibliotecas e dependências para projetos JavaScript que usam Node.js.
	
	Comandos
		npm init                           --> inicia um novo projeto em Node.js e cria o arquivo package.json, que armazena as configurações e dependências do projeto.
		npm init -y                        --> cria o projeto automaticamente, sem pedir as configurações.
		npm install <nome_da_biblioteca>   --> instala uma biblioteca. Por exemplo, npm install express instala o Express.
		npm i <nome_da_biblioteca>
		node index.js                      --> Roda o servidor diretamente. 
	.										   Você pode substituir "index.js" pelo nome do arquivo, por exemplo: node {nome_do_arquivo}. 
	.										   URL: http://localhost:3000/{nome_da_rota}
		npm start                          --> Roda o servidor, se você tiver um script "start" definido no package.json, como "start": "node index.js".
		nodemon index.js                   --> Nota: Para cada mudança no código, você precisa parar o servidor (CTRL+C) e rodá-lo novamente. 
	.										   Dica: Instale `nodemon` com `npm install -g nodemon` para que o ervidor reinicie automaticamente ao detectar mudanças. 
	.										   Use `nodemon index.js` em vez de `node index.js`.
	. npm i express = npm install express
	. "type": "module", --> usar no package.json para poder usar a sintaxe: import express from "express"


Arquivos
	package.json        --> armazena as informações e configurações do projeto, incluindo versões e dependências.
	package-lock.json   --> mantém a versão exata das bibliotecas instaladas para garantir a integridade do projeto.
	node_modules        --> pasta onde ficam armazenadas as bibliotecas instaladas pelo NPM. 
*/


/*
Rota                --> caminhos ou URLs que o cliente pode acessar para interagir com o servidor
função de calback   --> função que é executada sempre que um evento acontece

request (req): receber dados de uma requisição
    Objeto que contém informações sobre a requisição feita pelo cliente, como dados enviados pelo navegador.

    request.body      --> usado para acessar dados enviados no corpo da requisição (normalmente em métodos como POST e PUT). Para acessá-lo, é necessário um middleware como express.json().
    request.params    --> contém parâmetros de rota, que são definidos diretamente na URL. Exemplo: para a rota "/usuario/:id", o valor de id pode ser acessado por request.params.id.
    request.query     --> armazena parâmetros de consulta, enviados na URL depois do ?, como em "/usuario?nome=Joao". Nesse caso, você acessa request.query.nome.
    request.headers   --> contém os cabeçalhos da requisição HTTP, podendo ser usados para autenticação, definir o tipo de conteúdo esperado, etc.


response (res): enviar dados para uma requisição 
    Objeto que é usado para construir e enviar uma resposta ao cliente, podendo incluir status, cabeçalhos e dados. 

    response.send()       --> envia uma resposta ao cliente com texto ou JSON.
    response.json()       --> responde com um objeto JSON ao cliente.
    response.status()     --> define o código de status HTTP da resposta (como 200 para sucesso, 404 para não encontrado, 500 para erro no servidor, etc.).
    response.redirect()   --> redireciona o cliente para outra URL.


Métodos HTTP
    GET...: Recupera dados de um servidor | Buscar informações de um usuário.
    POST..: Enviar dados ao servidor      | Enviar um formulário de cadastro.
    PUT...: Atualizar dados no servidor   | Atualizar informações de um usuário.
    DELETE: Deletar dados no servidor     | Deletar informações de um usuário.

Operação de manipulação de dados
    PUSH: Adicionar dados em algo
*/



// Passagem de parâmetros na rota | http://localhost:3000/ola/victor/19
app.get("/ola/:nome/:idade", (req, res) =>{

    // Cuidado: função send só pode usar uma vez. Aqui eu deixei 3 send só para exemplo 
    res.send(req.params)         // Mostra os dois parâmetros nome e idade | {"nome":"victor","idade":"19"}
    res.send(req.params.nome)    // Mostra o parâmetro nome                | victor
    res.send(req.params.idade)   // Mostra o parâmetro idade               | 19
})

// Mandar arquivo
app.get("/", (request, response) => {
    res.sendFile(__dirname + "/html/index.html")
})


// Armazena parâmetros de consulta | http://localhost:3000/login?usuario=victor&senha=123
app.get("/login", (req, res) =>{
    res.send(req.query)           // {"usuario":"victor","senha":"123"}
    res.send(req.query.usuario)   // victor
    res.send(req.query.senha)     // 123
})

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
