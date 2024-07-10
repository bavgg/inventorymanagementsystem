<?php
require($_SERVER['DOCUMENT_ROOT'] . '/db/connection.php');

use Database\Connection;

$conn = new Connection();
$conn = $conn->getConnection();
$user = file_get_contents('php://input');
$user = json_decode($user, true);
$user_id = $user['user_id'];

try {
    $query = "DELETE FROM Users WHERE user_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $user_id);

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
