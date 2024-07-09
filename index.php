<?php

session_start();
if (!$_SESSION['username']) {
    header("location: /login");
    exit();
}

require(__DIR__ . "/db/data.php");

use Database\Data;

$data = new Data();
$users = $data->fetchUsers();

echo "<script>const users = " . json_encode($users) . ";</script>";
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sidebar Example</title>
    <link rel="stylesheet" href="./styles.css">

    <style>
        :root {
            --tint: #ace3ec;
            --muted: slategrey;
            --accent: #2ca9bc;
            --bg: #F5F5F5;
            /* #F5F5F5 */

            --bd-radius: 8px;
        }

        body {
            margin: 0;
            padding: 0;
            max-width: unset;
        }

        .sidebar {
            display: flex;
            flex-direction: column;
            gap: 10px;
            height: 100dvh;
            width: fit-content;
            position: sticky;
            background-color: var(--bg);
            padding: 16px;
        }


        .profile {
            margin-bottom: 20px;

        }

        main {
            display: flex;
            gap: 20px;
            margin: auto;
            margin-top: 20px;
        }

        .link {
            display: flex;
            gap: 20px;
            align-items: center;
            /* background-color: var(--tint); */
            padding: 10px;
            border-radius: var(--bd-radius);
        }

        .link:hover {
            background-color: var(--tint);
        }

        .togglebtn {
            width: fit-content;
            z-index: 100;
            font-size: 20px;
            cursor: pointer;
            background-color: var(--accent);
            color: white;
            padding: 10px 15px;
            border: none;
            position: sticky;
            /* top: 16px;
            left: 16px; */
        }

        .togglebtn:hover {
            background-color: #D6F1F5;
        }

        .chevron {
            color: var(--muted);
            margin-left: auto;
            font-weight: 500;
            cursor: pointer;
            /* transform: rotate(90deg); */
        }

        .selected {
            background-color: var(--tint);
        }


        #signout {
            margin-top: auto;
            cursor: pointer;
        }
        #links {
            display: flex;
            flex-direction: column;
            gap: 10px;
            height: 100%;
        }
    </style>

</head>

<body>

    <script type="module" src="index.js">

    </script>
</body>

</html>