<?php

/* -------------------------------------------------------------------------- */
/*                             dbsetup                           */
/* -------------------------------------------------------------------------- */
require(__DIR__ ."/config.database.php");

use Database\Database;
$db = new Database();
$connection = $db->getConnection();

?>

<!-- set connection, get id, query, statement, bind, execute, get result,  encode -->