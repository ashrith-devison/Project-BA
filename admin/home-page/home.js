

document.getElementById('UserId').innerHTML = sessionStorage.getItem('userid') || '';
document.getElementById('user-profile').title= sessionStorage.getItem('userid') || '';
console.log(sessionStorage.getItem('userid') || 'No User ID');
console.log(sessionStorage.getItem('role') || 'No Role');

$("#user-profile-dropdown").hide();
    $("#aai-profile").on("click", ()=>{
      $("#user-profile-dropdown").toggle();
    });

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
    loadScript("/admin/employee/employee.js", ()=> {
        document.getElementById('shift-form').style.display = "none";
        fetch_employee_view();
    });
}
function fetch_allocation_data(){
    const user_data = {
        userid : document.getElementById('UserId').innerText,
        departmentId : document.getElementById('department-selection').value
    };
    document.getElementById('shift-form').style.display = "none";
    console.log(user_data);
    loadScript("/admin/allocation/shift-allocation.js");
    loadScript("/admin/results/randomizer/shifts-view.js")
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

function fetch_result_data(){
    home_reset();
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
        shiftId : document.getElementById('shift-selection').value,
    };
    console.log(user_data);
    if(!verify_path(user_data)){
        return;
    }
    else{
        loadScript("/admin/results/randomized-results/results.js",()=>{
            console.log("Script Loaded ");
        })
        fetch('/admin/results/randomized-results/fetch-result.php', {
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
    document.getElementById('request-table').innerHTML = "";
    document.getElementById('department-selection-result').value = "";
    document.getElementById('shift-selection').value = "";
    document.getElementById('shift-form').style.display = "none";
    document.getElementById('department-selection').value = "";
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

function loadPageAndScripts(pageUrl, callback) {
    // Fetch the page
    fetch(pageUrl)
        .then(response => response.text())
        .then(pageData => {
            var parser = new DOMParser();
            var doc = parser.parseFromString(pageData, 'text/html');

            var scriptTags = doc.querySelectorAll('script[src]');
            var scriptsLoaded = 0;
            function scriptLoaded() {
                scriptsLoaded++;
                if (scriptsLoaded === scriptTags.length && callback) {
                    callback();
                }
            }

            scriptTags.forEach(function(scriptTag) {
                var script = document.createElement('script');
                script.src = scriptTag.src;
                script.onload = scriptLoaded;
                document.head.appendChild(script);
            });
        });
}

function settingsinit(){
    home_reset();
    Swal.fire({
        title : 'Loading...',
        html : '<img src="/loading-gif.gif">',
        showConfirmButton : false,
        allowOutsideClick : false,
        allowEscapeKey : false,
        allowEnterKey : false,
        didOpen : () => {
            Swal.showLoading();
        }
    });
    loadScript('/admin/settings/settings.js',()=>{
        console.log("Settings Enabled");
        remove_script('/admin/results/randomized-results/results.js');
        remove_script('/admin/results/randomizer/shifts-view.js');
        adminSettings();
    });
    loadPageAndScripts('/admin/settings/settings.html', ()=>{
        console.log("Loaded");
    })
    icons_path = ['/font-awesome-icons/webfonts/fa-solid-900.woff2'];
        var iconPromise = icons_path.map(icon =>{
            var font = new FontFace('FontAwesome', `url(${icon})`);
            return font.load();
        });
        Promise.all(iconPromise).then(()=>{
                Swal.close();
    });
}
