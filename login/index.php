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
    <main>
        <div style="display: flex; justify-content: center; margin-top: 50px;">
            <div style="display: flex; flex-direction: column;">

                <h1>Inventory Management System</h1>
                <div>
                    <h3 style='color: red;'><?php echo $error ?></h3>
                    <h3 style='color: green;'><?php echo $message ?></h3>


                </div>
                <form method="post" action="action.php">
                    <label for="email">Username:</label>
                    <input type="text" id="username" name="username" required>
                    
                    <br>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                    <br>
                    <input type="submit" value="Login">
                </form>
        </div>
    </main>
</body>