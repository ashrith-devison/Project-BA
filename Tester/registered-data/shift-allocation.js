

function relocate(department){
    Swal.fire({
        title: 'Select Shift for <br> Testing',
        icon: 'question',
        showConfirmButton: true,
        confirmButtonText : "Confirm",
        html : `<select id='shift-select-allocation' class="form-control">
        <option value=''>SHIFT</option>
        <option value='S1'>Shift - 1</option>
        <option value='S2'>Shift - 2</option>
        <option value='S3'>Shift - 3</option>
        <option value='GEN'>General</option>
        </select>`,
      }).then( (result) => {
        if(result.isConfirmed){
            data = {
                dept : department,
                shift : document.getElementById('shift-select-allocation').value,
            };
            console.log(data);
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
            })
            fetch('/Tester/registered-data/test-entry.php', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(data)
            }).then(response => {
                if(!response.ok){
                    console.error("Internal Server Error");
                }
                return response.text()
            }).then(data =>{
                document.getElementById('request-table').innerHTML = data;
                icons_path = ['/font-awesome-icons/webfonts/fa-solid-900.woff2'];
                var iconPromise = icons_path.map(icon =>{
                    var font = new FontFace('FontAwesome', `url(${icon})`);
                    return font.load();
                });
                Promise.all(iconPromise).then(()=>{
                        Swal.close();
                })
            })
        }
    })
}

function resultEntry(empid,testid,status,remark){
    sessionStorage.setItem('status-count',0);
    console.log(testid,empid);
    fetch('/Tester/registered-data/entry-form.html')
    .then(response => {
        if(!response.ok){
            console.error("Internal Server Error");
        }
        return response.text()
    }).then(data =>{
        document.getElementById('spotlight').style.display = "block";
        document.getElementById('spotlight').innerHTML = data;
        document.getElementById('emp-id').value = empid;
        document.getElementById('test-id').value = testid;
        if(status === 'Rejected'){
            $('#remarks-display').html('<h4 style="text-align:center;">Remark : '+remark+'<h4>');
            $('#remarks').val('');
        }
        $('#entry-status').html(status);
    })
}

function statusChange(){
    const entryCount = parseInt(sessionStorage.getItem('status-count'));
    var percent = document.getElementById('test-percent').value;
    percent = parseFloat(percent);
    var status =$('#entry-status').html();
    if(percent === 0.00000 && entryCount === 0){
        status = 'Approved';
        $('#remarks-div').hide();
    }
    else if(percent > 0 && percent <= 100 && entryCount < 1){
        if(status === 'Positive'){
            status = 'Rejected';
            sessionStorage.setItem('status-count',entryCount+1);
        }
        else if(status === 'Pending'){
            status = 'Positive';
            sessionStorage.setItem('status-count',entryCount+1);
        }
        else if(status === 'Approved'){
            Swal.fire({
                title : 'Multiple Attempts Not Allowed, Retry Again',
                icon : 'error',
                timer : 15000
            }).then(()=>{
                $('#spotlight').html('');
            });
        }

        $('#remarks-div').show();
    }
    else{
        status='Invalid Data'
        Swal.fire({
            title : 'Multiple Changes Not Allowed, Retry Again',
            icon : 'error',
            timer : 15000
        }).then(()=>{
            $('#spotlight').html('');
        });
    }
    document.getElementById('entry-status').innerHTML = status;
    return status;
}

function updateStatus(){

    const credentials = {
        empid : document.getElementById('emp-id').value,
        status : $('#entry-status').html(),
        percent : document.getElementById('test-percent').value,
        device : document.getElementById('device-no').value,
        tester : document.getElementById('tester-name').value,
        testid : document.getElementById('test-id').value,
        remarks : $('#remarks').val()
    };
    var inputStatus = 0;
    for (var key in credentials) {
        if ((credentials[key] === null || credentials[key] === '') && key != 'remarks') {
            inputStatus = 1;
            console.log(key);
            break;
        }
    }

    if(inputStatus || credentials.status === 'Invalid Data'){
        Swal.fire({
            title:'Please Fill all Fields Properly',
            icon : 'warning',
            showConfirmButton : false,
            timer : 15000
        });
        console.log(credentials);
        return;
    }
    console.log(credentials);
    fetch('/Tester/registered-data/update-status.php', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(credentials)
    }).then(response => {
        if(!response.ok){
            console.error("Internal Server Error");
        }
        return response.text()
    }).then(data =>{
        Swal.fire({
            title: data,
            icon: 'success',
            showConfirmButton: false,
            timer: 15000
        }).then(()=>{
            document.getElementById('spotlight').innerHTML = "";
            document.getElementById('spotlight').style.display = "none";
            fetch_registered_data();
        })
    })
}

function closeForm(){
    $('#spotlight').html('');
}