<?php
namespace Database;

class Data
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

    public function fetchUsers()
    {
        try {
            $query = "SELECT * FROM Users";
            $result = $this->conn->query($query);
            
            if (!$result) {
                throw new \mysqli_sql_exception($this->conn->error);
            }

            $users = [];
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }

            $result->close();

            return $users;
        } catch (\mysqli_sql_exception $e) {
            return ['success' => false, 'message' => "Error: " . $e->getMessage()];
        }
    }

    // public function closeConnection()
    // {
    //     if ($this->conn) {
    //         $this->conn->close();
    //         $this->conn = null;
    //     }
    // }
}