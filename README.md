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

-------

```
MIT License

Copyright (c) 2019 dtboy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```