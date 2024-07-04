<?php
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        require '../../../database.php';
        if(!$conn){
            die("Connection Error");
        }
        else{
            $request = file_get_contents("php://input");
            $request = json_decode($request);
            $percent = $request->percent;
            
            $sql = "UPDATE envdata SET percent = $percent";
            if($conn->query($sql)){
                echo json_encode([
                    'status' =>'success',
                    'message' => 'Updated Successfully'
                ]);
            }
            else{
                echo json_encode([
                    'status' =>'error',
                    'message' => 'Request Failed..'
                ]);
            }
        }
    }
?>