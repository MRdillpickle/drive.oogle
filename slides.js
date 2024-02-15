const slide = document.getElementById("slide");
let focusingElement = null
let lastFocus = null
let movingElement = false
let ctrl = false
let currentSlide = 0
slides = [
    []
]

function addSlide(num) {
    if (num) {
        document.getElementById('select').innerHTML += "<div onclick='goto(" + num + ")' class='mini-slide'>Slide " + num + "</div>";
        slides[num] = [];
    }else{
        document.getElementById('select').innerHTML += "<div onclick='goto(" + slides.length + ")' class='mini-slide'>Slide " + slides.length + "</div>";
    slides[slides.length] = [];
    }
}
window.addEventListener("DOMContentLoaded", function() {
    filetoLoad = localStorage.getItem("system_href");
    if (filetoLoad) {
        load(filetoLoad);
        fileType = filetoLoad.split(".");
        document.getElementById("title").value = fileType[0];
    }
});
function goto(index) {
    currentSlide = index;
    slide.innerHTML = "";
    newSlidedata = slides[index];
    if (newSlidedata) {
        Object.entries(newSlidedata).forEach((entry) => {
            if (entry) {
                try {
                    const [key, value] = entry;
                    if (value[4] != undefined) {
                        if (value[0] == "text") {
                            add("text", value[4], [value[3], value[2]], value[1]);
                        }
                        if (value[0] == "img") {
                            add("img", value[4], [value[3], value[2]], value[1]);
                        }
                    }
                } catch (error) {
                    console.info("An error occoured");
                }
            }
        });
    }
}
function printData(data) {
    document.getElementById("notif").innerHTML = data;
    document.getElementById("notif").style.opacity = "1"
    document.getElementById("notif").style.animationName = "notif";
    document.getElementById("notif").style.bottom = "5px";
}
function hideNotif() {
    if (document.getElementById("notif").style.animationName == "notif") {
        document.getElementById("notif").style.animationName = "";
        document.getElementById("notif").style.opacity = "0";
        document.getElementById("notif").style.bottom = "-11%";
    }
}
function add(item, coolId, pos, specal) {
    x = "50%";
    y = "50%";
    if (!coolId && !pos) {
        time = Date.now();
        time = time / 5;
    } else {
        time = coolId;
    }
    if (pos) {
        x = pos[0];
        y = pos[1];
    }
    if (item == "text") {
        content = "Add text";
        if (specal) {
            content = specal;
            slide.innerHTML += "<span id='" + time + "'onpointerenter='showCtrl();' onpointerleave='hideCtrl();' onpointerdown='focusElement(this, `text`);' class='text' style='position: fixed; top: " + y + "; left: " + x + ";'>"+ content +"</span>";
        }else{
            slide.innerHTML += "<span id='" + time + "'onpointerenter='showCtrl();' onpointerleave='hideCtrl();' onpointerdown='focusElement(this, `text`);' class='text' style='position: fixed; top: " + y + "; left: " + x + ";'><span contenteditable style='color: black; font-size: 30px' onkeydown='saveText(this);'>" + content + "</span></span>";
        }
        
        if (!coolId && !pos) {
            slides[currentSlide]["text" + time] = ["text", content, y, x, time];
        }
    }
    if (item == "img") {
        content = "iconUNKNOWN.png";
        if (specal) {
            content = specal;
        }
        slide.innerHTML += "<img id='" + time + "' draggable='false' src='" + content + "' onpointerenter='showCtrl();' onpointerleave='hideCtrl();' onpointerdown='focusElement(this, `text`);' style='position: fixed; top: " + y + "; left: " + x + "; width: 50px;' class='text'>";
        if (!coolId && !pos) {
            slides[currentSlide]["image" + time] = ["img", content, y, x, time];
        }
    }
}
function showCtrl() {
    document.getElementById("ctrl").style.opacity = "1";
}
function hideCtrl(){
    document.getElementById("ctrl").style.opacity = "0";
}
function saveText(element) {
    slides[currentSlide]["text" + element.id] = ["text", element.parentElement.innerHTML, element.parentElement.style.top, element.parentElement.style.left, element.id];
}
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey) {
        ctrl = true
        document.getElementById("ctrl").style.height = "150px";
    } else {
        ctrl = false
    }
})
function save() {
    title = document.getElementById("title").value;
    fileType = title.split(".").slice(1).join(".");
    if (fileType) {
        console.error("NO PERIOD");
        printData("File contains a period <br> Data can't save");
    } else {
        work = slides;
        code = JSON.stringify(work);
        pollyfill = []
        for (var i = 0; i < slides.length; i++) {
            Object.keys(slides[i]).forEach(function (key) {
                value = slides[i][key]
                pollyfill[pollyfill.length] = [value[0], value[1], value[2], value[3], value[4], i]
            });
        }
        localStorage.setItem(title + ".ppt", JSON.stringify(pollyfill));
        console.info(`Just saved as ${title}.ppt!`, JSON.stringify(pollyfill), work);
        printData(`Saved file as ${title}.ppt!`);
    }
}
function textbox(element) {
        var ctl = element;
        var startPos = ctl.selectionStart;
        var endPos = ctl.selectionEnd;
        return startPos, endPos
}
function load(filename) {
    slides = [
        []
    ]
    file = JSON.parse(localStorage.getItem(filename));
    for (var i = 0; i < file.length; i = i + 1) {
        elementToMake = file[i];
        slideIndex = elementToMake[5];
        slidetoPut = slides[slideIndex];
        document.getElementById('select').innerHTML = "<div onclick='goto(0)' class='mini-slide'>Slide 0</div>";
        addSlide(i);
        if (elementToMake[0] == "text") {
            slidetoPut["text" + elementToMake[4]] = [elementToMake[0], elementToMake[1], elementToMake[2], elementToMake[3], elementToMake[4]];
        }
        if (elementToMake[0] == "img") {
            slidetoPut["image" + elementToMake[4]] = [elementToMake[0], elementToMake[1], elementToMake[2], elementToMake[3], elementToMake[4]]
        }
        goto(0);
        
    }
    printData("Objects loaded!")
}
function exit() {
    localStorage.removeItem("system_href");
    window.location = "index.html";
    printData("Exiting... <br> (Did you rember to save?)");
}
function read() {
    window.location = "slides.txt";
}
document.addEventListener("keyup", function (event) {
    if (event.ctrlKey) {
        ctrl = true
        document.getElementById("ctrl").style.height = "50px";
    } else {
        ctrl = false
        document.getElementById("ctrl").style.height = "50px";
    }
    if ((event.key == "Delete" || event.key == "Backspace") && ctrl) {
        if (focusingElement) {
            tag = null;
            content = null
            id = focusingElement.id;
            if (focusingElement.tagName == "IMG") {
                tag = "image";
                content = focusingElement.src;
            } else {
                tag = "text";
                content = focusingElement.innerHTML;
            }
            finalValue = [tag, content, focusingElement.style.top, focusingElement.style.left, id * 1];
            Object.keys(slides[currentSlide]).forEach(function (key) {
                if (key == tag + id) {
                    delete slides[currentSlide][key];
                    printData("Deleted: " + content);
                    focusingElement.remove();
                }
            });
        }
    }
})
function focusElement(element, type) {

    lastFocus = focusingElement;

    focusingElement = element
    if (ctrl) {
        move(element);
    }
    focusingElement.style.border = "2px solid blue";
    if (lastFocus != focusingElement) {
        lastFocus.style.border = "0px solid blue";
    }
    if (type == "img") {
        document.getElementById('edit').disabled = false
    } else {
        document.getElementById('edit').disabled = false
    }
}
function edit() {
    if (focusingElement.tagName == "IMG") {
        document.getElementById("editPopup").style.display = "block";
        document.getElementById("edit-image").style.display = "block";
        document.getElementById("edit-text").style.display = "none";
    }else{
        document.getElementById("editPopup").style.display = "block";
        document.getElementById("edit-image").style.display = "none";
        document.getElementById("edit-text").style.display = "block";
    }
    document.getElementById("editPopup").style.animationName = "zoom";
}
function closeEdit() {
    if (focusingElement.tagName == "IMG") {
        document.getElementById("editPopup").style.display = "none";
        newSrc = document.getElementById("imageUrl").value;
        focusingElement.src = newSrc;
        slides[currentSlide]["image" + focusingElement.id] = ["img", focusingElement.src, focusingElement.style.top, focusingElement.style.left, focusingElement.id];
    }else{
        document.getElementById("editPopup").style.display = "none";
        newColour = document.getElementById("textColour").value;
        newSize = document.getElementById("textSize").value;
        focusingElement.querySelector("span").style.fontSize = newSize + "px";
        focusingElement.querySelector("span").style.color = newColour;
    }
    document.getElementById("editPopup").style.animationName = "";
}
function move(element) {
    focusingElement.style.border = "2px solid blue";
    movingElement = true;
    document.addEventListener("pointermove", function (event) {
        if (movingElement == true && element == focusingElement) {
            element.style.top = `${(event.pageY / window.innerHeight) * 100}%`;
            element.style.left = `${(event.pageX / window.innerWidth) * 100}%`;
        }
    })
    document.addEventListener("pointerup", function (event) {
        if (movingElement == true && element == focusingElement) {
            movingElement = false
            console.log(element.tagName);
            console.log((event.pageY / window.innerHeight) * 10)
            element.style.top = `${(event.pageY / window.innerHeight) * 100}%`;
            element.style.left = `${(event.pageX / window.innerWidth) * 100}%`;
            if (element.tagName == "IMG") {
                slides[currentSlide]["image" + element.id] = ["img", element.src, element.style.top, element.style.left, element.id];
            } else {
                slides[currentSlide]["text" + element.id] = ["text", element.innerHTML, element.style.top, element.style.left, element.id];
            }
        }
    })
}
