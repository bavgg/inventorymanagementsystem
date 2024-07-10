<?php
session_start();
require($_SERVER['DOCUMENT_ROOT'] . '/db/connection.php');

use Database\Connection;

$conn = new Connection();
$conn = $conn->getConnection();

$user = file_get_contents('php://input');

$user = json_decode($user, true);


$email = $user['email'];
$first_name = $user['first_name'];
$last_name = $user['last_name'];
$password_hash = password_hash($user['password'], PASSWORD_DEFAULT);


try {
    $query = "INSERT INTO users (email, first_name, last_name, password_hash) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssss", $email, $first_name, $last_name, $password_hash);
    if ($stmt->execute()) {
        $last_id = $conn->insert_id;

        $_SESSION['email'] = $email;
        $_SESSION['user_id'] = $last_id;
        echo json_encode(['success' => true, 'message' => 'Registration successful']);

    } else {
        echo json_encode(['success' => false, 'message' => 'Execution failed']);
    }

    $stmt->close();
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error ' . $e->getMessage()]);
}
