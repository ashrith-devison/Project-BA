<?php
    require '../../database.php';
    if(!$conn){
        die("Connection Error ..");
    }
    else{
        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $query = "SELECT * FROM employees e, department d WHERE e.Department_Id = d.Department_Id ORDER BY e.Employee_ID ";
            $request = file_get_contents("php://input");
            $request = json_decode($request);
            $role = $request->role;
            $data = $conn->query($query);
            echo "<table class='table'>";
            echo "<thead>";
            echo "<tr>";
            echo "<th>Employee ID</th>";
            echo "<th>Employee Name</th>";
            echo "<th>Designation</th>";
            echo "<th>Department</th>";
            echo "<th>Email</th>";
            echo "<th></th>";
            echo "<th></th>";
            echo "</tr>";
            echo "</thead>";
            echo "<tbody>";
            while($row = $data->fetch_assoc()){
                echo "<tr>";
                echo "<td>".$row['Employee_ID']."</td>";
                echo "<td>".$row['Emp_Name']."</td>";
                echo "<td>".$row['Designation']."</td>";
                echo "<td>".$row['Department_name']."</td>";
                echo "<td>".$row['email']."</td>";
                if($role === 'admin'){
                    echo "<td><button type='button' class = 'btn btn-warning' onclick='editEmployee(".'"'.$row['Employee_ID'].'"'.")'>Modify</button></td>";
                    echo "<td><button type='button' class = 'btn btn-danger' id = 'delete-employee-button' onclick='dropEmployee(".'"'.$row['Employee_ID'].'"'.")'>Delete</button></td>";
                }
                echo "</tr>";
            }
            echo "</tbody>";
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
    }
?>
