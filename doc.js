autosave = false


//Process files
function processFiles(files) {
    var file = files[0];
    
    var reader = new FileReader();
  
    reader.onload = function (e) {
      var output = document.getElementById("edietedHTML");   
      output.textContent = e.target.result;
    };
    reader.readAsText(file);
}

//connect this function to a button for file input
function showFileInput() {
    var fileInput = document.getElementById("fileInput");
    fileInput.click();
}

//toggles the autosave button and change Backgound color to value
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

//save current text
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

//load the content
function load() {
    title = document.getElementById("title");
    code = document.getElementById("edietedHTML");

    code.value = localStorage.getItem(title.innerHTML + ".doc");
}

//delete file
function unload() {
    localStorage.removeItem(document.getElementById("title").innerHTML + ".doc");
    console.log("deleted!");
}

//preload file if it's redirected from the drive
function preloadFile() {
    fileName = localStorage.getItem("system_href");
    code = document.getElementById("edietedHTML");
    if (fileName != "" && fileName != null) {
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

//call the preload function
preloadFile();