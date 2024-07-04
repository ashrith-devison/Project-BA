<?php
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        require '../../database.php';
        if(!$conn){
            die("Connection Error");
        }
        $request = file_get_contents("php://input");
        $request = json_decode($request);
        $empid = $request->empid;
        $status = $request->status;
        $percent = $request->percent;
        $device = $request->device;
        $tester = $request->tester;
        $testid = $request->testid;
        $remarks = $request->remarks;

        if($status === 'Approved'){
            $query = "UPDATE ba_test SET Status = '$status', test_percent = $percent, Device_No = '$device', 
            Tester_Name = '$tester', test_time = NOW() WHERE Employee_ID = '$empid' AND Test_ID = '$testid'";
        }
        else{
            $query = "UPDATE ba_test SET Status = '$status', Remarks = '$remarks', test_percent = $percent, Device_No = '$device', 
            Tester_Name = '$tester', test_time = NOW() WHERE Employee_ID = '$empid' AND Test_ID = '$testid'";
        }
        $result = $conn->query($query);

        if($result){
            $query = "SELECT Emp_Name FROM employees WHERE Employee_ID = '$empid';";
            $result = $conn->query($query);
            $name = $result->fetch_assoc();
            $name = $name['Emp_Name'];
            if($status==='Approved'){
                echo "Updated Successfully .. <br> $name";
            }
            else{   
                echo "Updated Successfully... <br> $name
                <br><b>Remark : </b> <u>$remarks </u><br>Status : <strong><u>$status</u></strong>";
            }
        }
        else{
            echo "Failed";
        }
    }
    else{
        echo 
            "<script src='/node_modules/sweetalert2/dist/sweetalert2.all.min.js'></script>
            <script>
                window.onload = function() {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Invalid Request',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }).then((result) => {
                        if(result.isConfirmed){
                            window.location.href = '/UserLogin';
                        }
                    });
                }
            </script>";
    }
?>
