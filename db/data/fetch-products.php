<?php
require($_SERVER['DOCUMENT_ROOT'] . '/db/connection.php');

use Database\Connection;

$conn = new Connection();
$conn = $conn->getConnection();

try {
    $query = "SELECT * FROM products";
    $result = $conn->query($query);

    if ($result === false) {
        echo json_encode(['success' => false, 'message' => "Query failed: " . $conn->error]);
    }

    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    $result->close();

    echo json_encode(['success' => true, 'products' => $products]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => "Query failed: " . $e]);
}
