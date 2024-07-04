<?php
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $request = file_get_contents('php://input');
        $data = json_decode($request);
        require '../../../database.php';
        if(!$conn){
            die('Connection failed: '.mysqli_connect_error());
        }
        $dept_code = $data->dept."_".$data->shift;
        $sql = "UPDATE envdata SET percent = $data->percent WHERE dept_code = '$dept_code'";
        if($conn->query($sql)){
            echo json_encode(['status' => 'success',
            'message' => 'Updated Record Successfully']);
        }
        else{
            echo json_encode(['status' => 'error',
            'message' => 'Failed to Update Record']);
        }
    }
?>