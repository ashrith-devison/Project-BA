<?php
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        require '../../../database.php';
        if($conn->connect_error){
            die("Connection failed: ".$conn->connect_error);
        }
        $request = file_get_contents("php://input");
        $request = json_decode($request,true);
        $empid = $request['userid'];
        $testid = $request['testid'];
        $sql = "SELECT * FROM ba_test WHERE Employee_ID = '$empid' AND Test_ID = '$testid'";;
        $result = $conn->query($sql);
        $data = $result->fetch_assoc();
        echo json_encode(['empid' => $data['Employee_ID'],
            'testPercent' => $data['test_percent'],
            'deviceNo' => $data['Device_No'],
            'testerName' => $data['Tester_Name'],
            'status' => $data['Status'],
            'testid' => $testid,
            'remarks' => $data['Remarks']
         ]);
    }
?>