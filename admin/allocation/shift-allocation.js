
function update(element){
    var updateValue = element.value;
    var empId = element.getAttribute('data-id');
    console.log(updateValue+empId);

    const data = {
        empId : empId,
        status : updateValue,
        deptId : document.getElementById('department-selection').value
    };

    fetch('/admin/allocation/update.php', {
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
        console.log(data);
    })
    return false;
}


function relocate(department){
    Swal.fire({
        title: 'Select Shift for <br>Randomization',
        icon: 'question',
        showConfirmButton: true,
        confirmButtonText : "Confirm",
        html : `<select id='shift-select-allocation' class="form-control">
        <option value=''>SHIFT</option>
        <option value='S1'>Shift - I</option>
        <option value='S2'>Shift - II</option>
        <option value='S3'>Shift - III</option>
        <option value='GEN'>General</option>
        </select>`,
      }).then( (result) => {
        if(result.isConfirmed){
            data = {
                dept : department,
                shift : document.getElementById('shift-select-allocation').value,
            };
            console.log(data);
            fetch('/admin/results/shifts-view/shifts-data.php', {
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
                document.getElementById('request-table').innerHTML = data;
                $('#generate-button-randomizer').hide();
                console.log("Not");
            });
        }
    })
}

function print_list() {
    Swal.fire({
        title : 'Printing the List',
        html : '<img src="/loading-gif.gif">',
        showConfirmButton : false,
        allowOutsideClick : false,
        allowEscapeKey : false,
        allowEnterKey : false,
        didOpen : () => {
            Swal.showLoading();
        }
    })
    const content = document.getElementById('alloted-data-randomizer');
    const department = $('#department-selection option:selected').text(); 
    const currentDate = new Date().toISOString().slice(0,10);
    const filename = `${currentDate}_${department}.pdf`; 

    html2canvas(content).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imageWidth = canvas.width;
        const imageHeight = canvas.height;
        const imageRatio = imageWidth / imageHeight;
        const pageRatio = pageWidth / pageHeight;
        let scaledWidth, scaledHeight, xPosition, yPosition;
    
        if (imageRatio > pageRatio) {
            scaledWidth = pageWidth;
            scaledHeight = pageWidth / imageRatio;
            xPosition = 0;
            yPosition = (pageHeight - scaledHeight) / 2; // Center vertically
        } else {
            scaledHeight = pageHeight;
            scaledWidth = pageHeight * imageRatio;
            xPosition = (pageWidth - scaledWidth) / 2; // Center horizontally
            yPosition = 0;
        }
    
        pdf.addImage(imgData, 'PNG', xPosition, yPosition, scaledWidth, scaledHeight);
        pdf.save(filename);
        Swal.close();
    });
    console.log("Printed");
    $('#generate-button-randomizer').show();
}