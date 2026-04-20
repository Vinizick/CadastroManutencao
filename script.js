const SUPABASE_URL = "https://klyzgqrpefuqbwcxdueu.supabase.co";
const SUPABASE_KEY = "sb_publishable_1aihTLC8jKL83lxJr-vRVg_SA9piZER";

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

async function cadastrar() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!nome || !email || !senha) {
        document.getElementById("msg").innerText = "Preencha todos os campos!";
        return;
    }

    const { error } = await client
        .schema("seguranca")
        .from("tbUsuarios")
        .insert([{ nome, login: email, senha }]);

    if (!error) {
        document.getElementById("msg").innerHTML =
            "<span class='sucesso'>Cadastro realizado com sucesso!</span>";

        localStorage.setItem("prime
