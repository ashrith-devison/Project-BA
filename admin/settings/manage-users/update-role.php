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
        
        $query = "UPDATE login_credentials SET username=$empid WHERE role='$role'";
        $result = $conn->query($query);
        if($result){
            echo json_encode([
                'message' => 'Role updated successfully',
                'icon' => 'success',
            ]);
        }
        else{
            echo json_encode([
                'message' => 'Role update failed',
                'icon' => 'error',
            ]);
        }
    }
?>