// used to apply a specific UA either across all windows or the active tab
class ApplyChanges {
    constructor(ua_str, only_apply_to_active) {
        this.ua_str = ua_str;
        this.only_apply_to_active = only_apply_to_active;        
    }

    setNavigatorUA(win) {        
        win.navigator.__defineGetter__("userAgent", function() {
            return this.ua_str.slice();    
        });
    }

    setDefaultUA() {
        localStorage.setItem(DEFAULT_UA_KEY, this.ua_str.slice());
    }

    applyUA() {
        if (this.only_apply_to_active) {
            // this.setUA();                   
        } else {
            updateOpenWindows();

            for (let i = 0; i < open_windows.length; i++) {
                this.setNavigatorUA(open_windows[i]);                
            }
        
            this.setDefaultUA();
        }
        // console.log(navigator.userAgent);    
    }
}

/****************************************************************************************

                    FUNCTIONS THAT MODIFY AND ENGAGES WITH THE UA STRING

****************************************************************************************/

// returns actual browser UA string from before it was ever changed
function getActualUA() {
    // store the actual UA in the browser local storage if this extension has never been used
    if (localStorage.getItem(ACTUAL_UA_RUNS_KEY) === null) {
        localStorage.setItem(ACTUAL_UA_KEY, String(navigator.userAgent));
        localStorage.setItem(ACTUAL_UA_RUNS_KEY, "1");    
    }
    
    // console.log(localStorage.getItem(ACTUAL_UA_KEY));
    return localStorage.getItem(ACTUAL_UA_KEY);  
}

// appends UA_choices at a certain index to ua_str
function addToUAStr(ua_str, rb_id, ua_choices, select_id) {
    for (let i = 0; i < rb_id.length; i++) {
        if (document.getElementById(rb_id[i]).value === document.getElementById(select_id).value) {
            ua_str += ua_choices[i];        
        }    
    }
    
    return ua_str;
}

// checks if the select element has a value different from the default one
function hasOptionChange(select_id) {
    return $("#" + select_id).prop("value") !== "---";
} 

// updates the UA string that is displayed when a new one is selected
function updateUAStr() {
    let ua_str = "Mozilla 5.0 (";
    if (hasOptionChange(OS_SELECT_ID) && hasOptionChange(BROWSER_SELECT_ID)) {
        ua_str = addToUAStr(ua_str, OS_OPTIONS_ID_ARR, OS_UA_CHOICES, OS_SELECT_ID);
        ua_str = addToUAStr(ua_str, BROWSER_OPTIONS_ID_ARR, BROWSER_UA_CHOICES, BROWSER_SELECT_ID);
        $("#" + UA_STR_P_ID).html(ua_str);
    } else if (!hasOptionChange(OS_SELECT_ID) && !hasOptionChange(BROWSER_SELECT_ID)) {
        $("#" + UA_STR_P_ID).html(getDefaultUA());
    }
}

/**
 * returns the default user agent string, which is either the one that was
 * set when the extension was last used or the one that was set before this
 * extension was used.
**/
function getDefaultUA() {   
    if (localStorage.getItem(DEFAULT_UA_KEY) === null) {
        localStorage.setItem(DEFAULT_UA_KEY, getActualUA());    
    } 
    return localStorage.getItem(DEFAULT_UA_KEY);
}

// copies the displayed UA string
function copyUA() {
    let copyText = $("#" + UA_STR_P_ID).html();
    navigator.clipboard.writeText(copyText);
}

/****************************************************************************************

                    FUNCTIONS THAT HELP APPLY UA STRING IN BROWSER

****************************************************************************************/

// applies the changed user agent string to the browser windows or active tab
function applyUAStr(option) {
    const apply_all_options = [false, true, false, false];
    const ua_str_options = [$("#" + UA_STR_P_ID).html(),
                    $("#" + UA_STR_P_ID).html(),
                    getActualUA(), getDefaultUA()];
    let ac = new ApplyChanges(ua_str_options[option], apply_all_options[option]); 
    ac.applyUA(); 
}

// this function applies the default user agent string to all the open windows
function applyUAStrDefault(tab) {
    applyUAStr(OPTION_DEFAULT);
}
