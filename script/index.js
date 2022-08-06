/****************************************************************************************

                        FUNCTIONS THAT ADD ELEMENTS TO INDEX.HTML

****************************************************************************************/

// creates an element with a specific tag and assigns some attribute values.
// This element is then added to index.html
function addElement(e_tag, e_id, e_class, e_innerHTML, e_value, e_append_to_id) {
    let result = null;

    if (e_tag != 0) {
        result = document.createElement(e_tag);

        if (e_id !== null) {
            result.id = String(e_id);
        }

        if (e_class !== null) {
            result.setAttribute("class", String(e_class))        
        }

        if (e_innerHTML !== null) {
            result.innerHTML = String(e_innerHTML);        
        }

        if (e_value !== null) {
            result.setAttribute("value", String(e_value));        
        }

        if (e_append_to_id !== null) {
            $("#" + e_append_to_id).append(result);        
        }         
    }
}

// adds option elements to the select object
function addOptions(o_id, o_value, select_id) {    
    for (let i = 0; i < o_id.length; i++) {
        addElement("option", o_id[i], null, o_value[i], o_value[i], select_id);
    }
}

/****************************************************************************************

                        CREATE AND INSERT ELEMENTS TO index.html

****************************************************************************************/

// create and insert two divs
addElement("div", CHOOSE_PRODUCT_ID, null, null, null, "app");
addElement("div", UA_CHANGES_ID, null, null, null, "app");

// create and insert elements for the choose-product div
addElement("div", null, BLANK_SPACE_CLASS, null, null, CHOOSE_PRODUCT_ID); // blank space div
addElement("p", null, "h4", "DEVICES/OPERATING SYSTEMS", null, CHOOSE_PRODUCT_ID); // header for devices/OS
addElement("select", OS_SELECT_ID, null, null, null, CHOOSE_PRODUCT_ID); // select a device/OS
addElement("br", null, null, null, null, CHOOSE_PRODUCT_ID); // br
addElement("p", null, "h4", "BROWSERS", null, CHOOSE_PRODUCT_ID); // header for browsers
addElement("select", BROWSER_SELECT_ID, null, null, null, CHOOSE_PRODUCT_ID); // select a browser

// create and insert options for product select element
addOptions(OS_OPTIONS_ID_ARR, OS_OPTIONS_VALUE_ARR, OS_SELECT_ID);
addOptions(BROWSER_OPTIONS_ID_ARR, BROWSER_OPTIONS_VALUE_ARR, BROWSER_SELECT_ID);

// create and insert elements for the ua-changes div
addElement("br", null, null, null, null, UA_CHANGES_ID); // br
addElement("p", null, "h4", "USER AGENT STRING", null, UA_CHANGES_ID); // header for UA string
addElement("p", UA_STR_P_ID, null, getDefaultUA(), null, UA_CHANGES_ID); // displays UA string
addElement("button", COPY_UA_BTN_ID, UA_ACTIVITY_BTN_CLASS, "COPY", null, UA_CHANGES_ID); // copy UA string button
addElement("span", null, null, "&#9;", null, UA_CHANGES_ID); // tab span
addElement("button", TEST_UA_BTN_ID, UA_ACTIVITY_BTN_CLASS, "<abbr title=\"Scroll to the Navigator section\">TEST</abbr>", null, UA_CHANGES_ID); // test UA button
addElement("div", null, BLANK_SPACE_CLASS, null, null, UA_CHANGES_ID); // blank space div
addElement("div", CHANGES_FORM_ID, null, null, null, UA_CHANGES_ID); // has buttons to apply the UA string in browser

// create and insert change choice form options
addElement("button", "change-apply-all", APPLY_CHANGE_BTN_CLASS, "APPLY TO ALL WINDOWS", null, CHANGES_FORM_ID); // button to apply UA across all windows
addElement("span", null, null, "&#9;", null, CHANGES_FORM_ID); // tab span
addElement("button", "change-apply-current", APPLY_CHANGE_BTN_CLASS, "APPLY TO ACTIVE TAB", null, CHANGES_FORM_ID); // button to apply UA to active tab
addElement("span", null, null, "&#9;", null, CHANGES_FORM_ID); // tab span
addElement("button", "change-reset", APPLY_CHANGE_BTN_CLASS, "RESET", null, CHANGES_FORM_ID); // button to reset the UA to the default one.

/****************************************************************************************

                                ADDING EVENT LISTENERS

****************************************************************************************/

// listeners to change the displayed UA string when options are selected
$("#" + OS_SELECT_ID).bind("change", updateUAStr);
$("#" + BROWSER_SELECT_ID).bind("change", updateUAStr);

// listener to copy the user agent when the "COPY" button is clicked
$("#" + COPY_UA_BTN_ID).bind("click", copyUA);

// listener to visit creepjs website when the "TEST" button is clicked
$("#" + TEST_UA_BTN_ID).bind("click", () => {
    window.open("https://abrahamjuliot.github.io/creepjs", "_blank");
});

// listeners to apply the changes to user agent string in the browser 
$("#change-apply-all").bind("click", 
() => {
    applyUAStr(OPTION_ALL);
});
$("#change-apply-current").bind("click",  
() => {
    applyUAStr(OPTION_ACTIVE);
});
$("#change-reset").bind("click",  
() => {
    applyUAStr(OPTION_RESET);
    $("#" + UA_STR_P_ID).html(getDefaultUA());
    $("#" + BROWSER_SELECT_ID).prop("value", "---");
    $("#" + OS_SELECT_ID).prop("value", "---");   
});

/****************************************************************************************

                            SETTING UA STRING IN BROWSER

****************************************************************************************/

// set UA string for all open tabs to the return value of getDefaultUA() if its not navigator.userAgent
if (getDefaultUA() !== getActualUA()) {
    applyUAStr(OPTION_DEFAULT);    
}

// listener to set the UA string to all tabs if a tab is created or refreshed
chrome.tabs.onCreated.addListener(applyUAStrDefault);
chrome.tabs.onUpdated.addListener(applyUAStrDefault);
