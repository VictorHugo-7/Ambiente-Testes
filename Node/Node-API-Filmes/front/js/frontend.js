const baseURL = "http://localhost:3000"
const filmesEndpoint = "/filmes"
const usuarioEndpoint = "/signup"

async function obterFilmes() {
    const URLCompleta = baseURL + filmesEndpoint
    const filmes = (await axios.get(URLCompleta)).data

    let tabela = document.querySelector('.filmes')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]

    for (let filme of filmes) {
        let linha = corpoTabela.insertRow(0)
        let celulaTitulo = linha.insertCell(0)
        let celulaSinopse = linha.insertCell(1)
        celulaTitulo.innerHTML = filme.titulo
        celulaSinopse.innerHTML = filme.sinopse
    }
}


async function cadastrarFilme() {
    const URLCompleta = baseURL + filmesEndpoint
    let tituloInput = document.querySelector('#tituloInput')
    let sinopseInput = document.querySelector('#sinopseInput')
    let titulo = tituloInput.value
    let sinopse = sinopseInput.value

    if (titulo && sinopse) {
        tituloInput.value = ""
        sinopseInput.value = ""
        const filmes = (await axios.post(URLCompleta, { titulo, sinopse })).data
        let tabela = document.querySelector('.filmes')
        let corpoTabela = tabela.getElementsByTagName('tbody')[0]
        corpoTabela.innerHTML = ""
        for (let filme of filmes) {
            let linha = corpoTabela.insertRow(0)
            let celulaTitulo = linha.insertCell(0)
            let celulaSinopse = linha.insertCell(1)
            celulaTitulo.innerHTML = filme.titulo
            celulaSinopse.innerHTML = filme.sinopse
        }
        exibirAlerta('.alert-filme', 'Filme cadastrado com sucesso', ['show', 'alert-success'], ['d-none'], 2000)
    } else {
        exibirAlerta('.alert-filme', 'Preencha todos os campos', ['show', 'alert-danger'], ['d-none', 'alert-success'])
    }
}


async function cadastrarUsuario() {
    let usuarioCadastroInput = document.querySelector("#usuarioCadastroInput")   // Guardando a posição
    let passwordCadastroInput = document.querySelector("#passwordCadastroInput") // Guardando a posição

    let usuarioCadastro = usuarioCadastroInput.value;
    let passwordCadastro = passwordCadastroInput.value;

    if (usuarioCadastro && passwordCadastro) {

        try {
            const URLCompleta = baseURL + usuarioEndpoint;

            await axios.post(URLCompleta, { login: usuarioCadastro, password: passwordCadastro }) // Fazer requisição POST para o Backend

            usuarioCadastroInput.value = ""    // Adicionar um conteúdo vazio
            passwordCadastroInput.value = ""   // Adicionar um conteúdo vazio

            exibirAlerta('.alert-modal-cadastro', "Usuário cadastrado com sucesso!", ['show', 'alert-success'], ['d-none', 'alert-danger'])

        }
        catch (error) {
            exibirAlerta('.alert-modal-cadastro', "Erro ao cadastrar usuário", ['show', 'alert-danger'], ['d-none', 'alert-success'])
        }



    } else {
        exibirAlerta('.alert-modal-cadastro', 'Preencha todos os campos', ['show', 'alert-danger'], ['d-none', 'alert-success'])
    }


}


function exibirAlerta(seletor, innerHTML, classesToAdd, classesToRemove) {
    let alert = document.querySelector(seletor)
    alert.innerHTML = innerHTML

    alert.classList.add(...classesToAdd)
    alert.classList.remove(...classesToRemove)

    setTimeout(() => {
        alert.classList.remove('show')
        alert.classList.add('d-none')
    }, 3000)
}


const fazerLogin = async () => {
    let usuarioLoginInput = document.querySelector('#usuarioLoginInput')
    let passwordLoginInput = document.querySelector('#passwordLoginInput')

    let usuarioLogin = usuarioLoginInput.value
    let passwordLogin = passwordLoginInput.value

    // Se as variáveis usuarioLogin e passwordLogin não estiverm vazias, entra no if
    if (usuarioLogin && passwordLogin) {

        try {
            const URLCompleta = baseURL + "/login"
            const response = await axios.post(URLCompleta, { login: usuarioLogin, password: passwordLogin })

            usuarioLoginInput.value = ""
            passwordLoginInput.value = ""

            exibirAlerta('.alert-modal-login', 'Login Efetuado com Sucesso!', ['show', 'alert-success'], ['d-none', 'alert-danger'])

            const cadastrarFilmeButton = document.querySelector('#cadastrarFilmeButton')
            cadastrarFilmeButton.disabled = false

        } catch (error) {

        }

    }

    // Se pelo menos uma das variáveis estiverem vazias 
    else {
        exibirAlerta('.alert-modal-login', 'Preencha todos os campos', ['show', 'alert-danger'], ['d-none', 'alert-success'])
    }
}


