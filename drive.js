home = document.getElementById("app-files");
const cm = document.querySelector(".custom-cm");
const cm_open = document.querySelector("#openbutton");
objectName = "";

function preview(object) {
    objectName = object.innerHTML;
    objectType = objectName.split(".").slice(1).join(".");
    document.getElementById("fileName").innerHTML = "Name: " + objectName;
    document.getElementById("fileType").innerHTML = "Type: " + objectType;
    if (objectType == "doc") {
        document.getElementById("fileImg").src = "iconTEXT.png";
    }else if(objectType == "html") {
        document.getElementById("fileImg").src = "iconHTML.png";
    }
    document.getElementById("open").style.display = "block";
    document.getElementById("open").disabled = false;
    document.getElementById("open").style.cursor = "pointer";
}

function openFile() {
    localStorage.setItem("system_href", objectName);
    redirect(document.getElementById("fileName"));
}

function loadFiles() {
    files = [];
    for (var i = 0; i<localStorage.length; i++) {
        files[i] = localStorage.getItem(localStorage.key(i));
        fileName = localStorage.key(i);
        canAppar = fileName.split(".").slice(1).join(".");
        if (canAppar) {
            newButton = `<button class="file" onclick="preview(this);" ondblclick="localStorage.setItem('system_href', '${fileName}'); redirect(this);">${fileName}</button>`;
            home.innerHTML += newButton;
        }
    }
}
loadFiles();

function redirect(location) {
    fileType = location.innerText.split(".").slice(1).join(".");
    if (fileType == "html") {
        window.location = "scripts.html";
    }else if (fileType == "doc") {
        window.location = "documents.html";
    }else {
        console.error("." + fileType + " is not a file type that oogle drive will accept");
    }
}