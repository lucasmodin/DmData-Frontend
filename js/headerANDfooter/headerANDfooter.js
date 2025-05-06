document.addEventListener("DOMContentLoaded", script)

function script(){
    loadComponent("headerANDfooter/header.html", "header-container", function (){loadNavLogic})

}

function loadComponent(url, containerID, callback){
    fetch(url)
        .then(response => response.text())
        .then(data =>{document.getElementById(containerID).innerHTML = data;
        if (callback){
            callback();
        }
        })
        .catch(error => console.log("error in loading" + url))
}

function loadNavLogic(){
    console.log("it should be working")
}