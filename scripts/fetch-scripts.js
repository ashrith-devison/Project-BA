// Author:
//  J Ashrith Sai
//  Date of creation: 7/02/2024
function executeScripts(id,Request,callback) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = Request.content;
    const scriptLinks = tempDiv.querySelectorAll('script[src]');
    scriptLinks.forEach(script => {
        const scriptElement = document.createElement('script');
        scriptElement.src = script.getAttribute('src');
        document.head.appendChild(scriptElement);
    })
    document.getElementById(id).innerHTML = tempDiv.innerHTML;
    tempDiv.remove();
    if(callback){
        callback();
    }
    return false;
}

function pageRequest(RequestName, RequestUrl,RequestElementId,callback){
    fetch(RequestUrl)
    .then(response =>{
        if(!response.ok){
            console.error("Error in Page Loading");
        }
        return response.text();
    }).then(data => {
        const Request = {
            userid : document.getElementById('user-id').innerText,
            RequestName : RequestName,
            RequestUrl : RequestUrl,
            content : data
        };
        return Request;
    }).then(Request_file => {
        console.log(Request_file);
        executeScripts(RequestElementId, Request_file,callback);
    });
    return false;
}

function phpCall(RequestName, RequestUrl,RequestElementId, callback){
    const request = {
        userid : document.getElementById('user-id').innerText,
        RequestName: RequestName
    };
    fetch(RequestUrl, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(request)
    })
    .then(response => {
        if(!response.ok){
            console.error("Error in Page Loading");
        }
        return response.text();
    }). then( data => {
        document.getElementById(RequestElementId).innerHTML = data;
    });

    if(callback){
        callback();
    }
}

function remove_script(scriptid){
    var script = document.querySelector('script[src="'+scriptid+'"]');
    if(script){
        script.remove();
        console.log("Removed");
    }
    else{
        console.log("No conflicts ..");
    }
}