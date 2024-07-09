<?php
require($_SERVER['DOCUMENT_ROOT'] . '/db/connection.php');

use Database\Connection;

$conn = new Connection();
$conn = $conn->getConnection();

try {
    $id = $_POST['id'];
    $query = "DELETE FROM Users WHERE user_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        $rowsAffected = $stmt->affected_rows;

        if ($rowsAffected > 0) {
            echo json_encode(['success' => true, 'message' => 'Delete successfull.']);
        } else {
            echo json_encode(['success' => true, 'message' => 'No rows were deleted. The user ID may not exist.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Execution failed']);
    }

    $stmt->close();
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error ' . $e->getMessage()]);
}
