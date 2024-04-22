
// Shows a temporary message banner/ribbon for a few seconds, or
// a permanent error message on top of the canvas if type=='error'.
// If type=='warning', a yellow highlight color is used.
// Modify or remove this function to customize the visually presented
// way that non-critical warnings and error messages are presented to the
// user.
function unityShowBanner(msg, type) {
    function updateBannerVisibility() {
        warningBanner.style.display = warningBanner.children.length
            ? "block"
            : "none";
    }
    var div = document.createElement("div");
    div.innerHTML = msg;
    warningBanner.appendChild(div);
    if (type == "error") div.style = "background: red; padding: 10px;";
    else {
        if (type == "warning") div.style = "background: yellow; padding: 10px;";
        setTimeout(function () {
            warningBanner.removeChild(div);
            updateBannerVisibility();
        }, 5000);
    }
    updateBannerVisibility();
}

var buildUrl = "Build";
var loaderUrl = buildUrl + "/Hub.loader.js";
var config = {
    dataUrl: buildUrl + "/Hub.data",
    frameworkUrl: buildUrl + "/Hub.framework.js",
    codeUrl: buildUrl + "/Hub.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "DefaultCompany",
    productName: "GMF",
    productVersion: "0.1",
    showBanner: unityShowBanner,
};

loadingBar.style.display = "block";

var script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
    createUnityInstance(canvas, config, (progress) => {
        progressBarFull.style.width = 100 * progress + "%";
    })
        .then((unityInstance) => {
            unityGame = unityInstance;
            unityInstance3 = unityInstance;
            loadingBar.style.display = "none";
            fullscreenButton.onclick = () => {
                canvasWrapper.requestFullscreen();
            };
        })
        .catch((message) => {
            alert(message);
        });
};
document.body.appendChild(script);

function OnUnityLoaded() {
    setTimeout(function () {
        SendInitialData();
    }, 10);
}

function SendInitialData() {
    var aurl = localStorage['avatarUrl'] || 'defaultValue';
    unityInstance.SendMessage('JsObj', 'CalledFromJs', aurl);
}
