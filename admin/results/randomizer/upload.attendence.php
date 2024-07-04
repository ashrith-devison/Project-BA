<?php
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $request = file_get_contents('php://input');
        $request = json_decode($request);
        $empid = $request->empid;
        $empname = $request->empname;
        $shift = $request->shift;
        $dept = intval($request->dept);


        require '../../../database.php';
        if(!$conn){
            die("Connection Error");
        }
        $success = 0;
        for($i=0; $i<count($empid); $i++){
            $query = "INSERT INTO final_attendence VALUES ($empid[$i], '$empname[$i]','$shift',$dept, CURDATE())";
            if(!$conn->query($query)){
                $success = 1;
            }
        }
        echo $success;
    }
?>