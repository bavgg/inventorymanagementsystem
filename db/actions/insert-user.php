<?php
session_start();
require($_SERVER['DOCUMENT_ROOT'] . '/db/connection.php');

use Database\Connection;

$conn = new Connection();
$conn = $conn->getConnection();
// -------------------------------------------------------------------------- //
//                                 user input                                 //
// -------------------------------------------------------------------------- //
$username = $_POST['username'];
$password_hash = password_hash($_POST['password'], PASSWORD_DEFAULT);

// -------------------------------------------------------------------------- //
//                              sql - create user                             //
// -------------------------------------------------------------------------- //
$query = "INSERT INTO Users (username, password_hash) VALUES (?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("ss", $username, $password_hash);

// -------------------------------------------------------------------------- //
//                                 set session                                //
// -------------------------------------------------------------------------- //
if ($stmt->execute()) {
    $last_id = $conn->insert_id;

    $_SESSION['username'] = $username;
    $_SESSION['user_id'] = $last_id;

    header("Location: /");
} else {
    header("Location: /signup?error=$error");
}

$stmt->close();
