<?php

    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $request = file_get_contents("php://input");
        $request = json_decode($request,true);
        $empid = $request['empId'];
        $status = $request['status'];
        $deptId = $request['deptId'];
        require '../../database.php';
        if(!$conn){
            die("DB Connection Error");
            exit();
        }

        $query_dup = "SELECT * FROM employee_shiftassignment WHERE Employee_ID = '$empid' ";
        $result = $conn->query($query_dup);

        if ($result) {
            if ($result->num_rows >= 1) {
                $result = $result->fetch_assoc();
                $query = "UPDATE employee_shiftassignment SET ShiftID = '$status' WHERE Employee_ID = '$empid' AND ShiftID = '{$result['ShiftID']}'";
            } else {
                $query = "INSERT INTO employee_shiftassignment VALUES ('$empid','$status','$deptId')";
            }

            if ($conn->query($query)) {
                // If the query was successful
                echo "Updation Done for " . $empid;
            } else {
                // If there was an error in the query
                echo "Error occurred in Updating data for Employee Id " . $empid;
            }
        } else {
            // If there was an error in the initial query
            echo "Error occurred while fetching data for Employee Id " . $empid;
        }



    }
?>