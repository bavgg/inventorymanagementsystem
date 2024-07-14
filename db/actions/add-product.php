<?php
session_start();
require($_SERVER['DOCUMENT_ROOT'] . '/db/connection.php');

use Database\Connection;

$conn = new Connection();
$conn = $conn->getConnection(); 

set_error_handler(function($errno, $errstr, $errfile, $errline) {
    throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
});

try {
    $product = file_get_contents('php://input');
    $product = json_decode($product, true);

    $product_name = $product['product_name'];
    $description = $product['description'];
    $supplier = $product['supplier'];
    $image_url = $product['image_url'];
    $user_id = $_SESSION['user_id'];

    $query = "INSERT INTO products (product_name, description, supplier, image_url, user_id) VALUES (?, ?, ?, ?, ?)" ;
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssssi", $product_name, $description, $supplier, $image_url, $user_id);

    if ($stmt->execute()) {

        echo json_encode(['success' => true, 'message' => 'Product added.']);

    } else {
        echo json_encode(['success' => false, 'message' => 'Execution failed']);
    }

    $stmt->close();
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error ' . $e->getMessage()]);
}
