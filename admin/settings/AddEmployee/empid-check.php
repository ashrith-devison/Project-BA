<?php
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        require '../../../database.php';
        if(!$conn){
            die("Connection Error");
        }
        $request = file_get_contents("php://input");
        $request = json_decode($request);
        $empid = $request->empid;

        $sql = "SELECT * FROM employees WHERE Employee_ID = $empid";
        $result = $conn->query($sql);
        $data = $result->fetch_assoc();
        if($result->num_rows === 1){
            echo json_encode([
                'status' => 'error',
                'message' => 'Record already Exists',
                'value' => 'choose another Employee Id'
            ]);
        }
        else{
            echo json_encode([
                'status' => 'success',
                'message' => 'proceed',
                'value' => '1'
            ]);
        }
    }
?>