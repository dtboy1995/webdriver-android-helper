# webdriver-android-helper
:black_square_button: a webdriver android helper with zero dependences

[![NPM](https://nodei.co/npm/webdriver-android-helper.png?compact=true)](https://npmjs.org/package/webdriver-android-helper)

### install
```
npm i webdriver-android-helper -S
```

# usage
```js
const wd = require('webdriverio')
const driver = wd.remote({})
const WdAndroidHelper = require('webdriver-android-helper')
const helper = new WdAndroidHelper(driver)

```

name | desc |
- | :-: |
`isElFinded` | Determine whether an element is found | 
`isElsFinded` | Determine whether a set of elements is found | 
`androidId` | Generate androidId selectors for webdriver | 
`findElById` | Find element by Android Id | 
`findElByXpath` | Find element by Xpath | 
`findElsById` | Find elements by Android Id | 
`findElsByXpath` | Find elements by Xpath | 
`findElByIdAndClick` | Find element by Android Id And Click it | 
`findElByXpathAndClick` | Find element by Xpath And Click it | 
`waitElFinded` | Waiting for the element to be found | 
`waitElsFinded` | Waiting for the elements to be found  | 
`waitActivityResumed` | Waiting for the Activity Resume  | 
`waitActivityDestroy` | Waiting for the Activity Destroy | 
`slideOnElement` | Slide on element by direction | 
`slideOnScreen` | Slide on screen by direction | 
`setTextAndTriggerChange` | set text and trigger change event on EditText | 
`backToActivity` | Back to the designated Activity  | 