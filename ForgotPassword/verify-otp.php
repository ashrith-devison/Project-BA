<?php
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        require '../database.php';
        $request = file_get_contents("php://input");
        $request = json_decode($request,true);
        $userid = $request['username'];
        $otp = $request['otp'];
        $password = $request['password'];
        
        if(!$conn){
            echo 'Connection error: ' . mysqli_connect_error();
        }
        $sql = "SELECT * FROM otp WHERE username = '$userid'";
        $result = $conn->query($sql);
        $result = $result->fetch_assoc();
        if($result['otp'] == $request['otp']){
            updateOtp($password, $userid);
        }else{
            echo 'OTP Incorrect';
        }
    }

    function updateOtp($password, $username){
        require '../database.php';
        $sql = "UPDATE login_credentials SET passkey = '$password' WHERE username = '$username'";
        if($conn->query($sql)){
            echo 'Password updated successfully';
        }else{
            echo 'Error: ' . $conn->error;
        }
        $conn->close();
    }
    
?>