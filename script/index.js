/////////////////////////////////////////////////////////////////////////////
//                                                                         //
//                       DEALS WITH ADDING ELEMENTS                        //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////

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
    $(`#${HTML_P_APPLY_MSG.id}`).fadeIn(700, () => {
        const newMsgStaysVisible = setTimeout(() => {
            $(`#${HTML_P_APPLY_MSG.id}`).fadeOut(700, func1); 
            clearTimeout(newMsgStaysVisible);        
        }, 2000);  
    });
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

// set the ua str to the default one
HTML_P_UA_STR.innerHTML = getUAStr(false);

[
    HTML_BR, HTML_BR,
    HTML_CHOOSE_PRODUCT, 
    HTML_UA_CHANGES
].forEach((item) => {
    addElement(item, "popup");
});

// add elements to choose product div
[
    HTML_SELECT_OS_PARENT,
    HTML_SELECT_BROWSER_PARENT 
].forEach((item) => {
    addElement(item, HTML_CHOOSE_PRODUCT.id);
}); // div to put the select in
addElement(HTML_SELECT_OS, HTML_SELECT_OS_PARENT.id);
addElement(HTML_SELECT_BROWSER, HTML_SELECT_BROWSER_PARENT.id);

// create and insert options for product select element
addOptions(OS_OPTIONS, HTML_SELECT_OS.id);
addOptions(BROWSER_OPTIONS, HTML_SELECT_BROWSER.id);

// create and insert elements for the ua-changes div
[
    {
        tag: "p", 
        innerHTML: "USER AGENT STRING", 
        class: "h4",
        id: null, value: null
    },
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
    setApplyMsg(
        "You will be directed to creepjs website.<br> Scroll to the Navigator section to view results.", 
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
