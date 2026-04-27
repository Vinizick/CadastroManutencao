const SUPABASE_URL = "https://klyzgqrpefuqbwcxdueu.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtseXpncXJwZWZ1cWJ3Y3hkdWV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5ODE4NTEsImV4cCI6MjA5MDU1Nzg1MX0.G3W3jDVNQ6o5eOMBgCtKS5W_OMyW6ielS-HyzaC3q7M";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function abrirModal() {
    document.getElementById("modal").style.display = "block";

    const botoes = document.getElementById("botoes");
    const primeiroAcesso = localStorage.getItem("primeiroAcesso");

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

        localStorage.setItem("primeiroAcesso", "true");

        setTimeout(() => {
            fecharModal();
        }, 2000);
    } else {
        document.getElementById("msg").innerText = error.message;
    }
}

async function logar() {
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!email || !senha) {
        document.getElementById("msg").innerText = "Preencha todos os campos!";
        return;
    }

    const { data, error } = await client
        .schema("seguranca")
        .from("tbUsuarios")
        .select("*")
        .eq("login", email)
        .eq("senha", senha);

    if (data && data.length > 0) {
        document.getElementById("msg").innerHTML =
            "<span class='sucesso'>Login efetuado com sucesso!</span>";

        setTimeout(() => {
            fecharModal();
        }, 2000);
    } else {
        document.getElementById("msg").innerText = "Dados inválidos";
    }
}
