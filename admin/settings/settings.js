function adminSettings(){
    fetch('/admin/settings/settings.html')
    .then(response => {
        if(!response.ok){
            console.error("Error fetching settings.html");
        }
        return response.text();
    }).then(data => {
        $('#request-table').html(data);
        $('#request-table').show();
    })
}

function changePercentinit(){
    loadScript('/admin/settings/updatePercent/updatePercentDB.js',()=>{
        console.log("Script Loaded");
    });
    fetch('/admin/settings/updatePercent/changePercent.html')
    .then(response => {
        if(!response.ok){
            console.error("Error fetching changePercent.html");
        }
        return response.text();
    }).then(data => {
        $('#settings-content').html(data);
    })
}

function addEmployeeinit(){
    loadScript('/admin/settings/AddEmployee/employee-settings.js',()=>{
        console.log("Add Employee Option Enabled");
    });
    fetch('/admin/settings/AddEmployee/profile-fill.html')
    .then(response =>{
        if(!response.ok){
            console.error("Error in fetching the Employee Add Option");
        }
        return response.text();
    }).then(data =>{
        $('#settings-content').html(data);
        $('#spotlight').html('');
    })
}

function changePercentOverallinit(){
    loadScript('/admin/settings/updatePercent/updatePercentDB.js',()=>{
        console.log("Script Loaded");
    });
    fetch('/admin/settings/updatePercent/changeOverallPercent.html')
    .then(response => {
        if(!response.ok){
            console.error("Error fetching changePercent.html");
        }
        return response.text();
    }).then(data => {
        $('#settings-content').html(data);
    })
}

function records_init(){
    $('#department-selection').prop('disabled',true);
        $('#employee-home').prop('disabled',true);
        $('#result-home').prop('disabled',true);
        $('#home-home').prop('disabled',true);
    console.log("Records Init");
    recordForm= `
    <form action="">
              <select id="department-selection-result" class="form-control" required style="margin-top:6px" onchange='$("#shift-selection").val("");'>
                <option value="">DEPARTMENT</option>
                <option value="2">ATC</option>
                <option value="1">CNS</option>
                <option value="5">DRIVERS</option>
                <option value="4">ELECTRICAL</option>
                <option value="3">FIRE</option>
              </select>
                <select id="shift-selection" class="form-control" required  style="margin-top:4px" onchange='$("#fetch-record-from-date").val(""); $("#fetch-record-to-date").val("");'>
                    <option value="">SHIFT</option>
                    <option value="S1" id="shift-1">Shift - 1</option>
                    <option value="S2" id="shift-2">Shift - 2</option>
                    <option value="S3" id="shift-3">Shift - 3</option>
                    <option value="GEN" id="general">General</option>
                </select>
            <input class = 'form-control' style='margin-top:4px;' id='fetch-record-from-date'  type='date'>
            <input class = 'form-control' style='margin-top:4px;' id='fetch-record-to-date' onchange='fetch_result_date()' type='date'>
    </form>`;
    $('#request-table').hide();
    $('#request-table').html('');
    $('#shift-form').html(recordForm);
    $('#shift-form').show();
}

function fetch_result_date(){

    const user_data = {
        userid : document.getElementById('UserId').innerText,
        departmentId : document.getElementById('department-selection-result').value,
        shiftId : document.getElementById('shift-selection').value,
        fromDate : document.getElementById('fetch-record-from-date').value,
        toDate : $('#fetch-record-to-date').val()
    };
    console.log(user_data);
    
    loadScript('/admin/results/randomized-results/results.js',()=>{
        console.log("Records Script Loaded");
    });
    fetch('/admin/settings/records/fetch-record.php',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(user_data)
    }).then(response => {
        if(!response.ok){
            console.error("Error fetching records");
        }
        return response.text();
    }).then(data => {
        $('#request-table').html(data);
        $('#request-table').show();
        $('#request-table').css('height','40vh');
    })
}

function manageUserinit(){
    loadScript('/admin/settings/manage-users/users.js',()=>{
        console.log("Manage User Script Loaded");
    });
    fetch('/admin/settings/manage-users/users.html')
    .then(response => {
        if(!response.ok){
            console.error("Error fetching manageUser.html");
        }
        return response.text();
    }).then(data => {
        $('#settings-content').html(data);
    });
}