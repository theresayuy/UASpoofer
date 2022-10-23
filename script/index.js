/////////////////////////////////////////////////////////////////////////////
//                                                                         //
//                       DEALS WITH ADDING ELEMENTS                        //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////

// 
const updatePopup = (component, append, parentID) => {
    const root = document.getElementById(parentID || "popup");
    root.innerHTML = (append ? root.innerHTML : "") + component;
}

// adds option elements to the select object
const addOptions = (optionsArr, selectID) => {
    let i = 0;    
    optionsArr.forEach((option) => {
        updatePopup(Option({
            id: option.id,
            val: option.val,        
        }), (i > 0), selectID); 
        i++;       
    });    
}

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                              DEALS WITH ANIMATIONS AND CSS                           //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

const setApplyMsg = function(newMsg, func1) {
    $(`#apply-msg`).html(newMsg);
    $(`#apply-msg`).fadeIn(700, () => {
        const newMsgStaysVisible = setTimeout(() => {
            $(`#apply-msg`).fadeOut(700, func1); 
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
    if (hasOptionChange("select-browser") && hasOptionChange("select-os")) {
        uaStr = addToUAStr(uaStr, OS_OPTIONS, "select-os");
        uaStr = addToUAStr(uaStr, BROWSER_OPTIONS, "select-browser");
        uaStr = getFinalizedUAStr(uaStr);
        $(`#ua-str`).html(uaStr);
    } else if (!hasOptionChange("select-browser") && !hasOptionChange("select-os")) {
        $(`#ua-str`).html(getUAStr(false));
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

// assemble the basic layout
[
    LineBreak(), LineBreak(),
    Section({id: "choose-product", 
        innerHTML: `${SelectParent({
            innerHTML: SelectOptions({
                id: "select-os"               
            })
        })}
        ${SelectParent({
            innerHTML: SelectOptions({id: "select-browser"})
        })}`        
    }), 
    Section({id: "ua-changes", 
        innerHTML: `
            ${UAStr({innerHTML: getUAStr(false)})}
            ${ButtonRow1({id: "copy-btn", innerHTML: "COPY"})}
            ${TabSpan()}
            ${ButtonRow1({id: "test-btn", innerHTML: "TEST"})}
            ${LineBreak()}${LineBreak()}
            ${ButtonRow2({id: "apply-all-btn", innerHTML: "APPLY"})}
            ${TabSpan()}
            ${ButtonRow2({id: "reset-btn", innerHTML: "RESET"})}
            ${LineBreak()}${LineBreak()}
            ${ApplyMsg()}
       `})
].forEach((item) => {
    updatePopup(item, true);
});

// create and insert options for product select element
addOptions(OS_OPTIONS, "select-os");
addOptions(BROWSER_OPTIONS, "select-browser");

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                               ADDING EVENT LISTENERS                                 //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// listeners to change the displayed UA string when options are selected
$(`#select-os`).bind("change", updateUAStr);
$(`#select-browser`).bind("change", updateUAStr);

// listener to copy the user agent when the "COPY" button is clicked
$(`#copy-btn`).bind("click", () => {
    navigator.clipboard.writeText($(`#ua-str`).html());
    setApplyMsg("Copied!");
});

// listener to open creepjs website in new window when the "TEST" button is clicked
$(`#test-btn`).bind("click", () => {
    setApplyMsg(
        "You will be directed to creepjs website.<br> Scroll to the Navigator section to view results.", 
        () => {
            window.open("https://abrahamjuliot.github.io/creepjs", "_blank");
        });
});

// listeners to apply the changes to user agent string in the browser 
$(`#apply-all-btn`).bind("click", 
() => {
    storeDefaultUA($(`#ua-str`).html());
    chromeStoreDefaultUA(getUAStr(false));
    setApplyMsg("Changes applied", null);
});
$(`#reset-btn`).bind("click",  
() => {
    storeDefaultUA(getUAStr(true));
    chromeStoreDefaultUA(getUAStr(true));
    $(`#ua-str`).html(getUAStr(true));
    $(`#select-browser`).prop("value", BROWSER_OPTIONS[0].val);
    $(`#select-options`).prop("value", OS_OPTIONS[0].val);
    setApplyMsg("User agent was reset.", null);
});
