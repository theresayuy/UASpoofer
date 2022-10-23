function LineBreak() {
    return `<br>`;
}

function TabSpan() {
    return `<span
        class="tab-span"    
    >
       &#9; 
    </span>`;
}

function Section(props) {
    return `<div
        id="${props.id}"
    >
        ${props.innerHTML}
    </div>`;
}

function SelectOptions(props) {
    return `<select
        id="${props.id}"    
    ></select>`;
}

function SelectParent(props) {
    return `<div
        class="select-parent"
    >
        ${props.innerHTML}
    </div>`;
}

function UAStr(props) {
    return `<p
        class="UAStr" id="ua-str"    
    >
        ${props.innerHTML || "Something went wrong."}
    </p>`
}

function ApplyMsg() {
    return `<p
        class="ApplyMsg" id="apply-msg"    
    ></p>`
}

function ButtonRow1(props) {
    return `<button
        id="${props.id}" class="btn-row-1"    
    >
        ${props.innerHTML}
    </button>`;
}

function ButtonRow2(props) {
    return `<button
        id="${props.id}" class="btn-row-2"    
    >
        ${props.innerHTML}
    </button>`;
}

function Option(props) {
    return `<option
        id="${props.id}"
        value="${props.val}"
    >
        ${props.val}
    </option>`
}

