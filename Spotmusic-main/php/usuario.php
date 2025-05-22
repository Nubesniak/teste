<?php
$host = "localhost:3306";
$dbname = "spotmusic";
$user = "root";
$pass = "root";

header('Content-Type: application/json');

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["erro" => "Erro de conexão: " . $conn->connect_error]);
    exit;
}

$sql = "SELECT titulo, arquivo FROM musicas ORDER BY id DESC";
$result = $conn->query($sql);

$musicas = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $musicas[] = $row;
    }
}

echo json_encode($musicas);
$conn->close();
?>
