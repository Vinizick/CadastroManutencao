const SUPABASE_URL = "https://db.klyzgqrpefuqbwcxdueu.supabase.co";
const SUPABASE_KEY = "BvfZii2eOsCvnIWY";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let primeiroAcesso = localStorage.getItem("primeiroAcesso");

function abrirModal() {
    document.getElementById("modal").style.display = "block";

    const botoes = document.getElementById("botoes");

    if (!primeiroAcesso) {
        document.getElementById("tituloForm").innerText = "Primeiro Acesso - Cadastro";

        botoes.innerHTML = `
            <button onclick="cadastrar()">Cadastrar</button>
        `;
    } else {
        document.getElementById("tituloForm").innerText = "Acesso";

        botoes.innerHTML = `
            <button onclick="logar()">Entrar</button>
            <button onclick="cadastrar()">Cadastrar</button>
        `;
    }
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

// CADASTRO
async function cadastrar() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const { error } = await client
        .from("seguranca.tbUsuarios")
        .insert([{ nome, login: email, senha }]);

    if (!error) {
        document.getElementById("msg").innerHTML =
            "<span class='sucesso'>Cadastro realizado com sucesso!</span>";

        localStorage.setItem("primeiroAcesso", "true");

        setTimeout(() => fecharModal(), 2000);
    } else {
        document.getElementById("msg").innerText = error.message;
    }
}

// LOGIN
async function logar() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const { data } = await client
        .from("seguranca.tbUsuarios")
        .select("*")
        .eq("login", email)
        .eq("senha", senha);

    if (data && data.length > 0) {
        document.getElementById("msg").innerHTML =
            "<span class='sucesso'>Login efetuado com sucesso!</span>";

        setTimeout(() => fecharModal(), 2000);
    } else {
        document.getElementById("msg").innerText = "Dados inválidos";
    }
}
