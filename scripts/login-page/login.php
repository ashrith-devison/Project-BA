<?php
    $conn =  mysqli_connect('localhost','root','','project-BA');
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json_data = file_get_contents('php://input');
        $credentials = json_decode($json_data, true); 

        $loginid = $credentials['loginid'];
        $passkey = $credentials['passkey'];

    }
    if(!$conn){
        die("DB connection error".mysqli_connect_error());
    }
    else{
        $query = "SELECT * FROM login_credentials WHERE username = '$loginid';";
        $details = $conn->query($query);
        $check = $details->fetch_assoc();
        if($check){
            if($check['passkey'] === $passkey){
                header('Content-Type: application/json');
                if($check['role'] === 'admin'){
                    $url = "\project-ba\Home\home.html";
                    echo json_encode(['redirect' =>  $url, 'UserId' => $loginid]);
                    exit();
                }
            }
            else{
                echo "Error in Login";
            }
        }
        else{
            echo "<p>User details Not Found in our server </p>";
        }
    }
?>