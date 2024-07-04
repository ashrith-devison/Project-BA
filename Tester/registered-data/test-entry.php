<?php
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        require '../../database.php';
            if(!$conn){
                die("Connection Error");
            }
            $request = file_get_contents("php://input");
            $request = json_decode($request);
            $department = intval($request->dept);
            $shift = $request->shift;
            $query = "SELECT * FROM shift_assigned s, ba_test t, employees e WHERE e.Department_id = $department 
            AND s.Employee_ID = e.Employee_ID AND t.Employee_ID = e.Employee_ID AND s.ShiftID = '$shift' AND
            ((t.Status = 'Rejected - I' AND DATE_ADD(t.test_time, INTERVAL 15 MINUTE) < NOW()) OR t.Status = 'Pending')
            AND t.Test_ID = s.id";
            $result = $conn->query($query);
            
            $data = array(
                'S1' => 'Shift - I',
                'S2' => 'Shift - II',
                'S3' => 'Shift - III',
                'GEN' => 'General',
                'Nan' => 'Not Assigned'
            );

            $query = "SELECT * FROM  shift_assigned s, employees e, ba_test t WHERE e.Department_id = $department
            AND e.Employee_ID = s.Employee_ID AND t.Test_ID = s.id";
            $values = $conn->query($query);
            $value_data = array();
            while($row = $values->fetch_assoc()){
                $value_data[$row['Employee_ID']] = $row['ShiftID'];
            }
            echo "<table class='table'>";
            echo "<thead>";
            echo "<tr>";
            echo "<th>Employee ID</th>";
            echo "<th>Name</th>";
            echo "<th>Designation</th>";
            echo "<th>Shift</th>";
            echo "<th>Status</th>";
            echo "</tr>";
            echo "</thead>";
            echo "<tbody>";
            while($staff = $result->fetch_assoc()){
                echo "<tr>";
                echo "<td>".$staff['Employee_ID']."</td>";
                echo "<td>".$staff['Emp_Name']."</td>";
                echo "<td>".$staff['Designation']."</td>";
                $shift_data = isset($value_data[$staff['Employee_ID']]) ? $value_data[$staff['Employee_ID']] : "Nan";
                $shift_data = $data[$shift_data];
                echo "<td>".$shift_data."</td>";
                echo "<td><button style='color : blue;' onclick=\"resultEntry('".$staff['Employee_ID']."','".$staff['Test_ID']."','".$staff['Status']."','".$staff['Remarks']."')\"><i class='fas fa-pencil-alt'></i></button></td>";
                echo "</tr>";
            } 
        echo "</tbody>";
    echo "</table>";
    echo "
    <div id='result-entry'>
    </div>";
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
                        window.location.href = '/AAI/index.html';
                    }
                });
            }
        </script>";
    }
?>
