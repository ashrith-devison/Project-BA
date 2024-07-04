function editEmployeeDetails(empid){
    const credentials = {
        userid : document.getElementById('user-profile').title,
        empid : empid
    };
    if(!verify_path(credentials)){
        return;
    }
    else{
        fetch('/admin/employee/modify/fetch-employee.php',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(credentials)
        })
        .then(response => {
            if(!response.ok){
                console.error("Error in Fetching Data");
            }
            return response.json();
        }).then(data =>{
            fetch('/admin/employee/modify/edit-form.html')
            .then(response => {
                if(!response.ok){
                    console.error("Error in Loading Form Template");
                }
                return response.text();
            }).then(edit_form => {
                console.log(data);
                document.getElementById('spotlight').style.display = "none";
                document.getElementById('spotlight').innerHTML = edit_form;
                document.getElementById('emp-id').value = data.empid;
                document.getElementById('emp-name').value = data.empname;
                document.getElementById('emp-role').value = data.role;
                document.getElementById('dept-id').value = data.deptid;
                $('#emp-email').val(data.email);
                document.getElementById('spotlight').style.display = "block";
            });
        });
    }
}

function updateEmployeeDetails(){
    const credentials = {
        empid : document.getElementById('emp-id').value,
        empname : document.getElementById('emp-name').value,
        role : document.getElementById('emp-role').value,
        deptid : $('#dept-id').val(),
        email : $('#emp-email').val(),
    };
    const user_data = {
        userid :  document.getElementById('user-profile').title
    };
    if(!verify_path(user_data)){
        return;
    }
    else{
        fetch('/admin/employee/modify/update-employee.php',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(credentials)
        }).then(response => {
            if(!response.ok){
                console.error("Error on Updating Details");
            }
            return response.text();
        }).then(data =>{
            Swal.fire({
                title : data,
                icon : 'success',
                showConfirmButton : false,
                timer : 15000
            }).then(()=>{
                document.getElementById('spotlight').innerHTML = '';
                fetch_employee_view();
            })
        });
    }
}

function closeForm(){
    $('#spotlight').html('');
}