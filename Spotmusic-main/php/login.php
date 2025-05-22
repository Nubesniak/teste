<?php
    $dados = json_decode($_POST['dadosLogin'], true); // Decodifica os dados JSON recebidos em um array
    $email = $dados['email'];
    $senha = $dados['senha'];

    $conn = mysqli_connect("localhost:3306", "root", "root", "spotmusic");
    if (!$conn) {
        echo json_encode("Erro ao conectar: " . mysqli_connect_error());
        exit;
    }

    $stmt = mysqli_prepare($conn, "SELECT * FROM usuarios WHERE email = ? AND senha = ?");
    mysqli_stmt_bind_param($stmt, "ss", $email, $senha); // Os dois 's' indica que é uma string
    mysqli_stmt_execute($stmt); // Executa
    mysqli_stmt_store_result($stmt); // Armazena o resultado
    
    if (mysqli_stmt_num_rows($stmt) > 0) { // Se email e senha forem válidos para um usuário no banco
        $_SESSION['usuario_email'] = $email;
        $_SESSION['autenticado'] = true;
        echo json_encode("true");
    }
    else {
        echo json_encode("false");
    }

    mysqli_close($conn);
?>
