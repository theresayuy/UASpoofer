// used to store the result of a Successful promise to be modified and edited later
class PromiseResult {
    constructor(val) {
        this.val = val;
    }

    setVal(arr) {
        this.val = arr;
    }
}

// stores an array that contains a collection of all the open windows
let open_windows = new PromiseResult([]);

// returns the active tab
function getActiveTab(open_tabs) {
    for (let i = 0; i < open_tabs.length; i++) {
        if (open_tabs[i].Tabs.active) {
            return open_tabs[i];   
        }    
    }
    return null;
}

// returns an array of all open windows
function updateOpenWindows() {
    let all_win_promise = chrome.windows.getAll({populate: true, windowTypes: ["normal"]});
    
    all_win_promise.then((updatedValue) => {
        open_windows.setVal(updatedValue);
        console.log(open_windows.val);
    });
}

// wipes all the data in localStorage
function wipeLS() {
    const keys = [ACTUAL_UA_KEY, DEFAULT_UA_KEY, ACTUAL_UA_RUNS_KEY];

    for (let i = 0; i < keys.length; i++) {
        if (localStorage.getItem(keys[i]) !== null) {
            localStorage.removeItem(keys[i]); 
        }   
    }
}
