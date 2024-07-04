
function viewResults(empid, testid){
    console.log(empid, testid);
    const user_data = {
        userid : empid,
        testid : testid
    };
    if(!verify_path(user_data)){
        return;
    }
    else{
        console.log(user_data);
        fetch('/admin/results/randomized-results/test-result.php',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(user_data)
        }).then(response => {
            if(!response.ok){
                console.error("Internal Server Error 404 - Result Fetch");
            }
            return response.json();
        }).then(data => {
            fetch('/Tester/registered-data/entry-form.html')
            .then(response => {
                if(!response.ok){
                    console.error("Internal Server Error");
                }
                return response.text()
            }).then(entry_form =>{
                document.getElementById('spotlight').style.display = "none";
                document.getElementById('spotlight').innerHTML = entry_form;
                document.getElementById('emp-id').value = empid;
                document.getElementById('emp-id').disabled = true;
                document.getElementById('test-id').value = testid;

                if(data.status != 'Pending'){
                    document.getElementById('test-percent').value = data.testPercent;
                    document.getElementById('device-no').value = data.deviceNo;
                    document.getElementById('tester-name').value = data.testerName;
                }
                else{
                    document.getElementById('test-percent').value = "No Data Available";
                    document.getElementById('device-no').value = "No Data Available";
                    document.getElementById('tester-name').value = "No Data Available";
                }
                document.getElementById('test-percent').disabled = true;
                document.getElementById('device-no').disabled = true;
                document.getElementById('tester-name').disabled = true;
                $('#remarks').val(data.remarks);
                document.getElementById('remarks').disabled = true; 
                document.getElementById('entry-status').innerHTML =  data.status;
                document.getElementById('spotlight').style.display = "block";

                var entryButton = document.getElementById('entry-form-submit');
                $('#entry-form-submit').hide();
                $('#entry-form-submit').disabled = true;
            });
        })
    }
}

function closeForm(){
    $('#spotlight').html('');
}