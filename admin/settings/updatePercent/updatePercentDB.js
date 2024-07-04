function validatePercent(percent){
    if(percent < 0 || percent > 100){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            html: '<h4>Invalid Percent</h4>',
            showConfirmButton: false,
            timer: 15000
        });
        return false;
    }
    return true;
}

function updatePercentDB(){
    const credentials = {
        userid : $('#user-profile').attr('title'),
        percent : $('#percent-change').val(),
        dept : $('#department-percent-change').val(),
        shift : $('#shift-percent-change').val(),
        password : $('#password-percent-change').val()
    };
    if(!verify_path(credentials)){
        return;
    }
    else if(!validatePercent(credentials.percent)){
        $('#percent-change').val('');
        return;
    }
    else{
        var inputStatus = 0;
        for(key in credentials){
            if(credentials[key] === ''){
                inputStatus = 1;
                break;
            }
        }
        if(inputStatus === 1){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                html: '<h4>Please fill all the fields</h4>',
                showConfirmButton: false,
                timer: 15000
            });
            return;
        }
        else{
            const loginverifications = {
                userid : credentials.userid,
                passkey : credentials.password
            };
            fetch('/login/login-verify.php',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(loginverifications)
            }).then(response => {
                if(!response.ok){
                    console.error("Error fetching changePercent.html");
                }
                return response.json();
            }).then(login_data =>{
                if(login_data.role === 'admin'){
                    fetch('/admin/settings/updatePercent/updatePercent.php',{
                        method : 'POST',
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify(credentials)
                    }).then(response => {
                        if(!response.ok){
                            console.error("Error fetching changePercent.html");
                        }
                        return response.json();
                    }).then(data => {
                        Swal.fire({
                            icon : data.status,
                            title : data.message,
                            showConfirmButton : false,
                            timer : 15000
                        })
                        $('form input, form select').val('');
                    })
                }
                else{
                    Swal.fire({
                        icon : 'error',
                        title : 'Invalid Credentials',
                        showConfirmButton : false,
                        timer : 15000
                    })
                    $('#password-percent-change').val('');
                }
            })
        }
    }
}


function updatePercentOverallDB(){
    const credentials = {
        userid : $('#user-profile').attr('title'),
        percent : $('#percent-change').val(),
        password : $('#password-percent-change').val()
    };
    if(!verify_path(credentials)){
        return;
    }
    else if(!validatePercent(credentials.percent)){
        $('#percent-change').val('');
        return;
    }
    else{
        const loginverifications = {
            userid : credentials.userid,
            passkey : credentials.password
        };
        fetch('/login/login-verify.php',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(loginverifications)
        }).then(response => {
            if(!response.ok){
                console.error("Error fetching changePercent.html");
            }
            return response.json();
        }).then(login_data =>{
            if(login_data.role === 'admin'){
                fetch('/admin/settings/updatePercent/updatePercentOverall.php',{
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify(credentials)
                }).then(response => {
                    if(!response.ok){
                        console.error("Error fetching changePercent.html");
                    }
                    return response.json();
                }).then(data => {
                    Swal.fire({
                        icon : data.status,
                        title : data.message,
                        showConfirmButton : false,
                        timer : 15000
                    })
                    $('form input').val('');
                })
            }
            else{
                Swal.fire({
                    icon : 'error',
                    title : 'Invalid Credentials',
                    showConfirmButton : false,
                    timer : 15000
                })
                $('#password-percent-change').val('');
            }
        })
    }
}