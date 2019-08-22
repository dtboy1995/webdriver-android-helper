# webdriver-android-helper
:black_square_button: a webdriver android helper with zero dependences

[![NPM](https://nodei.co/npm/webdriver-android-helper.png?compact=true)](https://npmjs.org/package/webdriver-android-helper)

### install
```
npm i webdriver-android-helper -S
```

### usage
```js
const wd = require('webdriverio')
const driver = wd.remote({})
const WdAndroidHelper = require('webdriver-android-helper')
const helper = new WdAndroidHelper(driver)

```

| name | desc |
| - | - |
|`isElFinded` | Determine whether an element is found | 
|`isElsFinded` | Determine whether a set of elements is found | 
|`androidId` | Generate androidId selectors for webdriver | 
|`findElById` | Find element by Android Id | 
|`findElByXpath` | Find element by Xpath | 
|`findElsById` | Find elements by Android Id | 
|`findElsByXpath` | Find elements by Xpath | 
|`findElByIdAndClick` | Find element by Android Id And Click it | 
|`findElByXpathAndClick` | Find element by Xpath And Click it | 
|`waitElFinded` | Waiting for the element to be found | 
|`waitElsFinded` | Waiting for the elements to be found  | 
|`waitActivityResumed` | Waiting for the Activity Resume  | 
|`waitActivityDestroy` | Waiting for the Activity Destroy | 
|`slideOnElement` | Slide on element by direction | 
|`slideOnScreen` | Slide on screen by direction | 
|`setTextAndTriggerChange` | set text and trigger change event on EditText | 
|`backToActivity` | Back to the designated Activity  | 

### sample
```js
const wdio = require('webdriverio')
const WdAndroidHelper = require('webdriver-android-helper')
/**
* start a ss android client
*/
async function startSs(
    device,
    ip,
    port,
    password,
    encrypt,
    debug = true,
    systemPort = 8203) {
    let driver
    try {
        driver = await wdio.remote({
            port: 4723,
            capabilities: {
                "platformName": "Android",
                "platformVersion": "5",
                "deviceName": device,
                "appPackage": "com.github.shadowsocks",
                "appActivity": ".MainActivity",
                "automationName": "UiAutomator2",
                "noReset": true,
                "udid": device,
                "autoGrantPermissions": true,
                "systemPort": systemPort
            },
            logLevel: !debug ? 'silent' : 'trace'
        })
        const helper = new WdAndroidHelper(driver)
        await driver.unlock()
        // wait enter MainActivity
        await helper.waitActivityResumed('.MainActivity')
        await driver.pause(1500)
        // start edit 
        await helper.findElByIdAndClick('com.github.shadowsocks:id/edit')
        await driver.pause(2000)
        // set ip
        await helper.findElByXpathAndClick('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.View/android.widget.LinearLayout[3]/android.widget.RelativeLayout')
        await driver.pause(2000)
        const ipInput = await helper.findElByIdAndClick('android:id/edit')
        await ipInput.setValue(ip)
        await driver.pause(1500)
        await helper.findElByIdAndClick('android:id/button1')
        await driver.pause(2000)
        // set port
        await helper.findElByXpathAndClick('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.View/android.widget.LinearLayout[4]/android.widget.RelativeLayout')
        await driver.pause(2000)
        const portInput = await helper.findElByIdAndClick('android:id/edit')
        await portInput.setValue(port)
        await driver.pause(1500)
        await helper.findElByIdAndClick('android:id/button1')
        await driver.pause(2000)
        // set password
        await helper.findElByXpathAndClick('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.View/android.widget.LinearLayout[5]/android.widget.RelativeLayout/android.widget.TextView[2]')
        await driver.pause(2000)
        const passInput = await helper.findElByIdAndClick('android:id/edit')
        await passInput.setValue(password)
        await driver.pause(1500)
        await helper.findElByIdAndClick('android:id/button1')
        await driver.pause(2000)
        // set encrypt
        await helper.findElByXpathAndClick('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.View/android.widget.FrameLayout[1]/android.widget.LinearLayout/android.widget.RelativeLayout')
        let finded = false
        while (!finded) {
            const encryptViews = await helper.findElsById('android:id/text1')
            for (let i = 0; i < encryptViews.length; i++) {
                const encryptView = encryptViews[i];
                const encryptText = await encryptView.getText()
                if (encryptText === encrypt.toUpperCase()) {
                    await encryptView.click()
                    finded = true
                    break
                }
            }
            if (!finded) {
                const container = await helper.findElByXpath('/hierarchy/android.widget.FrameLayout/android.view.View')
                await helper.slideOnElement(container, 'top')
                await driver.pause(2000)
            }
        }
        await helper.findElByIdAndClick('com.github.shadowsocks:id/action_apply')
        await helper.waitActivityDestroy('.ProfileConfigActivity')
        await driver.pause(2000)
        // start
        await helper.findElByIdAndClick('com.github.shadowsocks:id/fab')

    } catch (err) {
        console.log(err)
    }
    await driver.pause(5000)
    await driver.deleteSession()
}
```
