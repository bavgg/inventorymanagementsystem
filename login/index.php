<?php

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $message =  isset($_GET['message']) ? $_GET['message'] : null;
    $error = isset($_GET['error']) ? $_GET['error'] : null;
}


?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My PHP Page</title>
    <link rel="stylesheet" href="./styles.css"> <!-- Adjust the path as per your directory structure -->
</head>

<body>
    <h1>Inventory Management System</h1>
    <form method="post" action="/db/actions/login.php">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>

        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br>
        <button type="submit">Login</button>
    </form>
</body>