<?php
date_default_timezone_set('Asia/Kolkata');
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $request = file_get_contents("php://input");
    $request = json_decode($request);
    $employeeData = json_encode($request->employeeData);
    $deptCode = $request->deptCode;
    $shift = $request->shiftId;
    $dept = $request->deptId;
    require '../../../database.php';
    if(!$conn){
        die("Connection Error");
    }

    $query = "SELECT * FROM envdata WHERE dept_code = '$deptCode'";
    $result = $conn->query($query);
    $percent = 0;
    if($result->num_rows >= 1 ){
        $row = $result->fetch_assoc();
        $row_date = date('Y-m-d', strtotime($row['randomized_time']));
        $next_dt = date('Y-m-d',strtotime($row['randomized_time'].'+24 hours'));
        $curr_dt = date('Y-m-d');

        if($next_dt > $curr_dt){
            echo '{"Error" : "<h4><strong>Randomizer already executed for today at '.$row['randomized_time'].
                '<br>Next Randomizer will be executed on '.$next_dt.'</strong></h4>"}';
        }
        else{
            $percent = $row['percent'];
            chdir('../../');
            $directory = getcwd();
            $directory = str_replace("\\", '/', $directory);
            $directory = $directory.'/Python/python.exe';
            chdir('results/randomizer');
            $output = $directory." randomizer-AAI.py $employeeData $percent 2>&1";
            $output = shell_exec($output);
            echo $output;
        }
    }
    else {
        echo '{"Error" : "<h2><strong><em>Error in System Enviroment <br>Contact Maintaince Team..</em></strong></h2>"}';
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
                    window.location.href = '/AAI/index.html';
                }
            });
        }
    </script>";
}
?>  