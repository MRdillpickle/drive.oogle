//Oogle apps script. this is part of Picklesoft Tecs

//   __        __ . |      __
//  /  \   _  /  \| |     /  \
//  |  |  / \ \__/| |     |__|
//  \__/  \_/  ___/ |___  \__,

autosave = false;
logger = document.getElementById("print");


function processFiles(files) {
    var file = files[0];

    var reader = new FileReader();

    reader.onload = function (e) {
        // When this event firest, the data is ready.
        // Copy it to a <div> on the page.
        var output = document.getElementById("edietedHTML");
        output.textContent = e.target.result;
    };
    reader.readAsText(file);
}

function showFileInput() {
    var fileInput = document.getElementById("fileInput");
    fileInput.click();
}

//Print data to user output
function printData(targetText) {
    logger = document.getElementById("print");
    logger.value += " ~ " + targetText + " \n";
}

//toggle the autosave key
function autosaveToggle() {
    element = document.getElementById("autosaveToggler");
    if (autosave == false) {
        autosave = true
        element.style.background = "green";
    } else {
        autosave = false;
        element.style.background = "#434368";
    }
    console.log("Autosave is: " + autosave);
    printData("Autosave is now " + autosave);
}


//Delete the users script from localstorage
function unload() {
    localStorage.removeItem(document.getElementById("title").value + ".html");
    console.log("deleted!");
    printData("Deleted file named " + document.getElementById("title").value + ".html");
}


//Save The User's Script To Localstorage
function save() {
    title = document.getElementById("title").value;
    fileType = title.split(".").slice(1).join(".");
    if (typeof fileType == "undefined" || fileType == null) {
        printData("Can't save " + document.getElementById('title').value + " as the title contains a period '.'");

    } else {
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

    code.value = localStorage.getItem(title.value + ".html");

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
    if (fileName != "" && fileName != null && fileName != "null") {
        title = document.getElementById("title");

        title.value = fileName;

        lengthOfFile = fileName.length
        fileType = title.value.slice(0, lengthOfFile - 5);
        title.value = fileType;
        console.log(fileType, lengthOfFile);

        code.value = localStorage.getItem(fileName);

        localStorage.setItem("system_href", null);
    } else {
        code.innerHTML = "";
    }


}

//get time and print to output
function timeNow() {
    var d = new Date(),
        h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
        m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    return h + ':' + m;
}

function clearLogger() {
    logger = document.getElementById("print");
    logger.value = "";
    printData("Deleted content at " + timeNow());
}

//Keybinds for user
document.onkeyup = function (e) {
    if (e.altKey && e.key == "r") {
        start();
    }
    if (e.altKey && e.key == "Delete") {
        clearLogger();
    }
};