function validate(){
    sessionStorage.clear();
    const credentials = {
        userid : document.getElementById('username').value,
        passkey : document.getElementById('passkey').value
    };
    console.log(credentials);

    fetch('/login/login-verify.php',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(credentials)
    }).then(response => {
        if(!response.ok){
            console.error("Internal Server Occured");
        }
        return response.json();
    }).then(data => {
        console.log(data); 
        if(data.url === 'Invalid Credentials'){ 
            Swal.fire({
                icon : 'error',
                title : 'Invalid Credentials',
                text : 'Please enter valid credentials'
            }).then(() => {
                document.getElementById('username').value = '';
                document.getElementById('passkey').value = '';
            });
        }
        else if(data.url === 'Illegal Service'){
            Swal.fire({
                icon : 'error',//i want to use emoji here

                title : '🚫 Dont Hack me Please 🥹🥹🙏🏻 ',
                text : 'Malicious User Detected '
            }).then(() => {
                document.getElementById('username').value = '';
                document.getElementById('passkey').value = '';
            });
        }
        else if(data.url){
            const user_data = {
                userid : data.userid
            };
            fetch(data.url, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(user_data)
            })
            .then(response => {
                if(!response.ok){
                    console.error("Internal Server Error 404 - Home");
                }
                return response.text();
            }).then(page_date => {
                document.documentElement.innerHTML = page_date;
                loadPageAndScripts(data.url,()=>{
                    console.log("Script Loaded"); 
                });
                history.replaceState({}, null, data.url);
                sessionStorage.setItem('userid',data.userid);
                sessionStorage.setItem('role',data.role);
            })
        }
    })
    return false;
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

function replaceUrl(value,callback) {
    var currentUrl = "http://airport.mamatha.ac.in/"+value;
    history.replaceState({}, null, currentUrl);
    console.log(currentUrl);
    if (callback) {
        callback();
    }
}
