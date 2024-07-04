<?php
    use PHPMailer\phpmailer\PHPMailer;
    use PHPMailer\phpmailer\Exception;

    require '..\PhpMailer\src\Exception.php';
    require '..\PhpMailer\src\PHPMailer.php';
    require '..\PhpMailer\src\SMTP.php';
    require '../database.php';
    function updateOtp($otp, $username){
        require '../database.php';
        $sql = "INSERT INTO otp (otp, username) VALUES ('$otp', '$username') ON DUPLICATE KEY 
        UPDATE otp='$otp'";
        $conn->query($sql);
        $conn->close();
    }
    if($MailLoginData['mailid'] === ""){
        echo "<script>alert('No Email Found');</script>";
    }
    else if($_SERVER['REQUEST_METHOD'] === 'POST'){

        $otp = rand(1000000, 9999999);
        $request = file_get_contents("php://input");
        $request = json_decode($request,true);
        $email = $request['email'];
        $username = $request['empid'];
        
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $MailLoginData['mailid'];
        $mail->Password = $MailLoginData['mailpasskey'];
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        $mail->setFrom('noReply@aac.in.uk', 'AAC');
        $mail->addAddress($email);

        $mail->isHTML(true);
        $mail->Subject = 'Forgot Password - AAC';
        $content =  '<h1 align=center>Your OTP</h1>
                    <p align=center>Your OTP is: <b>' . $otp . '</b></p>';
        $mail->Body = $content;

        if($mail->send()){
            echo 'Email has been sent';
            updateOtp($otp, $username);
        }else{
            echo 'Error: ' . $mail->ErrorInfo;
        }
    }

?>