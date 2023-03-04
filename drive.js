home = document.getElementById("app-files");

function loadFiles() {
    files = [];
    for (var i = 0; i<localStorage.length; i++) {
        files[i] = localStorage.getItem(localStorage.key(i));
        fileName = localStorage.key(i);
        if (fileName != "system_href") {
            newButton = `<button class="file" onclick="localStorage.setItem('system_href', '${fileName}'); redirect(this);"> ${fileName}</button>`;
            home.innerHTML += newButton;
        }
    }
}
loadFiles();

function redirect(location) {
    fileType = location.innerText.split(".").slice(1).join(".");
    console.log(fileType);
    if (fileType == "html") {
        window.location = "scripts.html";
    }else if (fileType == "doc") {
        window.location = "documents.html";
    }
}