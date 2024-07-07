<?php
require($_SERVER['DOCUMENT_ROOT'] . '/db/connection.php');

use Database\Connection;

$conn = new Connection();
$conn = $conn->getConnection();

session_start();

// -------------------------------------------------------------------------- //
//                                 user input                                 //
// -------------------------------------------------------------------------- //
$username = $_POST['username'];
$password = $_POST['password'];

// -------------------------------------------------------------------------- //
//                              sql - read users                              //
// -------------------------------------------------------------------------- //
$query = "SELECT * FROM Users WHERE username = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

// -------------------------------------------------------------------------- //
//                           verify user & password                           //
// -------------------------------------------------------------------------- //
if ($user && password_verify($password, $user['password_hash'])) {

    $_SESSION['username'] = $user['username'];
    $_SESSION['user_id'] = $user['id'];
    header("Location: /");
    exit;
} else {
    header("Location: /login?message=Invalid email or password");
}

// // -------------------------------------------------------------------------- //
// //                                 close stmt                                 //
// // -------------------------------------------------------------------------- //
// $stmt->close();
