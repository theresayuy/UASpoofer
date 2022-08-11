//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                                 DEALS WITH PROMISES                                  //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// Stores the result of a successful promise to be modified and accessed later
class PromiseResult {
    constructor(result) {
        this.result = result;
    }

    getResult() {
        return this.result;
    }

    setResult(newResult) {
        this.result = newResult;
    }
}

const openWindows = new PromiseResult([]); // stores an array with info about open windows
const storageUAStr = new PromiseResult(""); // used for getting UA string from chrome.storage

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                              DEALS WITH STRINGS AND ARRAYS                           //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

function getDeepCopy(toCopy, isStr) {
    return ((isStr ? " " : [" "]).concat(toCopy)).slice(1);
}

// check if a url starts with "https"
function isGoodURL(urlStr) {
    return urlStr.slice(0, 5) === "https" || 
            urlStr.slice(0, 5) === "http:";
}

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                        DEALS WITH OPEN BROWSER WINDOWS AND TABS                      //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// updates the array of all open windows to store info about newly opened tabs
function updateOpenWindows() {
    let allWindowsPromise = chrome.windows.getAll({
        populate: true, windowTypes: ["normal"]
    });
    allWindowsPromise.then((result) => {
        openWindows.setResult(getDeepCopy(result, false));
    });
}

// returns information about all tabs
function getAllTabs() {    
    let owVal = getDeepCopy(openWindows.getResult(), false);
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

// stores the default UA string in storageUAStr
const chromeGetDefaultUA = function() {
    chrome.storage.local.get("defaultUA", (result) => {
        storageUAStr.setResult(
            getDeepCopy(result["defaultUA"])
        );
    });
}


// stores newUAStr in chrome local storage
const chromeStoreDefaultUA = function(newUAStr) {
    chrome.storage.local.set(
        {defaultUA: getDeepCopy(newUAStr)}
    );
}

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                       DEALS WITH APPLYING UA STRING IN BROWSER                       //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// attaches debugger and overrides navigator.userAgent for one tab
function attachDebugger(tabID, newUAStr) {
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
                                userAgent: getDeepCopy(newUAStr, true)
                            });
                        });
                    }
                });
            }
        });
    });
}

// applies the changed user agent string to tabs
function applyUAStr(newUAStr) {
    updateOpenWindows();
    let tabsCollection = getAllTabs();
    
    chromeStoreDefaultUA(getDeepCopy(newUAStr, true));
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
    chromeGetDefaultUA();
    applyUAStr(storageUAStr.getResult());
});
chrome.storage.onChanged.addListener(() => {

    // detach debugger from every tab its attached to
    chrome.debugger.getTargets((result) => {
        result.forEach((info) => {
            if (info.attached) {
                chrome.debugger.detach({tabId: info.tabId});
            }
        });
    });

    // attach debugger to every tab again and override with new UA string
    chromeGetDefaultUA();
    applyUAStr(storageUAStr.getResult());
});
