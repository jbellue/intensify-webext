function updateUI(restoredSettings) {
    function link_range_to_value(range, display) {
        display.innerHTML = range.value;
        range.addEventListener('input', () => display.innerHTML = range.value);
    }
    const font_size_range = document.getElementById("font_range");
    const magnitude_range = document.getElementById("magnitude_range");
    
    magnitude_range.value = restoredSettings.magnitude;
    font_size_range.value = restoredSettings.fontSize;
    document.getElementById("text").value = restoredSettings.text;
    document.getElementById("max_image_size").value = restoredSettings.maxImageSize;
    document.getElementById("text-menu").selectedIndex = restoredSettings.textOptions;

    link_range_to_value(font_size_range, document.getElementById("font_slider_value"));
    link_range_to_value(magnitude_range, document.getElementById("magnitude_slider_value"));
}

function onError(e) {
    console.error(e);
}

function storeSettings() {
    const getMagnitude = () =>    document.getElementById("magnitude_range").value;
    const getFontSize = () =>     document.getElementById("font_range").value;
    const getText = () =>         document.getElementById("text").value;
    const getMaxImageSize = () => document.getElementById("max_image_size").value;
    const getTextOptions = () =>  document.getElementById("text-menu").selectedIndex;
    const magnitude    = getMagnitude();
    const fontSize     = getFontSize();
    const text         = getText();
    const maxImageSize = getMaxImageSize();
    const textOptions  = getTextOptions();
    browser.storage.local.set({
        magnitude,
        fontSize,
        text,
        maxImageSize,
        textOptions
    });
}

const saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", storeSettings);

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(updateUI, onError);