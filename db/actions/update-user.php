<?php
session_start();
require($_SERVER['DOCUMENT_ROOT'] . '/db/connection.php');

use Database\Connection;

$conn = new Connection();
$conn = $conn->getConnection();

set_error_handler(function($errno, $errstr, $errfile, $errline) {
    throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
});

try {
    $user_json = file_get_contents('php://input');
    $user = json_decode($user_json, true);
    
    $user_id = $user['user_id'];
    $email = $user['email'];
    $first_name = $user['firstname'];
    $last_name = $user['lastname'];

    $query = "UPDATE users SET email = ?, first_name = ?, last_name = ? WHERE user_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssss", $email, $first_name, $last_name, $user_id);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'User updated.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Execution failed']);
    }

    $stmt->close();
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error ' . $e->getMessage()]);
}
