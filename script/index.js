//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                              HTML ELEMENTS AND USER AGENTS                           //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
const OS_OPTIONS = [
    {val: "DEVICES/OPERATING SYSTEMS", id:"OS---0", ua: ""},
    {val: "Windows 10", id: "OS---win10", ua: "Windows NT 10.0; Win64; x64"},
    {val: "Windows 10 WoW64", id: "OS---win10--wow64", ua: "Windows NT 10.0; WOW64"},
    {val: "Windows 8.1", id: "OS---win8-1", ua: "Windows NT 6.3; Win64; x64"},
    {val: "Windows 7", id: "OS---win7", ua: "Windows NT 6.1; Win64; x64"},
    {val: "Windows Vista", id: "OS---winvista", ua: "Windows; U; Windows NT 6.0; en-US"},
    {val: "Windows XP", id: "OS---winxp", ua: "Windows; U; Windows NT 5.1; en-US"},
    {val: "MacOS 10.15.0", id:"OS---macos10-15-0", ua: "Macintosh; Intel Mac OS X 10_15"},
    {val: "Linux x86_64", id:"OS---linux--x8664", ua: "X11; Linux x86_64"},
    {val: "Linux i686", id: "OS---linux--i686", ua: "X11; Linux i686"},
    {val: "Linux aarch64", id: "OS---linux--aarch64", ua: "X11; Linux aarch64"},
    {val: "Samsung Galaxy A7/Android 8.0.0", id:"OS---android8-0-0---SMA750FN", ua: "Linux; Android 8.0.0; SM-A750FN"},
    {val: "Generic/Android 10", id: "OS---andrdoid10---generic", ua: "Linux; Android 10; K"},
    {val: "Samsung Galaxy S9/Android 10", id: "OS---android10---smg960u", ua: "Linux; Android 10; SM-G960U"},
    {val: "Pixel 6 Pro/Android 12", id: "OS---android12---p6p", ua: "Linux; Android 12; Pixel 6 Pro"},
    {val: "iPhone/iOS 15.2", id: "OS---ios15-2---iphone", ua: "iPhone; CPU OS 15_2 like Mac OS X"}, 
    {val: "iPad/iOS 15.2", id: "OS---ios15-2---ipad", ua: "iPad; CPU OS 15_2 like Mac OS X"},
    {val: "Xbox One", id: "OS---win10---xboxone", ua: "Windows NT 10.0; Win64; x64; Xbox; Xbox One"}
]; // OS user agent options
const BROWSER_OPTIONS = [
    {val: "BROWSERS", id:"BROWSER---0", ua: ""},
    {
        val: "Chrome 104.0.0.0", id: "BROWSER---chrome104-0-0-0", 
        ua: ") AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"        
    },
    {
        val: "Chrome 103.0.0.0", id: "BROWSER---chrome103-0-0-0", 
        ua: ") AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"
    },
    {
        val: "Edge 103.0.5026.0", id: "BROWSER---edge103-0-5026-0", 
        ua: ") AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5026.0 Safari/537.36 Edg/103.0.1253.0"
    },
    {
        val: "Safari 15.4", id: "BROWSER---safari15-4", 
        ua: ") AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15"
    },
    {
        val: "Firefox 103.0", id: "BROWSER---ff103-0", 
        ua: "; rv:103.0) Gecko/20100101 Firefox/103.0"
    },
    {
        val: "Firefox 101.0", id: "BROWSER---ff101-0", 
        ua: "; rv:101.0) Gecko/20100101 Firefox/101.0"
    },
    {
        val: "Firefox 52.0", id: "BROWSER---ff52-0",
        ua: "; rv:52.0) Gecko/20100101 Firefox/52.0"
    }
]; // Browser user agent options

// some info about HTML elements that will be added frequently
const HTML_BR = {tag:"br", class: null, id: null, value: null, innerHTML: null};
const HTML_TAB_SPAN = {tag: "span", class: "tab-span", innerHTML: "&#9;", id: null, value: null};
const HTML_BLANK_SPACE = {tag: "div", class: "blank-space", innerHTML: null, id: null, value: null};

