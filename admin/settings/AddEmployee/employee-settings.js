

function checkEmpId(empid){
    const data = {
        userid : $('#user-profile').attr('title'),
        empid : empid
    };
    if(!verify_path(data)){
        return Promise.resolve();
    }
    else{
        return fetch('/admin/settings/AddEmployee/empid-check.php',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        }).then(response =>{
            if(!response.ok){
                console.error("Error in checks");
            }
            return response.json();
        }).then(data =>{
            const result = data;
            return result;
        })
    }
}

function addEmployeeDB(){
    const credentials = {
        userid : $('#user-profile').attr('title'),
        empid : $('#employee-id-add').val(),
        empname : $('#employee-name-add').val(),
        dept  :$('#department-id-add').val(),
        designation : $('#designation-add').val(),
        email : $('#email-add').val(),
    };
    var inputStatus = 0;
    for(var key in credentials){
        if(credentials[key] === ''){
            inputStatus = 1;
            break;
        }
    }
    if(inputStatus){
        Swal.fire({
            icon : 'warning',
            title : 'please fill all the fields'
        });
        return;
    }
    console.log(credentials);
    if(!verify_path(credentials)){
        return;
    }
    else{
        Swal.fire({
            icon : 'info',
            title: 'Updating the Database',
            allowOutsideClick: false,
            showConfirmButton: false,
        });
        Swal.showLoading();
        checkEmpId(credentials.empid).then(result => {
        console.log(result);
        if(result.status != 'success'){
            Swal.fire({
                icon : result.status,
                title : result.message,
                html: result.value
            });
            $('#employee-id-add').val('');
        }
        else if (result.status === 'success'){
            fetch('/admin/settings/AddEmployee/add-employee.php',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(credentials)
            }).then(response => {
                if(!response.ok){
                    console.error("Error in Adding Employee @ Server");
                }
                return response.json();
            }).then(data =>{
                setTimeout(() => {
                    Swal.close();
                    Swal.fire({
                        icon : data.status,
                        title : data.message,
                        showConfirmButton : false,
                        timer : 15000
                    })
                    $('form input, form select').val('');
                },3000);
            })
        }
    })
    }
}

function dummy(){
    Swal.fire({
        icon : 'error',
        title : 'This Feature is still Under Development',
        showConfirmButton : false,
        timer : 15000
    });
    return false;
}