$(()=>{
    console.log("Tester Authentication Script Loaded ...");
    auth_role = ['tester'];
    var access = 1;
    for(var role in auth_role){
        if(sessionStorage.getItem('role') === auth_role[role]){
            console.log("Tester Logged In Successfully ...");
            access = 0;
            break;
        }
    }
    if(access){
        console.log("Tester Not Logged In ...");
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