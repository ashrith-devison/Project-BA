<?php
    require '../../../database.php';
    if(!$conn){
        die("Connection Error");
        exit();
    }
    
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $request = file_get_contents("php://input");
        $request = json_decode($request, true);

        $deptid = $request['dept'];
        $shiftId = $request['shift'];

        $query = "SELECT * FROM employee_shiftassignment e,employees em WHERE e.Employee_ID =em.Employee_ID AND e.Department_ID = $deptid AND e.ShiftID = '$shiftId'";
        $result = $conn->query($query);
        echo "<div id='alloted-data-randomizer'>";
        echo "<h4 style='text-align: center;font-size:20px;'>"."Date: ".date('d-m-Y h:i:s a')."</h4>";
        echo "<h4 style='text-align: center;font-size:20px;'>"."Shift: ".$shiftId."</h4>";
        echo "<link rel='stylesheet' href='/admin/results/randomizer/table.css'>";
        echo "<table class='table'>";
        echo "<thead>";
        echo "<tr>";
        echo "<th>Employee Id</th>";
        echo "<th>Employee Name</th>";
        echo "</tr>";
        echo "</thead>";
        echo "<tbody>";
        while($emp = $result->fetch_assoc()){
            echo "<tr>";
            echo "<td>".$emp['Employee_ID']."</td>";
            echo "<td>".$emp['Emp_Name']."</td>";
            echo "</tr>";
        }
        echo "</tbody>";
        echo "</table></div>";
        
        echo '<div class="table-options" style="text-align: right;display: flex; gap: 8px;flex-direction: row-reverse;margin: 8px;">';
        echo '<button id="generate-button-randomizer" onclick="randomizer(\'' . $shiftId . '\',\'' . $deptid . '\');" class="btn btn-success" style="display: flex;align-items: center;">Generate<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-step-forward"><line x1="6" x2="6" y1="4" y2="20"/><polygon points="10,4 20,12 10,20"/></svg></button>';
        echo <<<HTML
            <button class='btn btn-light' style='background-color:#000814; color: white; display: flex; align-items: center;' id='print-button-randomizer' onclick='print_list();'>
            <svg xmlns="http://www.w3.org/2000/svg" style="margin-right: 5px;" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-printer">
                <polyline points="6 9 6 2 18 2 18 9"/>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                <rect width="12" height="8" x="6" y="14"/>
            </svg>
            Print
        </button>
        HTML;
        echo '<button onclick="edit_data_allocation('.$deptid.');"
        class="btn btn-warning" style="display: flex; align-items: center;" ><svg xmlns="http://www.w3.org/2000/svg" style="margin-right: 5px;" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>
        </svg>Edit</button>';
        echo '</div>';
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
