document.getElementById('UserId').innerHTML = sessionStorage.getItem('userid') || '';
document.getElementById('user-profile').title= sessionStorage.getItem('userid') || '';
console.log(sessionStorage.getItem('userid') || 'No User ID');
console.log(sessionStorage.getItem('role') || 'No Role');

function loadScript(link,callback){
    var existingScript = document.querySelector('script[src="'+link+'"]');
    if (existingScript) {
        console.log("Success");
        if(callback && typeof callback === 'function'){
            callback();
        }
    }
    else{
        var script = document.createElement('script');
        script.src = link;
        var targetScript = document.getElementById('script-record');
        targetScript.append(script);
        if(callback && typeof callback === 'function'){
            script.onload = () => {
                callback();
            }
            script.onerror = () => {
                console.error("Error in Loading the Script");
            }
        }
    }
}

function employee_home(){
    loadScript("/Tester/employee/employee.js", ()=> {
        document.getElementById('shift-form').style.display = "none";
        fetch_employee_view();
    });
}
function fetch_registered_data(){
    const user_data = {
        userid : document.getElementById('UserId').innerText,
        departmentId : document.getElementById('department-selection').value
    };
    document.getElementById('shift-form').style.display = "none";
    console.log(user_data);
    if(!verify_path(user_data)){
        return;
    }
    else{
        loadScript("/Tester/registered-data/shift-allocation.js", ()=> {
            console.log("Script Loaded");
        });
        fetch('/Tester/registered-data/allocation.php', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(user_data)
        }).then(response => {
            if(!response.ok){
                console.error("Internal Server Error 404 - Allocation Fetch");
            }
            return response.text();
        }).then(data => {
            var showDiv = document.getElementById('request-table');
            showDiv.style.display = "block";    
            showDiv.innerHTML = data;
        });
    }
}

function fetch_result_data(){
    document.getElementById('shift-form').style.display = "block";
    document.getElementById('request-table').style.display = "none";
}

function verify_path(user_data){
    if(user_data.userid == ""){
        Swal.fire({
            title: 'Ilegal Access',
            text: 'You need to login to access this content',
            icon: 'error',
            showConfirmButton: false,
            willClose : () => {
                window.location.href = "/UserLogin";
            }
          });
        return false;
    }
    return true;
}

function randomized_data(){
    const user_data = {
        userid : document.getElementById('UserId').innerText,
        departmentId : document.getElementById('department-selection-result').value,
        shiftId : document.getElementById('shift-selection').value
    };
    console.log(user_data);
    if(!verify_path(user_data)){
        return;
    }
    else{
        fetch('/Tester/approvals/fetch-approvals.php', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(user_data)
        }).then(response => {
            if(!response.ok){
                console.error("Internal Server Error 404 - Result Fetch");
            }
            return response.text();
        }).then(data => {
            var showDiv = document.getElementById('request-table');
            showDiv.style.display = "block";
            document.getElementById('request-table').innerHTML = data;
        });
    }
}


function edit_data_allocation(department){
    const user_data = {
        userid : document.getElementById('UserId').innerText,
        departmentId : document.getElementById('department-selection').value
    };
    if(!verify_path(user_data)){
        return;
    }
    else{
        fetch('/admin/allocation/allocation.php', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(user_data)
        }).then(response => {
            if(!response.ok){
                console.error("Internal Server Error 404 - Allocation Fetch");
            }
            return response.text();
        }).then(data => {
            var showDiv = document.getElementById('request-table');
            showDiv.style.display = "block";    
            showDiv.innerHTML = data;
        });
    }
}


function home_reset(){
    console.log("Reset");
    document.getElementById('request-table').style.display = "none";
    document.getElementById('script-record').innerHTML = "";
    //reset all form to null
    document.getElementById('request-table').innerHTML = "";
    document.getElementById('department-selection-result').value = "";
    document.getElementById('shift-selection').value = "";
    document.getElementById('shift-form').style.display = "none";
    document.getElementById('department-selection').value = "";
  }

function fetch_approvals(){
    const user_meta_data = {
        userid : document.getElementById('user-profile').title,
    }
    if(!verify_path(user_meta_data)){
        return;
    }
    loadScript('/Tester/approvals/approval.js', ()=>{
        console.log("Approvals Loaded");
        fetch_result_data();
        remove_script('/Tester/registered-data/shift-allocation.js', ()=>{
            console.log("Script Unloaded");
        })
    });
}

function remove_script(scriptid,callback){
    var script = document.querySelector('script[src="'+scriptid+'"]');
    if(script){
        script.remove();
        console.log("Removed");
    }
    else{
        console.log("No conflicts ..");
    }

    if(callback){
        callback();
    }
}