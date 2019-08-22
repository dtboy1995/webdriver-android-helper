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
|`setElTextAndPressSB` | set text and trigger change event on EditText | 
|`backToActivity` | Back to the designated Activity  | 
|`findElByIdAndSetText` | Find element by Android Id And set text | 
|`findElByXpathAndSetText` | Find element by xpath And set text | 
|`moment` | wait for between 1s - 3s | 
|`findElByMatcherInViews` | find element in listviews by matcher function | 
### sample
```js
const wdio = require('webdriverio')
const WdAndroidHelper = require('webdriver-android-helper')
// sample to Init ss client
async function startSs() {
    let driver
    try {
        driver = await wdio.remote({
            port: 4723,
            capabilities: {
                "platformName": "Android",
                "platformVersion": "5",
                "deviceName": 'emulator-555',
                "appPackage": "com.github.shadowsocks",
                "appActivity": ".MainActivity",
                "automationName": "UiAutomator2",
                "noReset": true,
                "udid": 'emulator-555',
                "autoGrantPermissions": true,
                "systemPort": 8203
            },
            logLevel: !debug ? 'silent' : 'error'
        })
        const helper = new WdAndroidHelper(driver)
        await driver.unlock()
        // wait MainActivity
        await helper.waitActivityResumed('.MainActivity')
        await helper.moment()
        // start edit 
        await helper.findElByIdAndClick('com.github.shadowsocks:id/edit')
        await helper.moment()
        // set ip
        await helper.findElByXpathAndClick('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.View/android.widget.LinearLayout[3]/android.widget.RelativeLayout')
        await helper.moment()
        await helper.findElByIdAndSetText('android:id/edit', 'ssr ip')
        await helper.moment()
        await helper.findElByIdAndClick('android:id/button1')
        await helper.moment()
        // set port
        await helper.findElByXpathAndClick('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.View/android.widget.LinearLayout[4]/android.widget.RelativeLayout')
        await helper.moment()
        await helper.findElByIdAndSetText('android:id/edit', 'ssr port')
        await helper.moment()
        await helper.findElByIdAndClick('android:id/button1')
        await helper.moment()
        // set password
        await helper.findElByXpathAndClick('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.View/android.widget.LinearLayout[5]/android.widget.RelativeLayout/android.widget.TextView[2]')
        await helper.moment()
        await helper.findElByIdAndSetText('android:id/edit', 'ssr password')
        await helper.moment()
        await helper.findElByIdAndClick('android:id/button1')
        await helper.moment()
        // set encrypt
        await helper.findElByXpathAndClick('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.View/android.widget.FrameLayout[1]/android.widget.LinearLayout/android.widget.RelativeLayout')
        await helper.moment()
        await helper.findElByMatcherInViews('/hierarchy/android.widget.FrameLayout/android.view.View', 'android:id/text1', async (item) => {
            const text = await item.getText()
            return text === 'ssr encrypt type'.toUpperCase()
        }, async (item) => {
            await item.click()
        })
        await helper.findElByIdAndClick('com.github.shadowsocks:id/action_apply')
        await helper.waitActivityDestroy('.ProfileConfigActivity')
        await helper.moment()
        // final start
        await helper.findElByIdAndClick('com.github.shadowsocks:id/fab')
    } catch (err) {
        console.log(err)
    }
    await driver.pause(5000)
    await driver.deleteSession()
}
```
