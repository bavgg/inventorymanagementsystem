<?php
session_start();
require($_SERVER['DOCUMENT_ROOT'] . '/db/connection.php');

use Database\Connection;

$conn = new Connection();
$conn = $conn->getConnection();

$user = file_get_contents('php://input');

$user = json_decode($user, true);

$username = $user['username'];
$password_hash = password_hash($user['password'], PASSWORD_DEFAULT);

try {
    $query = "INSERT INTO Users (username, password_hash) VALUES (?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ss", $username, $password_hash);
    if ($stmt->execute()) {
        $last_id = $conn->insert_id;

        $_SESSION['username'] = $username;
        $_SESSION['user_id'] = $last_id;
        echo json_encode(['success' => true, 'message' => 'Registration successful']);

    } else {
        echo json_encode(['success' => false, 'message' => 'Execution failed']);
    }

    $stmt->close();
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error ' . $e->getMessage()]);
}
