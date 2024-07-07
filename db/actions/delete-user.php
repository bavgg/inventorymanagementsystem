<?php
require($_SERVER['DOCUMENT_ROOT'] . '/db/connection.php');

use Database\Connection;
$conn = new Connection();
$conn = $conn->getConnection();

try {
    $id = 1;
    $query = "DELETE FROM Users WHERE user_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    
    $affected_rows = $stmt->affected_rows;
    
    if ($affected_rows > 0) {
        echo json_encode(['success' => true, 'message' => `Successfully deleted $affected_rows row(s).`]);
    } else {
        echo json_encode(['success' => true, 'message' => "No rows were deleted."]);
    }

    $stmt->close();
} catch (mysqli_sql_exception $e) {
    $error = $e->getMessage();
    echo json_encode(['success' => false, 'message' => `"Error: " . $error`]);
}
?>

<!-- set connection, get id, query, statement, bind, execute, get affected_rows, encode -->