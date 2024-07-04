<?php
    require '../database.php';
    if(!$conn){
        die("Connection Error");
    }
    else{
        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $request = file_get_contents("php://input");
            $request = json_decode($request,true);

            $loginid = $request['userid'];
            $passkey = $request['passkey'];
        try{
            $query = "SELECT * FROM login_credentials WHERE username = '$loginid'";
            $loginData = $conn->query($query);
            $loginData = $loginData->fetch_assoc();
            if($loginData){
                if($loginData['passkey'] === $passkey){
                    if($loginData['role'] === 'admin'){
                        echo json_encode(['userid' => $loginData['username'], 'role' => 'admin', 'url' => '/admin/AdminHome']);
                    }
                    else if($loginData['role'] === 'BA Tester'){
                        echo json_encode(['userid' => $loginData['username'], 'role' => 'tester', 'url' => '/Tester/TesterHome']);
                    }
                    else if(substr($loginData['role'],0,3) === 'HOD'){
                        echo json_encode(['userid' => $loginData['username'], 'role' => $loginData['role'],
                        'url' => '/HOD/AdminHome'
                        ]);
                    }
                }
                else{
                    echo json_encode(['userid' => 'XYZ', 'url' => 'Invalid Credentials']);
                }
            }
            else if(!$loginData){
                echo json_encode(['userid' => 'XYZ', 'url' => 'Invalid Credentials']);
            }

        }
        catch(mysqli_sql_exception $exception){
            echo json_encode(['userid' => 'XYZ', 'url' => 'Illegal Service']);
        }
    }
    }
?>