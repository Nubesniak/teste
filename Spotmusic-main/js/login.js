async function login() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    var formData = new FormData(); // Cria o FormData usado para enviar dados
    formData.append('dadosLogin', JSON.stringify({ // Adiciona o campo 'dadosLogin' ao formData
        email: email,
        senha: CryptoJS.SHA256(senha).toString() // Coloca o hash na senha
    }));

    var promisse = await fetch("../php/login.php", {
        method: "POST",
        body: formData
    });

    var resposta = await promisse.text(); // Lê a resposta do servidor como texto
    var mensagem = JSON.parse(resposta); // Converte o texto da resposta JSON
    if (mensagem === "true") {
        window.location.href = "usuario.html";
    }
    else {
        alert("Email ou senha incorretos!");
    }
}
