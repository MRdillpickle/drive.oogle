home = document.getElementById("app-files");
const cm = document.querySelector(".custom-cm");
const cm_open = document.querySelector("#openbutton");
objectName = "";
objectType = "";

function preview(object) {
    objectName = object.innerHTML;
    objectType = objectName.split(".").slice(1).join(".");
    document.getElementById("fileName").innerHTML = "Name: " + objectName;
    document.getElementById("fileType").innerHTML = "Type: " + objectType;
    if (objectType == "doc") {
        document.getElementById("fileImg").src = "iconTEXT.png";
    } else if (objectType == "html") {
        document.getElementById("fileImg").src = "iconHTML.png";
    }
    document.getElementById("open").style.display = "block";
    document.getElementById("open").disabled = false;
    document.getElementById("open").style.cursor = "pointer";
    document.getElementById("delete").style.display = "block";
    document.getElementById("delete").disabled = false;
    document.getElementById("delete").style.cursor = "pointer";
    document.getElementById("downL").disabled = false;
    document.getElementById("downL").style.cursor = "pointer";
}

function delFile() {
    localStorage.removeItem(objectName);
    window.location = "";
}

function openFile() {
    localStorage.setItem("system_href", objectName);
    redirect(document.getElementById("fileName"));
}

function loadFiles() {
    files = [];
    for (var i = 0; i < localStorage.length; i++) {
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
    } else if (fileType == "doc") {
        window.location = "documents.html";
    } else {
        console.error("." + fileType + " is not a file type that oogle drive will accept");
    }
}

function removeAd() {
    ad = document.getElementById("advert");
    ad.style.display = 'none';
}

function showAd() {
    ad = document.getElementById("advert");
    ad.style.display = 'block';
    img = document.getElementById("adImg");
    text = document.getElementById("text");
    images = ["https://img.izismile.com/img/img12/20190503/640/these_knock_off_brands_are_almost_there_640_high_01.jpg", "https://www.dumpaday.com/wp-content/uploads/2020/02/Giggle-08-600x531-1.jpg", "https://www.awesomeinventions.com/wp-content/uploads/2017/09/Copies-Of-Famous-Brands-facefood.jpg", "http://theendearingdesigner.com/wp-content/uploads/2015/08/Hilarious-Funny-Knock-Off-Imitation-Brands.jpg", "https://cdn.mutually.com/wp-content/uploads/2017/07/10-53.jpg", "https://www.cowcotland.com/images/news/2008/02/itoilet.jpg", "https://www.dumpaday.com/wp-content/uploads/2018/03/off-brands-1.jpg"];
    texts = ["Try our new tasty <i> Legs!</i>", "Twin stores in your area!!! visit on the day of 9/11 (<i>9/11</i> totaly not a knockoff)", "Hungry? Try <i>FACE FOOD</i>", "<i>MICHAELSOFT Binbows</i>, get a compooper <br> for as cheap as a doallar", "Beauty at it's best", "The new way to use the loo, <i>Itoilet</i>. Think Diffrent", "<i>0.01% OFF!</i> Obama's Fried Chicken"];
    random = Math.floor(Math.random() * images.length);
    img.src = images[random];
    text.innerHTML = texts[random];

}

if (Math.floor(Math.random() * 10) == 1) {
    showAd();
}


setInterval(showAd, 60000);

function download() {
    const data = localStorage.getItem(objectName);
    const blob = new Blob([data], { type: objectType });

    const href = URL.createObjectURL(blob);

    const a = Object.assign(document.createElement("a"), {
        href,
        style: "display:none",
        download: `OogleDriveDownload.${objectType}`,
    });
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(href);
}

