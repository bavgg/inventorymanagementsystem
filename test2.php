<?php
require(__DIR__ . "/db/config.database.php");

use Database\Database;

$db = new Database();
$connection = $db->getConnection();

$query = "SELECT * FROM Users";
$result = $connection->query($query);

$users = []; // Initialize an empty array to store user data

while ($row = $result->fetch_assoc()) {
    $users[] = $row; // Add each fetched row to the array
}

// Log users to the error log
error_log(print_r($users, true));
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User List</title>
    <style>
        /* Add your CSS styles here */
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 20px;
        }
        h1 {
            color: #333;
        }
        #userList {
            margin-top: 20px;
        }
        .user-item {
            background-color: #fff;
            border: 1px solid #ddd;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <h1>Users</h1>
    <div id="userList"></div>
    <script type="module" src="">
        function showUsers(users) {
            const userList = document.getElementById('userList');
            users.forEach(user => {
                const userItem = document.createElement('div');
                userItem.classList.add('user-item');
                userItem.textContent = `Username: ${user.username}`;
                userList.appendChild(userItem);
            });
        }

        document.addEventListener('DOMContentLoaded', (event) => {
            const users = <?php echo json_encode($users); ?>;
            showUsers(users);
        });
    </script>
</body>
</html>
