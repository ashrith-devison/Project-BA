function getDetails(){
    const data = {
        empid : $('#employee-id').val()
    };
    fetch('/admin/employee/modify/fetch-employee.php',{
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
    }).then(data => {
        if(data.message){
            Swal.fire({
                icon : 'info',
                title : 'Employee Data Not Found',
                timer : 2500,
                showConfirmButton : false,
            }).then(() => {
                $('#employee-id').val('');
            });
        }
        else{
            $('#employee-name').val(data.empname);
            $('#employee-email').val(data.email);
            $('#designation').val(data.role);
            $('#department-id').val(data.deptid);
        }
    })
}

function allocateRole(){
    const request = {
        empid : $('#employee-id').val(),
        role : $('#manage-role').val()
    };
    console.log(request);
    for(var key in request){
        if(request[key] === ''){
            Swal.fire({
                icon : 'warning',
                title : 'please fill all the fields'
            });
            return;
        }
    }
    fetch('/admin/settings/manage-users/current-hod.php',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(request)
    }).then(response => {
        if(!response.ok){
            console.error('Failed to allocate role');
        }
        return response.text();
    }).then(data => {
        console.log(data);
        ConfirmRole();
        beforeRoleDB(data).then(before => {
            const after = {
                empid : $('#employee-id').val(),
                empname : $('#employee-name').val(),
                email : $('#employee-email').val(),
                role : $('#designation').val()
            };
            ConfirmRole(before,after);
        });
    });
}

function ConfirmRole(before,after){
    fetch('/admin/settings/manage-users/confirmation.html').then(response => {
        if(!response.ok){
            console.error('Failed to load confirmation page');
        }
        return response.text();
    }).then(data => {
        $('#spotlight').html(data);
        content = "";
        const key = {
            empid : 'Employee Id',
            empname : 'Employee Name',
            email : 'Email',
            role : 'Designation'
        }
        console.log(before,after,key);
        for(var i in after){
            content += "<tr>";
            content += "<td>"+key[i]+"</td>";
            content += "<td>"+before[i]+"</td>";
            content += "<td>"+after[i]+"</td>";
            content += "</tr>";
        }
        console.log(content);
        $('#spotlight').find('tbody').html(content);
        $('#employee-id').prop('disabled',true);
        $('#manage-role').prop('disabled',true);
        $('#spotlight').show();
    });
}

async function beforeRoleDB(employeeid) {
    try {
        const response = await fetch('/admin/employee/modify/fetch-employee.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ empid: employeeid })
        });

        if (!response.ok) {
            console.error('Failed to fetch employee data');
            throw new Error('Failed to fetch');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null; // or {}
    }
}
function updateRoleDB(){
    const request = {
        empid : $('#employee-id').val(),
        role : $('#manage-role').val()
    };
    fetch('/admin/settings/manage-users/update-role.php',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(request)
    }).then(response => {
        if(!response.ok){
            console.error('Failed to update role');
        }
        return response.json();
    }).then(data => {
        console.log(data);
        Swal.fire({
            icon : data.icon,
            title : data.message,
            timer : 2500,
            showConfirmButton : false
        }).then(() => {
            $('#spotlight').html('');
            adminSettings();
        });
    });
}