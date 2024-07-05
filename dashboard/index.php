<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sidebar Example</title>
    <link rel="stylesheet" href="../styles.css">

    <style>
        :root {
            --tint: #ace3ec;
            --muted: slategrey;
            --accent: #0F2B2E;
            --bg: #E5E6AC;
            /* #F5F5F5 */

            --bd-radius: 8px;
        }
        body {
            margin: 0;
            padding: 0;
        }
        .sidebar {
            display: flex;
            flex-direction: column;
            gap: 10px;
            height: 100%;
            width: fit-content;
            position: fixed;
            background-color: var(--bg);
            padding: 16px;
        }
        .sidebar a {
            padding: 8px 32px 8px 16px;
            text-decoration: none;
            color: var(--muted);
            display: block;
            transition: 0.3s;
        }
        .sidebar a:hover {
            color: var(--accent);
        }
        .profile {
            margin-bottom: 20px;

        }

        #main {
 
        }


        .da{
            display: flex;
            gap: 5px;
            align-items: center;
            /* background-color: var(--tint); */
            padding: 10px;
            border-radius: var(--bd-radius);
        }
        .da:hover {
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
        .da svg {
            cursor: pointer;
        }
        .da {
            cursor: pointer;
        }
        #signout {
            margin-top: auto;
            cursor: pointer;
        }
    </style>
    <style id="myStyles">

    </style>
</head>

<body>


    <script type="module" src="/dashboard/index.js">

    </script>
</body>

</html>