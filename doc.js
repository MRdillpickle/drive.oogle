autosave = false

function print(text) {
    document.getElementById("print").innerHTML = text;
}

//Process files
function processFiles(files) {
    var file = files[0];
    
    var reader = new FileReader();
  
    reader.onload = function (e) {
      var output = document.getElementById("edietedHTML");   
      output.innerText = e.target.result;
    };
    reader.readAsText(file);
    print("Uploaded File");
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
        print("Autosave Enabled");
    }else {
        autosave = false;
        element.style.background = "whitesmoke";
        print("Autosave Disabled");
    }
}

//save current text
function save() {
    title = document.getElementById("title").value;
    if (title != "") {
    fileType = title.split(".").slice(1).join(".");
    if (fileType == null || fileType == ".") {
        console.warn("can't save data as the filename has a '.'!");
        print("Filename contains a period!");
    }else{
        code = document.getElementById("edietedHTML").innerHTML;
        console.log("Attempt Save...");
        localStorage.setItem(title + ".doc", code);
        console.info(`Just saved as ${title}.doc`);
        print(`Just saved as ${title}.doc`);
        document.querySelector("#print-title").innerHTML = "Oogle Documents: " + title;
    }
}
}

//load the content
function load() {
    title = document.getElementById("title");
    code = document.getElementById("edietedHTML");
    print("Loaded Document");
    code.innerHTML = localStorage.getItem(title.value + ".doc");
    document.querySelector("#print-title").innerHTML = "Oogle Documents: " + title.value;
}

//delete file
function unload() {
    localStorage.removeItem(document.getElementById("title").value + ".doc");
    console.log("deleted!");
    print(`Deleted ${document.getElementById("title").innerHTML}.doc`);
}

//preload file if it's redirected from the drive
function preloadFile() {
    fileName = localStorage.getItem("system_href");
    code = document.getElementById("edietedHTML");
    if (fileName != "" && fileName != null && fileName != "null") {
        title = document.getElementById("title");
        
        title.value = fileName;

        lengthOfFile = fileName.length
        fileType = title.value.slice(0, lengthOfFile - 4);
        title.value = fileType;
        console.log(fileType, lengthOfFile);

        code.innerHTML = localStorage.getItem(fileName);
        print("opened file");
        
        localStorage.setItem("system_href", null);
        document.querySelector("#print-title").innerHTML = "Oogle Documents: " + fileName;
    }else{
      code.innerHTML = "Type A Document...";  
    }
}

//setup or unsetup the printDisplay
function printSetup(targetValue) {
    menu_bar = document.querySelector("#menu-bar");
    doc_title = document.querySelector("#document-title");
    user_title = document.querySelector("#title");
    doc_title.innerHTML = "Oogle Documents: " + user_title.value;
    if (targetValue == true) {
        //the user wishes to print the document
        menu_bar.style.display = 'none';
        doc_title.style.display = 'block';
    }else if(targetValue == false) {
        //the user cancles the print or finished print
        menu_bar.style.display = 'block';
        doc_title.style.display = 'none';
    }else{
        //targetValue isn't valid
        console.warn(`'${targetValue}' isn't a propper value for printSetup function!`);
        menu_bar.style.display = 'block';
        doc_title.style.display = 'none';
    }
}