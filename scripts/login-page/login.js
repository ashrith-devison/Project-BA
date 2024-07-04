// Author:
//  J Ashrith Sai
//  Date of creation: 4/02/2024
function data(){
    const loginid = document.getElementById('username').value;
    const passkey = document.getElementById('password').value;
    const credentials = {
        loginid : loginid,
        passkey : passkey
    };
    fetch('scripts/login-page/login.php',{
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(response => {
        if(!response.ok){
            alert('Internal Server Error');
        }
        console.log(credentials);
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        }
        else{
            return response.text();
        }
    }).then(data => {
        console.log(data);
        if(typeof data === 'object' && data.redirect){
            console.log(data);
            fetch(data.redirect)
                .then(Role => {
                    if(!Role.ok){
                        alert("404 Page not found");
                    }
                    return Role.text();
            }).then(page => {
                console.log("success in"+data.redirect);
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = page;
                const scriptLinks = tempDiv.querySelectorAll('script[src]');
                scriptLinks.forEach(script => {
                    const scriptElement = document.createElement('script');
                    scriptElement.src = script.getAttribute('src');
                    document.head.appendChild(scriptElement);
                });
                document.body.innerHTML = tempDiv.innerHTML;
                tempDiv.remove();
            });
        }
        else{
            document.documentElement.innerHTML = data;
        }
    })
    return false;
}