async function cadastrar() {
    if (matchPasswd() && matchEmail() && strongPass()) {
        var email = document.getElementById('email').value;
        var senha = document.getElementById('senha').value;

        var formData = new FormData(); // Cria o FormData usado para enviar dados
        formData.append('dadosCifrados', JSON.stringify({ // Adiciona o campo 'dadosCifrados' ao formData
            email: email,
            senha: encryptPassword(senha) // Coloca o hash na senha
        }));

        var promisse = await fetch("../php/cadastro.php", {
            method: "POST",
            body: formData
        });

        var resposta = await promisse.text(); // Lê a resposta do servidor como texto
        var mensagem = JSON.parse(resposta); // Converte o texto da resposta JSON

        if (mensagem === "true") {
            window.location.href = "login.html";
        } else {
            alert(mensagem);
        }
    }
}

function matchPasswd() {
    var senha1 = document.getElementById('senha').value;
    var senha2 = document.getElementById('senha-rep').value;

    if (senha1 != senha2) {
        document.getElementById('senha2-msg').innerHTML = "As senhas não coincidem!<br>";
        return false;
    } else {
        document.getElementById('senha2-msg').innerHTML = "";
        return true;
    }
}

function matchEmail() {
    var formato = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    if (document.getElementById('email').value.match(formato)) {
        document.getElementById('email-msg').innerHTML = "";
        return true;
    } else {
        document.getElementById('email-msg').innerHTML = "Endereço de email inválido!<br>";
        return false;
    }
}

function strongPass() {
    var senha1 = document.getElementById('senha').value;

    if (senha1.length >= 8 && /[a-z]/.test(senha1) && /[A-Z]/.test(senha1) && /[0-9]/.test(senha1) && /[!@#$%^&*]/.test(senha1)) {
        document.getElementById('senha1-msg').innerHTML = "";
        return true;
    } else {
        document.getElementById('senha1-msg').innerHTML = "A senha é fraca. No mínimo 8 caracteres com letras maiúsculas, minúsculas, números e caracteres especiais.<br>";
        return false;
    }
}

// Usa a biblioteca CryptoJS para fazer o hash (SHA-256) da senha
function encryptPassword(password) {
    return CryptoJS.SHA256(password).toString();
}
