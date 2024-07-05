<?php
require __DIR__ . '/vendor/autoload.php'; // Adjust the path as needed

use \Firebase\JWT\JWT;

// // Your secret key
$key = "your_secret_key";

// // Example data payload
$payload = array(
    "user_id" => 123456,
    "username" => "john_doe"
);

// // Encode the payload into a JWT
$jwt = JWT::encode($payload, $key, 'HS256');
echo "Encoded JWT: " . $jwt . "\n";

// // Decode and verify the JWT
// try {
//     $decoded = JWT::decode($jwt, $key, array('HS256'));
//     print_r($decoded);
// } catch (Exception $e) {
//     echo 'Error: ' . $e->getMessage();
// }
?>
