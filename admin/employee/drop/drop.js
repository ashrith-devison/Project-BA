function drop(empid){
    const credentials = {
        userid : document.getElementById('user-profile').title,
        empid : empid
    };
    fetch('/admin/employee/modify/fetch-employee.php',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(credentials)
    }).then(response => {
        if(!response.ok){
            console.error("Error in fetching data");
        }
        return response.json();
    }).then(data => {
                Swal.fire({
                    title:'Are You Sure to Delete the '+data.empname +' Record',
                    icon : 'warning',
                    showDenyButton : true,
                    showConfirmButton : true,
                    confirmButtonText : 'CANCEL',
                    denyButtonText : 'PROCEED ',
                }).then((result)=>{
                    if(result.isDenied){
                        console.log("Operation Success");
                        dropEmployeeUpdate(empid);
                    }
                    else if(result.isConfirmed){
                        console.log("Operation Cancelled");
                        document.getElementById('spotlight').innerHTML = '';
                    }
                });
    })
}

function dropEmployeeUpdate(empid){
    const user_data = {
        userid : document.getElementById('user-profile').title,
        empid : empid
    };
    if(!verify_path(user_data)){
        return;
    }
    else{
        fetch('/admin/employee/drop/delete-employee.php',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(user_data)
        }).then(response => {
            if(!response.ok){
                console.error("Error in Deleting the Record");
            }
            return response.text();
        }).then(data =>{
            Swal.fire({
                title : data,
                icon : data,
                showConfirmButton : true,
                timer : 15000
            }).then(()=>{
                document.getElementById('spotlight').innerHTML = '';
                fetch_employee_view()
            })
        })
    }
}