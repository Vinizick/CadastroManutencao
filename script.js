
const SUPABASE_URL = "https//db.klyzgqrpefuqbwcxdueu.supabase.co";
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
        document.getElementById("tituloForm").innerText = "Login / Cadastro";

        botoes.innerHTML = `
            <button onclick="logar()">Login</button>
            <button onclick="cadastrar()">Cadastrar</button>
        `;
    }
}


function fecharModal() {
    document.getElementById("modal").style.display = "none";
}


async function cadastrar() {
    const nome = document.getElementById("nome").value;
    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;

    const { error } = await client
        .from("seguranca.tbUsuarios")
        .insert([{ nome, login, senha }]);

    if (!error) {
        document.getElementById("msg").innerHTML =
            "<span class='sucesso'>Cadastro realizado com sucesso!</span>";

        localStorage.setItem("primeiroAcesso", "true");

        setTimeout(() => {
            fecharModal();
        }, 2000);
    } else {
        document.getElementById("msg").innerText = error.message;
    }
}

// login
async function logar() {
    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;

    const { data } = await client
        .from("seguranca.tbUsuarios")
        .select("*")
        .eq("login", login)
        .eq("senha", senha);

    if (data && data.length > 0) {
        document.getElementById("msg").innerHTML =
            "<span class='sucesso'>Login efetuado com sucesso!</span>";

        setTimeout(() => {
            fecharModal();
        }, 2000);
    } else {
        document.getElementById("msg").innerText = "Login inválido";
    }
}
