<?php
$host = "localhost:3306";
$dbname = "spotmusic";
$user = "root";
$pass = "root";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['arquivo']) && isset($_POST['titulo'])) {
        $titulo = $conn->real_escape_string($_POST['titulo']);
        $arquivo = $_FILES['arquivo'];

        $ext = strtolower(pathinfo($arquivo['name'], PATHINFO_EXTENSION));
        if ($ext !== 'mp3') {
            echo "Formato inválido. Apenas arquivos MP3 são permitidos.";
            exit;
        }

        $pastaUploads = '../uploads/';
        if (!is_dir($pastaUploads)) {
            mkdir($pastaUploads, 0777, true);
        }

        $nomeArquivo = uniqid() . '.mp3';
        $caminho = $pastaUploads . $nomeArquivo;

        if (move_uploaded_file($arquivo['tmp_name'], $caminho)) {
            $stmt = $conn->prepare("INSERT INTO musicas (titulo, arquivo) VALUES (?, ?)");
            $stmt->bind_param("ss", $titulo, $nomeArquivo);
            if ($stmt->execute()) {
                echo "Música enviada com sucesso!";
            } else {
                echo "Erro ao salvar no banco de dados.";
            }
        } else {
            echo "Erro ao mover o arquivo.";
        }
    } else {
        echo "Campos obrigatórios não preenchidos.";
    }
}
?>
