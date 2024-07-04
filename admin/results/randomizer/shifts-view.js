function randomizer(shift,deptid){
    console.log(deptid);
    const tableData = getValues(1);
    const empid = getValues(0);
    console.log(empid);
    console.log(tableData);
    const dataarray = {
        employeeData : tableData,
        shiftId : shift,
        deptCode : deptid+'_'+shift,
        deptId : deptid
    };
    const attendence = {
        empid : empid,
        empname : tableData,
        shift : shift,
        dept : deptid
    };
    console.log(dataarray);
    fetch("/admin/results/randomizer/execute-python.php", {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(dataarray)
    })
    .then(response => {
        if(!response.ok){
            console.error("Internal Server Error");
        }
        return response.text();
    }).then(data => {
        const resultname = JSON.parse(data);
        if(resultname.Error){
            let divData = document.getElementById('request-table');
            divData.innerHTML = resultname.Error;
            Swal.fire({
                icon : 'error',
                title : 'Error',
                html : resultname.Error
            }).then(()=>{
                let divData = document.getElementById('request-table');
                divData.innerHTML = resultname.Error;
                console.log(resultname);
            })
        }
        else{
            const resultEmpId = [];
            for(let i = 0; i<resultname.length; i++){
                console.log(resultname.indexOf(resultname[i]));
                resultEmpId.push(empid[tableData.indexOf(resultname[i])]);
            }
            const report_data = {
                empId : resultEmpId,
                empName : resultname,
                shiftId : shift,
                deptCode : deptid+'_'+shift,
                deptId : deptid
            };
            console.log(report_data);
            fetch('/admin/results/randomizer/report.php', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(report_data)
            }).then(response => {
                if(!response.ok){
                    console.error("Internal Server Error");
                }
                return response.text();
            }).then(tableData => {
                let divData = document.getElementById('request-table');
                divData.innerHTML = tableData;
                Swal.fire({
                    title : 'Uploading the Attendence',
                    html : '<img src="/loading-gif.gif">',
                    showConfirmButton : false,
                    allowOutsideClick : false,
                    allowEscapeKey : false,
                    allowEnterKey : false,
                    didOpen : () => {
                        Swal.showLoading();
                    }
                });
                fetch('/admin/results/randomizer/upload.attendence.php',{
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify(attendence)
                }).then(response => {
                    if(!response.ok){
                        console.error("DOne");
                    }
                    return response.text();
                }).then(data => {
                    Swal.close();
                });
                const newTab = window.open();
                newTab.document.body.innerHTML = tableData;
                newTab.print();

            });
        }
    });  
}


function getValues(Index){
    const table = document.getElementById('request-table');
    const rows = table.getElementsByTagName('tr');
    const values = [];

    for(let i = 0; i<rows.length; i++){
        const cells = rows[i].getElementsByTagName('td');
        if(cells.length > Index){
            const cellValue = cells[Index].innerText;
            values.push(cellValue);
        }
    }
    return values;
}
