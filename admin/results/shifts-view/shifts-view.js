// Author:
//  J Ashrith Sai
//  Date of creation: 09/07/2024

function display(){
    const dept = document.getElementById('department-selection').value;
    const shiftId = document.getElementById('shift-selection').value;

    const data = {
        dept : dept,
        shift : shiftId
    };

    console.log(data);
    fetch('shifts-data.php', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(data)
    }).then(response => {
        if(!response.ok){
            console.error("Internal Server Occurred");
        }
        return response.text();
    }).then(data => {
        document.getElementById('requested-data').innerHTML = data;
    });
}
