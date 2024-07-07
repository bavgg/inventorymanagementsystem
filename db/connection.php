<?php
namespace Database;

class Connection
{
    private $conn;

    public function __construct()
    {
        $this->connect();
    }

    private function connect()
    {
        define('DB_HOST', 'localhost');
        define('DB_USER', 'root');
        define('DB_PASS', '');
        define('DB_NAME', 'ims');

        // Create connection
        $this->conn = new \mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

        // Check connection
        if ($this->conn->connect_error) {
            die('Connection failed: ' . $this->conn->connect_error);
        }
        echo '<script>console.log("Connection success");</script>';
    }

    public function getConnection()
    {
        return $this->conn;
    }

    
}