<?php
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        require '../../../database.php';
        if(!$conn){
            die("Connection Error");
        }
        else{
            $request = file_get_contents("php://input");
            $request = json_decode($request);
            $empid = $request->empid;
            $empname = $request->empname;
            $dept = $request->dept;
            $designation = $request->designation;
            $email = $request->email;
            $sql = "INSERT INTO employees (Employee_ID, Emp_Name, Designation, Department_Id, email) 
            VALUES( $empid, '$empname','$designation','$dept','$email');";
            if($conn->query($sql)){
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Updated Successfully'
                ]);
            }
            else{
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Error in Adding Employee'
                ]);
            }
        }
    }
?>