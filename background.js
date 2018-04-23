function onError(e) {
    console.error(e);
}

var defaultSettings = {
    magnitude: 7,
    fontSize: 30,
    text: "[INTENSIFY]",
    textOptions: "radioNone",
    resizeImage: true,
    maxImageSize: 800
};

function checkStoredSettings(storedSettings) {
    if (!storedSettings.since || !storedSettings.dataTypes) {
        browser.storage.local.set(defaultSettings);
    }
}

function save_image_to_local_storage(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    
    xhr.addEventListener("load", function () {
        if (xhr.readyState == 4 && xhr.status === 200) {
            var fileReader = new FileReader();
            fileReader.onload = function (evt) {
                localStorage.image = evt.target.result;
                callback();
            };
            fileReader.readAsDataURL(xhr.response);
        } else {
            console.log("unable to load file");
        }
    });
    xhr.addEventListener("error", function () {
        console.log("The server didn't serve us the file");
    });
    xhr.send();
}


const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(checkStoredSettings, onError);

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "intensify") {
        save_image_to_local_storage(info.srcUrl, () => {
            const page_url = "/page/intensify.html"
            let tabId = sessionStorage.getItem('tabId');
            if (!tabId) tabId = browser.tabs.TAB_ID_NONE;
            browser.tabs.update(parseInt(tabId, 10), {
                active: true,
                "url": page_url
            }).then(undefined, () => {
                browser.tabs.create({
                    "url": page_url
                }, (tab) => {
                    sessionStorage.setItem('tabId', tab.id);
                });
            });
        });
    }
});

browser.contextMenus.create({
    id: "intensify",
    title: "Intensify!", //browser.i18n.getMessage("menuItemIntensify"),
    contexts: ["image"]
});
