const HTML_BR = {
    tag:"br", 
    class: null, 
    id: null, 
    value: null, 
    innerHTML: null
}; // the br element will be added frequently
const HTML_TAB_SPAN = {
    tag: "span", 
    class: "tab-span", 
    innerHTML: "&#9;", 
    id: null, 
    value: null
};

// some info about HTML elements whose id or class are frequently accessed in this program
const HTML_CHOOSE_PRODUCT = {
    tag: "div", 
    id: "div-choose-product", 
    class: null, 
    value: null, 
    innerHTML: null
};
const HTML_UA_CHANGES = {
    tag: "div", 
    id: "div-ua-changes",
    class: null, 
    value: null, 
    innerHTML: null
};
const HTML_SELECT_OS_PARENT = {
    tag: "div",
    class: "select-parent",
    value: null,
    id: "select-os-parent",
    innerHTML: null
};
const HTML_SELECT_BROWSER_PARENT = {
    tag: "div",
    class: "select-parent",
    value: null,
    id: "select-browser-parent",
    innerHTML: null
};
const HTML_SELECT_OS = {
    tag: "select", 
    id: "select-os-choice",
    class: null, 
    value: null, 
    innerHTML: null
};
const HTML_SELECT_BROWSER = {
    tag: "select", 
    id: "select-browser-choice",
    class: null, 
    value: null, 
    innerHTML: null
};
const HTML_P_UA_STR = {
    tag: "p", 
    id: "ua-str", 
    innerHTML: "something went wrong", // means UA str was not retrieved from localStorage properly
    class: null, 
    value: null
};
const HTML_P_APPLY_MSG = {
    tag: "p", 
    id: "apply-msg", 
    innerHTML: null,
    class: null, 
    value: null
};
const HTML_BTN_COPY_UA = {
    tag: "button", 
    id: "copy-ua-btn", 
    class: "btn-row-1",
    innerHTML: "COPY", 
    value: null
};
const HTML_BTN_TEST_UA = {
    tag: "button", 
    id: "test-ua-btn", 
    value: null,
    class: HTML_BTN_COPY_UA.class,
    innerHTML: "TEST"
};
const HTML_BTN_APPLY_ALL = {
    tag: "button", 
    id: "change-apply-all", 
    class: "btn-row-2",
    innerHTML: "APPLY TO ALL WINDOWS", 
    value: null
};
const HTML_BTN_RESET = {
    tag: "button", 
    id: "change-reset", 
    class: HTML_BTN_APPLY_ALL.class,
    innerHTML: "RESET", 
    value: null
};
