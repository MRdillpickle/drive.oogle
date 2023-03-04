autosave = false

function autosaveToggle() {
    element = document.getElementById("autosaveToggler");
    if (autosave == false) {
        autosave = true;
        element.style.background = "green";
    }else {
        autosave = false;
        element.style.background = "whitesmoke";
    }
}

function save() {
    title = document.getElementById("title").innerHTML;
    fileType = title.split(".").slice(1).join(".");
    if (fileType) {
        console.error("can't save data as the filename has a '.'!");
    }else{
        code = document.getElementById("edietedHTML").value;
        console.log("Attempt Save...");
        localStorage.setItem(title + ".doc", code);
        console.info(`Just saved as ${title}.html`);
        
    }
}

function load() {
    title = document.getElementById("title");
    code = document.getElementById("edietedHTML");

    code.value = localStorage.getItem(title.innerHTML + ".doc");
}

function unload() {
    localStorage.removeItem(document.getElementById("title").innerHTML + ".doc");
    console.log("deleted!");
}

function preloadFile() {
    fileName = localStorage.getItem("system_href");
    code = document.getElementById("edietedHTML");
    if (fileName != "") {
        title = document.getElementById("title");
        
        title.innerHTML = fileName;

        lengthOfFile = fileName.length
        fileType = title.innerHTML.slice(0, lengthOfFile - 4);
        title.innerText = fileType;
console.log(fileType, lengthOfFile);

        code.value = localStorage.getItem(fileName);
        
        localStorage.setItem("system_href", "");
    }
    code.innerHTML = "";
    
}

preloadFile();