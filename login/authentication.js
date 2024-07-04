
// Description: This file contains the authentication logic for the login page.
$(()=>{
    user_role = sessionStorage.getItem('role');
auth_roles = ['HOD_1','HOD_2','HOD_3','HOD_4','HOD_5','admin'];
var access = 1;
for(var role in auth_roles){
    if(user_role === auth_roles[role]){
        var roleIndex = auth_roles.indexOf(auth_roles[role]);
        const dept = roleIndex + 1;
        console.log(roleIndex);
        if(roleIndex === 5){
            console.log("Admin Login");
            Swal.fire({
                icon : 'success',
                title : 'Admin Login',  
                showConfirmButton : false,
                timer : 2000
            });
        }
        // else if(roleIndex === 0){
        //     $('#department-selection option').each( function(){
        //         if($(this).val() != 1 && $(this).val() != 3 && $(this).val() != 4){
        //             $(this).prop('disabled',true);
        //             $(this).hide();
        //         } else{
        //             $(this).prop('disabled',false);
        //             $(this).show();
        //         }
        //     });

        //     $('#results-view-home').prop('disabled',true);

        // }
        else{
            $('#department-selection option').each(function(){
                if($(this).val() != dept){
                    $(this).prop('disabled', true);
                    $(this).hide();
                } else{
                    $(this).prop('disabled', false);
                    $(this).show();
                }
            });
            $('#user-profile-dropdown').prop('disabled',true);
            $('#user-profile-dropdown').hide();
            $('#department-selection').val("");

            Swal.fire({
                icon : 'success',
                title : 'HOD Login',
                showConfirmButton : false,
                timer : 2000
            })
        }
        access = 0;
    }
}

if(access){
    Swal.fire({
        icon : 'warning',
        title : 'Invalid Login',
        html : '<h4><b>Please Login Using Valid Credentials</b></h4>',
        showConfirmButton : false,
        timer : 20000
    }).then(data =>{
        window.location.href = '/UserLogin.html';
    })
    
}
})


function dummy(){
    Swal.fire({
        icon : 'error',
        title : 'This Feature is currently Under Development'
    });
}