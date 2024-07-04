function fetch_employee_view(){
    const data = {
        userid : sessionStorage.getItem('userid'),
        role : sessionStorage.getItem('role')
    };
    if(!verify_path(data)){
        return;
    }
    else{
        fetch('/admin/employee/employee-data.php',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        })
        .then(response => {
            if(!response.ok){
                console.error("Internal Server Error 404 - Emp Fetch");
            }
            return response.text();
        }).then(data => {
            var showDiv = document.getElementById('request-table');
            showDiv.style.display = "block";    
            showDiv.innerHTML = data;
        })
    }
}

function editEmployee(empid){
    const credentials = {
        userid : document.getElementById('user-profile').title,
        empid : empid
    };
    if(!verify_path(credentials)){
        return;
    }
    else{
        loadScript('/admin/employee/modify/edit-form.js', ()=>{
            console.log("Edit Option Enabled");
            editEmployeeDetails(credentials.empid);
        })
    }
}

function dropEmployee(empid){
    const credentials = {
        userid : document.getElementById('user-profile').title,
        empid : empid
    };
    if(!verify_path(credentials)){
        return;
    }
    else{
        remove_script('/admin/employee/modify/edit-form.js',()=>{
            console.log("Edit Option Disabled");
        });
        loadScript('/admin/employee/drop/drop.js', ()=>{
            console.log("Drop Option Enabled");
            drop(credentials.empid);
        });

    }
}