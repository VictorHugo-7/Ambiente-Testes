/* 
Rota: caminhos ou URLs que o cliente pode acessar para interagir com o servidor
função de calback: função que é executada sempre que um evento acontece

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

Operação de manipulação de dasos
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



app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000")
}) // Rodar servidor. http://localhost:3000/


