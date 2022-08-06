# UASpoofer
A highly customizable user agent spoofer for desktop chromium based browsers.

![56vro extension](img/readme/no-activity.png)

## How to use this
### Load Packed Extension
1. Download `5v6ro.crx`.
2. Open any Chromium based browser and navigate to [chrome://extensions](chrome://extensions).
3. Turn on developer mode.
4. Select **Load Packed**.
5. Select `5v6ro.crx`.

### Load Unpacked Extension
1. Download a copy of this repository.
2. Open any Chromium based browser and go to [chrome://extensions](chrome://extensions).
3. Turn on developer mode.
4. Select **Load Unpacked**.
5. Select the main folder containing the source code.

### Manually wipe localStorage
You may want to do this right before removing the extension or to fix incorrect user agent data in the extension. Keep in mind that if you still want to use the extension after this, the user agent string that will be set is the one that the browser came with.

1. Open the popup. Right click anywhere on the popup, and select **Inspect**.
2. Select **Console**.
3. Run the following to wipe the information in localStorage:
```javascript
wipeLS();
```
4. Close the extension popup.

## Resources
### Technology
- [JQuery 3.6.0](https://code.jquery.com/jquery-3.6.0.js)
- [This CSS gradient generator tool](https://cssgradient.io/)
- Google material design icons
- [CreepJS](https://abrahamjuliot.github.io/creepjs/) by [abrahamjuliot](https://github.com/abrahamjuliot) to test the user agent

### Tutorials
[W3 schools](https://www.w3schools.com/), [MDN Web Docs](https://developer.mozilla.org/)
