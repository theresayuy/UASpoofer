/****************************************************************************************

                                GLOBAL VARIABLES, CONSTANTS

****************************************************************************************/
const OS_OPTIONS_ID_ARR = ["OS-0", "OS-WIN_10", "OS-WIN_8_dot_1", 
                "OS-WIN_7", "OS-WIN_VISTA", 
                "OS-WIN_XP", "OS-MACOS",
                "OS-LINUX", "OS-ANDROID_10-SMG960U",
                "OS-IOS-IPHONE", "OS-IOS-IPAD"];
const OS_OPTIONS_VALUE_ARR = ["---","Windows 10", "Windows 10, WOW64",
                    "Windows 8.1", "Windows 7", "Windows Vista",
                    "Windows XP", "MacOS 10.15.0",
                    "Linux, 64 bit architechture",
                    "Linux, 32 bit architechture", 
                    "Samsung Galaxy S9/Android 10",
                    "iPhone/iOS", "iPad/iOS"];
const OS_UA_CHOICES = ["", "Windows NT 10.0; Win64; x64", "Windows NT 10.0; WOW64",
                    "Windows NT 6.3; Win64; x64",
                    "Windows NT 6.1; Win64; x64", "Windows; U; Windows NT 6.0; en-US",
                    "Windows; U; Windows NT 5.1; en-US", "Macintosh; Intel Mac OS X 10_15",
                    "X11; Linux x64", "X11; Linux x86_64", "Linux; Android 10; SM-G960U",
                    "iPhone; CPU OS 15_2 like Mac OS X", "iPad; CPU OS 15_2 like Mac OS X"];
const BROWSER_OPTIONS_ID_ARR = ["BROWSER-0", "BROWSER_CHROME", "BROWSER_EDGE",
                    "BROWSER_SAFARI", "BROWSER_FF"];
const BROWSER_OPTIONS_VALUE_ARR = ["---" ,"Chrome", "Edge", "Safari", "Firefox"];
const BROWSER_UA_CHOICES = ["", ") AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36", 
                            ") AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5026.0 Safari/537.36 Edg/103.0.1253.0", 
                            ") AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15", 
                            "; rv:100.0) Gecko/20100101 Firefox/100.0"];

// IDs and classes for elements in index.html
const CHOOSE_PRODUCT_ID = "choose-product";
const UA_CHANGES_ID = "ua-changes";
const OS_SELECT_ID = "os-choices";
const BROWSER_SELECT_ID = "browser-choices";
const CHANGES_FORM_ID = "choose-changes";
const UA_STR_P_ID = "ua-str";
const BLANK_SPACE_CLASS = "blank-space";
const COPY_UA_BTN_ID = "copy-ua-button";
const TEST_UA_BTN_ID = "test-ua-button";
const APPLY_CHANGE_BTN_CLASS = "btn-row-2";
const UA_ACTIVITY_BTN_CLASS = "btn-row-1"

// localStorage keys
const ACTUAL_UA_KEY = "actual-ua";
const DEFAULT_UA_KEY = "default-ua";
const ACTUAL_UA_RUNS_KEY = "actual-ua-times-run";

// numbers that are associated with the buttons that apply the displayed user agent in the browser
const OPTION_ALL = 0;
const OPTION_ACTIVE = 1;
const OPTION_RESET = 2;
const OPTION_DEFAULT = 3;
