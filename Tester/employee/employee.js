function fetch_employee_view(){
    const data = {
        userid : document.getElementById('UserId').innerText
    };
    if(!verify_path(data)){
        return;
    }
    else{
        fetch('/Tester/employee/employee-data.php',{
            method : 'POST',
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
