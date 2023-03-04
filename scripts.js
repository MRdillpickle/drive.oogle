//Oogle apps script. this is part of Picklesoft Tecs

//   __        __ . |      __
//  /  \   _  /  \| |     /  \
//  |  |  / \ \__/| |     |__|
//  \__/  \_/  ___/ |___  \__,

autosave = false;
logger = document.getElementById("print");


//Print data to user output
function printData(targetText){
    logger.value += "\n ~ " + targetText;
}

//toggle the autosave key
function autosaveToggle() {
    element = document.getElementById("autosaveToggler");
    if (autosave == false) {
        autosave = true
        element.style.background = "green";
    }else {
       autosave = false; 
       element.style.background = "#434368";
    }
    console.log("Autosave is: " + autosave);
    printData("Autosave is now " + autosave);
}


//Delete the users script from localstorage
function unload() {
    localStorage.removeItem(document.getElementById("title").innerHTML + ".html");
    console.log("deleted!");
    printData("Deleted file named " + document.getElementById("title").innerHTML + ".html");
}


//Save The User's Script To Localstorage
function save() {
    title = document.getElementById("title").innerHTML;
    fileType = title.split(".").slice(1).join(".");
    if (fileType) {
        printData("Can't save " + document.getElementById('title').innerHTML + " as the title contains a period '.'");
        
    }else{
        code = document.getElementById("edietedHTML").value;
        console.log("Attempt Save...")
        localStorage.setItem(title + ".html", code);
        console.info(`Just saved as ${title}.html`);
        
    }
}

//aqquire the requested code, then print to user's bin
function load() {
    title = document.getElementById("title");
    code = document.getElementById("edietedHTML");

    code.value = localStorage.getItem(title.innerHTML + ".html");
    
}

//allow user to view output of his/her's  code
function start() {
    printData("Running Code");
    let code = document.querySelector("#edietedHTML").value;
    let iframe = document.querySelector("#pageEdietor").contentWindow.document;
    iframe.open();
    iframe.write(`
    <!DOCTYPE html>
    <html>
    <head></head>
    <body>${code}</body>
    </html>
    `);
    iframe.close();
}

//preload document if user was redirected
function preloadFile() {
    fileName = localStorage.getItem("system_href");
    code = document.getElementById("edietedHTML");
    if (fileName != "") {
        title = document.getElementById("title");
        
        title.innerHTML = fileName;

        lengthOfFile = fileName.length
        fileType = title.innerHTML.slice(0, lengthOfFile - 5);
        title.innerText = fileType;
console.log(fileType, lengthOfFile);

        code.value = localStorage.getItem(fileName);
        
        localStorage.setItem("system_href", "");
    }
    code.innerHTML = "";
    
}

//get time and print to output
function timeNow() {
    var d = new Date(),
      h = (d.getHours()<10?'0':'') + d.getHours(),
      m = (d.getMinutes()<10?'0':'') + d.getMinutes();
    return h + ':' + m;
}

//Keybinds for user
document.onkeyup = function(e) {
    if (e.altKey && e.which == 82) {
        start();
    }
  };

document.getElementById("print").value = " ~ Oogle Apps Script Running At: " + timeNow();

preloadFile();
timeNow();