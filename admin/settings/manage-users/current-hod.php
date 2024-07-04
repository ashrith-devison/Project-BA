<?php
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        require '../../../database.php';
        if(!$conn){
            die("Connection Error");
        }
        $request = file_get_contents("php://input");
        $request = json_decode($request);
        $empid = intval($request->empid);
        $role = $request->role;
        
        $query = "SELECT * FROM login_credentials WHERE role='$role'";
        $result = $conn->query($query);
        $data = $result->fetch_assoc();
        echo $data['username'];
    }
?>