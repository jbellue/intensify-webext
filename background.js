function openMyPage() {
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
}
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

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(checkStoredSettings, onError);

browser.browserAction.onClicked.addListener(openMyPage);