// some info about HTML elements whose id or class are frequently accessed in this program
const HTML_CHOOSE_PRODUCT = {
    tag: "div", id: "div-choose-product", 
    class: null, value: null, innerHTML: null
};
const HTML_UA_CHANGES = {
    tag: "div", id: "div-ua-changes",
    class: null, value: null, innerHTML: null
};
const HTML_SELECT_OS = {
    tag: "select", id: "select-os-choice",
    class: null, value: null, innerHTML: null
};
const HTML_SELECT_BROWSER = {
    tag: "select", id: "select-browser-choice",
    class: null, value: null, innerHTML: null
};
const HTML_P_UA_STR = {
    tag: "p", id: "ua-str", innerHTML: "something went wrong",
    class: null, value: null
};
const HTML_P_APPLY_MSG = {
    tag: "p", id: "apply-msg", innerHTML: null,
    class: null, value: null
};
const HTML_BTN_COPY_UA = {
    tag: "button", id: "copy-ua-btn", class: "btn-row-1",
    innerHTML: "COPY", value: null
};
const HTML_BTN_TEST_UA = {
    tag: "button", id: "test-ua-btn", value: null,
    class: HTML_BTN_COPY_UA.class,
    innerHTML: "TEST"
};
const HTML_BTN_APPLY_ALL = {
    tag: "button", id: "change-apply-all", class: "btn-row-2",
    innerHTML: "APPLY TO ALL WINDOWS", value: null
};
const HTML_BTN_RESET = {
    tag: "button", id: "change-reset", class: HTML_BTN_APPLY_ALL.class,
    innerHTML: "RESET", value: null
};

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                       DEALS WITH ADDING ELEMENTS TO INDEX.HTML                       //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// creates an element with a specific tag and assigns some attribute values.
// This element is then added to index.html
const addElement = (eInfo, eAppendToId) => {
    const ATTR = ["id", "class", "value"];
    let result = null;

    if (eInfo.tag != 0) {
        result = document.createElement(eInfo.tag);

        for (let i = 0; i < ATTR.length; i++) {
            if (eInfo[ATTR[i]] !== null) {
                result.setAttribute(
                    ATTR[i], 
                    eInfo[ATTR[i]]
                );
            }
        }

        if (eInfo.innerHTML !== null) {
            result.innerHTML = eInfo.innerHTML;
        }

        if (eAppendToId !== null) {
            $(`#${eAppendToId}`).append(result);        
        }         
    }
}

// adds option elements to the select object
const addOptions = (optionsArr, selectID) => {
    optionsArr.forEach((option) => {
        addElement({
            tag: "option", 
            id: option.id, 
            value: option.val, 
            class: null,
            innerHTML: option.val
        }, selectID);        
    });    
}

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                              DEALS WITH ANIMATIONS AND CSS                           //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

const setApplyMsg = function(newMsg, func1) {
    $(`#${HTML_P_APPLY_MSG.id}`).html(newMsg);
    $(`#${HTML_P_APPLY_MSG.id}`).fadeIn(700);
    setTimeout(() => {
        $(`#${HTML_P_APPLY_MSG.id}`).fadeOut(700);
        
        if (func1) {
            setTimeout(func1, 1000);        
        }
    }, 2000);
}

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                           DEALS WITH UA STRING IN POPUP                              //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// appends UA_choices at a certain index to uaStr
const addToUAStr = function(uaStr, optionsArr, selectID) {
    optionsArr.forEach((item) => {
        if ($(`#${item.id}`).prop("value") === $(`#${selectID}`).prop("value")) {
                uaStr += item.ua;
            }
    });

    return uaStr;
}

// checks if the select element has a value different from the default one
const hasOptionChange = function(selectID) {
    return $(`#${selectID}`).prop("value") !== OS_OPTIONS[0].val && 
            $(`#${selectID}`).prop("value") !== BROWSER_OPTIONS[0].val;
}

// returns a modified version of UA String for Edge browser on mobile devices
const getFinalizedUAStr = function(uaStr) {
    const indexEdge = uaStr.indexOf("Edg");

    const ACTION = [
        {toCheck: "Android", toAdd: "A"},
        {toCheck: "like Mac OS X", toAdd: "iOS"},
        {toCheck: "Xbox", toAdd: "e"}
    ]

    // modify UA string for edge mobile devices
    if (indexEdge > -1) {
        for (let i = 0; i < ACTION.length; i++) {
            if (uaStr.indexOf(ACTION[i].toCheck) > -1) {
                return uaStr.slice(0, indexEdge + 3) + "" + 
                        ACTION[i].toAdd + "" + uaStr.slice(indexEdge + 3);
            }
        }
    }

    return uaStr; // no modifications needed!
}

