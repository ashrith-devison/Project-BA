<?php
    require '../../database.php';
    if(!$conn){
        die("Connection Error ..");
    }
    else{
        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $query = "SELECT * FROM employees e, department d WHERE e.Department_Id = d.Department_Id ORDER BY e.Employee_ID ";
            $data = $conn->query($query);
            echo "<table class='table'>";
            echo "<thead>";
            echo "<tr>";
            echo "<th>Employee ID</th>";
            echo "<th>Employee Name</th>";
            echo "<th>Designation</th>";
            echo "<th>Department</th>";
            echo "</tr>";
            echo "</thead>";
            echo "<tbody>";
            while($row = $data->fetch_assoc()){
                echo "<tr>";
                echo "<td>".$row['Employee_ID']."</td>";
                echo "<td>".$row['Emp_Name']."</td>";
                echo "<td>".$row['Designation']."</td>";
                echo "<td>".$row['Department_name']."</td>";
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
                                window.location.href = '/AAI/index.html';
                            }
                        });
                    }
                </script>";
        }
    }
?>
