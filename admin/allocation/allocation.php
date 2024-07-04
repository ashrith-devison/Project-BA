<?php
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
            require '../../database.php';
            if(!$conn){
                die("Connection Error");
            }
            $request = file_get_contents("php://input");
            $request = json_decode($request);
            $department = intval($request->departmentId);
            $query = "SELECT * FROM employees WHERE Department_id = $department";
            $result = $conn->query($query);
            
            $data = array(
                'S1' => 'Shift - I',
                'S2' => 'Shift - II',
                'S3' => 'Shift - III',
                'GEN' => 'General',
                'Nan' => 'Not Assigned'
            );

            $query = "SELECT * FROM employee_shiftassignment WHERE Department_id = $department";
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
                echo "<td>
                <style>
                    #shift-selection {
                        font-size: 14px;
                        padding: 6px;
                        border-radius: 5px;
                        border: 5px solid #ccc;
                    }
                    #shift-selection option {
                        font-size: 16px;
                        padding: 4px;
                    }
                </style>
                <select id='shift-selection' data-id = '".$staff['Employee_ID']."' onchange = 'update(this)'>";
                echo "<option selected disabled>".$shift_data."</option>
                    <option value='Nan'>Not Assigned</option>
                    <option value='S1'>Shift - I</option>
                    <option value='S2'>Shift - II</option>
                    <option value='S3'>Shift - III</option>
                    <option value='GEN'>General</option>
                </select>"
                ."</td>";
                echo "</tr>";
            } 
        echo "</tbody>";
    echo "</table>";
    echo "<button type='button' style='position:relative; left:90%' class='btn btn-success' onclick="."relocate($department); ".">Proceed</button>
    <div id='message'>
    </div>";
    }
    else{
        echo 
        "<script src='/AAI/node_modules/sweetalert2/dist/sweetalert2.all.min.js'></script>
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
