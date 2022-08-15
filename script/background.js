// returns a new reference of a string or array
const getDeepCopy = function(toCopy) {
    return ((toCopy.toString() === toCopy ? " " : [" "]).concat(toCopy)).slice(1);
}

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                                 DEALS WITH PROMISES                                  //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// Stores the result of a successful promise to be modified and accessed later
const PromiseResult = class {
    constructor(result) {
        this.result = result;
    }

    getResult() {
        return this.result;
    }

    setResult(newResult) {
        this.result = newResult;
    }
};

const openWindows = new PromiseResult([]); // stores array with info about open windows
const storageUAStr = new PromiseResult(""); // stores UA string from chrome.storage
const platformResult = new PromiseResult(""); // stores navigator.platform

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                      DEALS WITH STRINGS FROM AND FOR THE BROWSER                     //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// check if a url starts with "https"
const isGoodURL = function(urlStr) {
    return urlStr.slice(0, 5) === "https" || 
            urlStr.slice(0, 5) === "http:";
}

// updates the result of platformResult
const updatePlatformResult = function(uaStr) {
    const PLATFORMS = [
        {toCheck: "Windows", platform: "Win32"},
        {toCheck: "Macintosh; Intel", platform: "MacIntel"},
        {toCheck: "Linux x86_64", platform: "Linux x86_64"},
        {toCheck: "X11; Linux", platform: "Linux"}, 
        {toCheck: "Linux; Android", platform: "Linux armv8l"},
        {toCheck: "iPhone", platform: "iPhone"}, {toCheck: "iPad", platform: "iPad"}
    ];
    platformResult.setResult("NO PLATFORM");

    for (let i = 0; i < PLATFORMS.length; i++) {
        if (uaStr.indexOf(PLATFORMS[i].toCheck) > -1 && 
            platformResult.getResult() === "NO PLATFORM") {
                platformResult.setResult(getDeepCopy(PLATFORMS[i].platform));
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                        DEALS WITH OPEN BROWSER WINDOWS AND TABS                      //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// updates the array of all open windows to store info about newly opened tabs
const updateOpenWindows = function() {
    let allWindowsPromise = chrome.windows.getAll({
        populate: true, windowTypes: ["normal"]
    });
    allWindowsPromise.then((result) => {
        openWindows.setResult(getDeepCopy(result));
    });
}

// returns information about all tabs
const getAllTabs = function() {    
    let owVal = getDeepCopy(openWindows.getResult());
    let result = [];

    // navigate through all the tabs and append them to result
    owVal.forEach((owValItem) => {
        owValItem.tabs.forEach((owValTabsItem) => {
            result.push(owValTabsItem);
        }) 
    });
    
    return result;
}

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                             DEALS WITH CHROME LOCAL STORAGE                          //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// stores newUAStr in chrome local storage and updates the value of storageUAStr
const chromeStoreDefaultUA = function(newUAStr) {
    chrome.storage.local.set(
        {defaultUA: getDeepCopy(newUAStr)}
    );
}

// updates result of storageUAStr
const updateStorageUAStr = function() {
    chrome.storage.local.get("defaultUA", (result) => {
        storageUAStr.setResult(getDeepCopy(result["defaultUA"]));
    });
}

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                       DEALS WITH APPLYING UA STRING IN BROWSER                       //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// attaches debugger and overrides navigator.userAgent for one tab
const attachDebugger = function(tabID, newUAStr) {
    const PROTOCOL_VER = "1.0";

    chrome.debugger.getTargets((result) => {
        result.forEach((infoItem) => {
            // attach debugger if its not already attached
            if (infoItem.tabId === tabID && !infoItem.attached) {
                chrome.debugger.attach({
                    tabId: tabID
                }, PROTOCOL_VER, function() {
                    if (chrome.runtime.lastError) {
                        console.log(chrome.runtime.lastError.message);
                        return;
                    }
                    
                    if (newUAStr) {
                        // enable network
                        chrome.debugger.sendCommand({
                            tabId: tabID
                        }, "Network.enable", {}, function(response) {
                            if (response.error) {
                                console.log(response.error);
                                return;
                            }
                            
                            // override the original UA
                            chrome.debugger.sendCommand({
                                tabId: tabID
                            }, "Network.setUserAgentOverride", {
                                userAgent: getDeepCopy(newUAStr),
                                platform: getDeepCopy(platformResult.getResult())
                            });
                        });
                    }
                });
            }
        });
    });
}

// applies the changed user agent string to all tabs
const applyUAStr = function(newUAStr) {
    updateOpenWindows();
    updatePlatformResult(newUAStr);
    let tabsCollection = getAllTabs();
    
    tabsCollection.forEach((tabItem) => {
        if (isGoodURL(tabItem.url)) {
            attachDebugger(tabItem.id, newUAStr);
        }
    });                 
}

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                                      Service worker                                  //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chromeStoreDefaultUA(navigator.userAgent);
    }
});
chrome.tabs.onUpdated.addListener((_) => {
    // if new tab is opened and updated, attach debugger and override UA string
    updateStorageUAStr();
    applyUAStr(storageUAStr.getResult());
});
chrome.storage.onChanged.addListener((_) => {
    // detach debugger from every tab its attached to
    chrome.debugger.getTargets((result) => {
        result.forEach((infoItem) => {
            if (infoItem.attached) {
                chrome.debugger.detach({tabId: infoItem.tabId});
            }
        });
    });

    // attach debugger to every tab again and override with new UA string
    updateStorageUAStr();
    applyUAStr(storageUAStr.getResult());
});
