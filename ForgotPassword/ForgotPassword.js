
function validate(){
    const data = {
        email : $('#emp-email').val(),
        empid : $('#emp-username').val()
    }
    fetch('/admin/employee/modify/fetch-employee.php', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    }).then(response => {
        if(!response.ok){
            console.error('Failed to fetch employee data');
        }
        return response.json();
    }).then(responseData => {
        if(responseData.email !== $('#emp-email').val()){
            Swal.fire({
                icon : 'info',
                title : 'Incorrect Credentials',
                timer : 2500,
                showConfirmButton : false,
            }).then(() => {
                $('#emp-email').val('');
                $('#emp-username').val('');
            });
        }
        else{
            sendOTP();
        }
        console.log(responseData);
    });
}

function sendOTP(){
    Swal.fire({
        title : 'Sending the OTP',
        html : '<img src="/loading-gif.gif">',
        showConfirmButton : false,
        allowOutsideClick : false,
        allowEscapeKey : false,
        allowEnterKey : false,
        didOpen : () => {
            Swal.showLoading();
        }
    });
    const data = {
        email : $('#emp-email').val(),
        empid : $('#emp-username').val()
    };
    console.log(data);
    fetch('/ForgotPassword/send-otp.php', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    }).then(response => {
        if(!response.ok){
            console.error('Failed to send OTP');
        }
        return response.text();
    }).then(responseData => {
        enableOtpScreen();
        Swal.close();
        console.log(responseData);
    });
}

function verifyotp(){
    const data = {
        otp : $('#emp-otp').val(),
        password : $('#emp-new-password').val(),
        username : $('#emp-username').val()
    };
    fetch('/ForgotPassword/verify-otp.php', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    }).then(response => {
        if(!response.ok){
            console.error('Failed to verify OTP');
        }
        return response.text();
    }).then(responseData => {
        icon = 'success';
        if(responseData === 'OTP Incorrect'){
            icon = 'error';
        }
        Swal.fire({
            icon : icon,
            title : responseData,
            timer : 2500,
            showConfirmButton : false,
        }).then(() => {
            $('form input').val('');
            window.location.href = '../UserLogin';
        });
    });
}

function enableOtpScreen(){
    const content = `
                    <div class="form-group>
                        <label for="otp" style="margin-bottom: 3px; color: #D3D3D3;">OTP</label>
                        <input type="text" class="form-control" id="emp-otp" placeholder="Enter OTP" style="margin-bottom: 5px;">
                    </div>
                    <div class="form-group>
                        <label for="new-password" style="margin-bottom: 3px; color: #D3D3D3;">New Password</label>
                        <input type="password" class="form-control" id="emp-new-password" placeholder="Enter new password" style="margin-bottom: 5px;">
                    </div>
                    <button onclick='verifyotp();' type='button' class="btn btn-primary btn-block" >Update</button>`;
    $('#emp-username').attr('disabled', 'true');
    $('#emp-email').attr('disabled', 'true');
    $('#otp-enable').html(content);
    $('#otp-send').prop('disabled', true);
    $('#otp-send').hide();
    
}
