<?php
    $conn = new mysqli('localhost','root','','project-ba');
    if($conn->connect_error){
        die("Connection failed: ".$conn->connect_error);
    }   
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $request = file_get_contents("php://input");
        $request = json_decode($request,true);
        $department = intval($request['departmentId']);
        $shift = $request['shiftId'];
        $sql = "SELECT * FROM shift_assigned s, employees e, ba_test t WHERE  s.ShiftID = '$shift' AND 
        s.employee_id = e.employee_id AND e.Department_Id = $department AND t.Employee_ID = e.employee_id 
        AND DATE(t.test_time) = CURDATE() AND DATE(s.randomized_time) = CURDATE() AND t.status = 'Approved'";
        $result = $conn->query($sql);
        echo "<table class='table'>";
        echo "<thead>";
        echo "<tr>";
        echo "<th>Employee ID</th>";
        echo "<th>Employee Name</th>";
        echo "<th>Status</th>";
        echo "<th>Approved Time </th>";
        echo "<th>Results</th>";
        echo "</tr>";
        echo "</thead>";
        echo "<tbody>";
        while($data = $result->fetch_assoc()){
            echo "<tr>";
            echo "<td>".$data['Employee_ID']."</td>";
            echo "<td>".$data['Emp_Name']."</td>";
            echo "<td>".$data['Status']."</td>";
            echo "<td>".$data['test_time']."</td>";
            echo "<td><button onclick='viewResults(".'"'.$data['Employee_ID'].'","'.$data['Test_ID'].'"'.");'><i class='fas fa-eye' style='color: blue;'></i></button></td>";
            echo "</tr>";
        }
        echo "</tbody>";
    }
?>