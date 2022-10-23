const BROWSER_OPTIONS = [
    {
        val: "BROWSERS", 
        id:"BROWSER---0", 
        ua: ""
    },
    {
        val: "Chrome 104.0.0.0", 
        id: "BROWSER---chrome104-0-0-0", 
        ua: ") AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"        
    },
    {
        val: "Chrome 103.0.0.0", 
        id: "BROWSER---chrome103-0-0-0", 
        ua: ") AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"
    },
    {
        val: "Edge 103.0.5026.0", 
        id: "BROWSER---edge103-0-5026-0", 
        ua: ") AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5026.0 Safari/537.36 Edg/103.0.1253.0"
    },
    {
        val: "Safari 15.4", 
        id: "BROWSER---safari15-4", 
        ua: ") AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15"
    },
    {
        val: "Firefox 103.0", 
        id: "BROWSER---ff103-0", 
        ua: "; rv:103.0) Gecko/20100101 Firefox/103.0"
    },
    {
        val: "Firefox 101.0", 
        id: "BROWSER---ff101-0", 
        ua: "; rv:101.0) Gecko/20100101 Firefox/101.0"
    },
    {
        val: "Firefox 52.0", 
        id: "BROWSER---ff52-0",
        ua: "; rv:52.0) Gecko/20100101 Firefox/52.0"
    }
]; // Browser user agent options

const OS_OPTIONS = [
    {
        val: "DEVICES/OPERATING SYSTEMS", 
        id:"OS---0", 
        ua: ""
    },
    {
        val: "Windows 10", 
        id: "OS---win10", 
        ua: "Windows NT 10.0; Win64; x64"
    },
    {
        val: "Windows 10 WoW64", 
        id: "OS---win10--wow64", 
        ua: "Windows NT 10.0; WOW64"
    },
    {
        val: "Windows 8.1", 
        id: "OS---win8-1", 
        ua: "Windows NT 6.3; Win64; x64"
    },
    {
        val: "Windows 7", 
        id: "OS---win7", 
        ua: "Windows NT 6.1; Win64; x64"
    },
    {
        val: "Windows Vista", 
        id: "OS---winvista", 
        ua: "Windows; U; Windows NT 6.0; en-US"
    },
    {
        val: "Windows XP", 
        id: "OS---winxp", 
        ua: "Windows; U; Windows NT 5.1; en-US"
    },
    {
        val: "MacOS 10.15.0", 
        id:"OS---macos10-15-0", 
        ua: "Macintosh; Intel Mac OS X 10_15"
    },
    {
        val: "Linux x86_64", 
        id:"OS---linux--x8664", 
        ua: "X11; Linux x86_64"
    },
    {
        val: "Linux i686", 
        id: "OS---linux--i686", 
        ua: "X11; Linux i686"
    },
    {
        val: "Linux aarch64", 
        id: "OS---linux--aarch64", 
        ua: "X11; Linux aarch64"
    },
    {
        val: "Samsung Galaxy A7/Android 8.0.0", 
        id:"OS---android8-0-0---SMA750FN", 
        ua: "Linux; Android 8.0.0; SM-A750FN"
    },
    {
        val: "Generic/Android 10", 
        id: "OS---andrdoid10---generic", 
        ua: "Linux; Android 10; K"
    },
    {
        val: "Samsung Galaxy S9/Android 10", 
        id: "OS---android10---smg960u", 
        ua: "Linux; Android 10; SM-G960U"
    },
    {
        val: "Pixel 6 Pro/Android 12", 
        id: "OS---android12---p6p", 
        ua: "Linux; Android 12; Pixel 6 Pro"
    },
    {
        val: "iPhone/iOS 15.2", 
        id: "OS---ios15-2---iphone", 
        ua: "iPhone; CPU OS 15_2 like Mac OS X"
    }, 
    {
        val: "iPad/iOS 15.2", 
        id: "OS---ios15-2---ipad", 
        ua: "iPad; CPU OS 15_2 like Mac OS X"
    },
    {
        val: "Xbox One", 
        id: "OS---win10---xboxone", 
        ua: "Windows NT 10.0; Win64; x64; Xbox; Xbox One"
    }
]; // OS user agent options