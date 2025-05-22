<?php
    $dados = json_decode($_POST['dadosCifrados'], true); // Decodifica os dados JSON recebidos em um array
    $email = $dados['email'];
    $senha = $dados['senha'];

    $conn = mysqli_connect("localhost:3306", "root", "root", "spotmusic");
    if (!$conn) {
        echo json_encode("Erro ao conectar: " . mysqli_connect_error());
        exit;
    }

    $stmt = mysqli_prepare($conn, "SELECT 1 FROM usuarios WHERE email = ?");
    mysqli_stmt_bind_param($stmt, "s", $email); // O 's' indica que é uma string
    mysqli_stmt_execute($stmt); // Executa
    mysqli_stmt_store_result($stmt); // Armazena o resultado
    
    if (mysqli_stmt_num_rows($stmt) > 0) { // Verifica se o e-mail já existe
        echo json_encode("Email já cadastrado!");
    }
    else {
        $stmt = mysqli_prepare($conn, "INSERT INTO usuarios (email, senha) VALUES(?, ?)");
        mysqli_stmt_bind_param($stmt, "ss", $email, $senha);
        
        if (mysqli_stmt_execute($stmt)) {
            echo json_encode("true");
        } else {
            echo json_encode("Erro ao cadastrar: " . mysqli_error($conn));
        }
    }

    mysqli_close($conn);
?>
