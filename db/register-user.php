<?php
session_start();
require($_SERVER['DOCUMENT_ROOT'] . '/db/connection.php');

use Database\Connection;

$conn = new Connection();
$conn = $conn->getConnection();

$username = $_POST['username'];
$password_hash = password_hash($_POST['password'], PASSWORD_DEFAULT);

try {
    $query = "INSERT INTO Ussers (username, password_hash) VALUES (?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ss", $username, $password_hash);
    if ($stmt->execute()) {
        $last_id = $conn->insert_id;

        $_SESSION['username'] = $username;
        $_SESSION['user_id'] = $last_id;

        header("Location: /");
    } else {
        header("Location: /signup?error=$error");
    }

    $stmt->close();
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error ' . $e->getMessage()]);
}
