<?php
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        require '../../../database.php';
        if(!$conn){
            die("Connection Error");
        }

        $request = file_get_contents("php://input");
        $request = json_decode($request);
        $empid = $request->empid;

        $query = "DELETE FROM employees WHERE Employee_ID = $empid";
        if($conn->query($query)){
            echo "success";
        }
        else{
            echo "error";
        }
        $conn->close();
    }
?>