// updates the UA string that is displayed when a new one is selected
const updateUAStr = function() {
    let uaStr = "Mozilla/5.0 (";
    if (hasOptionChange(HTML_SELECT_BROWSER.id) && hasOptionChange(HTML_SELECT_OS.id)) {
        uaStr = addToUAStr(uaStr, OS_OPTIONS, HTML_SELECT_OS.id);
        uaStr = addToUAStr(uaStr, BROWSER_OPTIONS, HTML_SELECT_BROWSER.id);
        uaStr = getFinalizedUAStr(uaStr);
        $(`#${HTML_P_UA_STR.id}`).html(uaStr);
    } else if (!hasOptionChange(HTML_SELECT_BROWSER.id) && !hasOptionChange(HTML_SELECT_OS.id)) {
        $(`#${HTML_P_UA_STR.id}`).html(getUAStr(false));
    }
}

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                                DEALS WITH LOCAL STORAGE                              //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// returns the value of either the actual or the default UA string
const getUAStr = function(actual) {
    const storageResult = JSON.parse(localStorage.getItem("uaStrLocal"));
    return getDeepCopy(storageResult[actual ? 0 : 1]);
}

// stores newUAStr as the new default UA str
const storeDefaultUA = function(newUAStr) {
    const storageResult = JSON.parse(localStorage.getItem("uaStrLocal"));
    storageResult[1] = getDeepCopy(newUAStr);
    localStorage.setItem("uaStrLocal", JSON.stringify(storageResult));
}

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                      CREATE AND INSERT ELEMENTS TO INDEX.HTML                        //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// store an array with the actual UA if it hasn't been stored yet
if (localStorage.getItem("uaStrLocal") === null) {
    localStorage.setItem("uaStrLocal", JSON.stringify(
                        [navigator.userAgent, navigator.userAgent]));
}

// change inner HTML of some elements
HTML_P_UA_STR.innerHTML = getUAStr(false);

// create and insert two divs
[HTML_CHOOSE_PRODUCT, HTML_UA_CHANGES].forEach((item) => {
    addElement(item, "popup");
});

// add elements to choose product div
[
    HTML_BLANK_SPACE,// blank space div 
    HTML_SELECT_OS, // a select element for OS
    HTML_BR, HTML_BR,
    HTML_SELECT_BROWSER // a select element for browser
].forEach((item) => {
    addElement(item, HTML_CHOOSE_PRODUCT.id);
});

// create and insert options for product select element
addOptions(OS_OPTIONS, HTML_SELECT_OS.id);
addOptions(BROWSER_OPTIONS, HTML_SELECT_BROWSER.id);

// create and insert elements for the ua-changes div
[
    HTML_BR, // br
    {tag: "p", innerHTML: "USER AGENT STRING", class: "h4",
    id: null, value: null},
    HTML_P_UA_STR, // paragraph containing UA string
    HTML_BTN_COPY_UA, HTML_TAB_SPAN, HTML_BTN_TEST_UA,
    HTML_BR, HTML_BR, 
    HTML_BTN_APPLY_ALL, HTML_TAB_SPAN, HTML_BTN_RESET,
    HTML_BR, HTML_BR, HTML_P_APPLY_MSG
    
].forEach((item) => {
    addElement(item, HTML_UA_CHANGES.id);
});

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                               ADDING EVENT LISTENERS                                 //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// listeners to change the displayed UA string when options are selected
$(`#${HTML_SELECT_OS.id}`).bind("change", updateUAStr);
$(`#${HTML_SELECT_BROWSER.id}`).bind("change", updateUAStr);

// listener to copy the user agent when the "COPY" button is clicked
$(`#${HTML_BTN_COPY_UA.id}`).bind("click", () => {
    navigator.clipboard.writeText($(`#${HTML_P_UA_STR.id}`).html());
    setApplyMsg("Copied!");
});

// listener to open creepjs website in new window when the "TEST" button is clicked
$(`#${HTML_BTN_TEST_UA.id}`).bind("click", () => {
    setApplyMsg("You will be directed to creepjs website.<br> Scroll to the Navigator section to view results.", 
                () => {
                    window.open("https://abrahamjuliot.github.io/creepjs", "_blank");
                });
});

// listeners to apply the changes to user agent string in the browser 
$(`#${HTML_BTN_APPLY_ALL.id}`).bind("click", 
() => {
    storeDefaultUA($(`#${HTML_P_UA_STR.id}`).html());
    chromeStoreDefaultUA(getUAStr(false));
    setApplyMsg("Changes applied", null);
});
$(`#${HTML_BTN_RESET.id}`).bind("click",  
() => {
    storeDefaultUA(getUAStr(true));
    chromeStoreDefaultUA(getUAStr(true));
    $(`#${HTML_P_UA_STR.id}`).html(getUAStr(true));
    $(`#${HTML_SELECT_BROWSER.id}`).prop("value", BROWSER_OPTIONS[0].val);
    $(`#${HTML_SELECT_OS.id}`).prop("value", OS_OPTIONS[0].val);
    setApplyMsg("User agent was reset.", null);
});
