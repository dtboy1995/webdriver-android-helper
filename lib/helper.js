class Helper {

    constructor(driver) {
        this.driver = driver
    }

    async moment(min = 1000, max = 3000) {
        return this.driver.pause(parseInt(Math.random() * (max - min + 1) + min, 10))
    }

    isElFinded(element) {
        return (element && !element.error)
    }

    isElsFinded(elements) {
        return (elements && !elements.error && elements.length > 0)
    }

    androidId(android_id) {
        return `android=resourceId("${android_id}")`
    }

    async findElById(android_id, parent) {
        const base = parent || this.driver
        return await base.$(this.androidId(android_id))
    }

    async findElByXpath(xpath, parent) {
        const base = parent || this.driver
        return await base.$(xpath)
    }

    async findElsById(android_id, parent) {
        const base = parent || this.driver
        return await base.$$(this.androidId(android_id))
    }

    async findElsByXpath(xpath, parent) {
        const base = parent || this.driver
        return await base.$$(xpath)
    }

    async findElByIdAndClick(android_id, timeout = 500, parent) {
        const element = await this.findElById(android_id, parent)
        await this.driver.pause(timeout)
        await element.click()
        return element
    }

    async findElByIdAndSetText(android_id, text, timeout = 500, parent) {
        const element = await this.findElById(android_id, parent)
        await this.driver.pause(timeout)
        await element.setValue(text)
        await this.driver.pause(timeout)
        return element
    }

    async findElByXpathAndClick(xpath, timeout = 500, parent) {
        const element = await this.findElByXpath(xpath, parent)
        await this.driver.pause(timeout)
        await element.click()
        return element
    }

    async findElByXpathAndSetText(xpath, text, timeout = 500, parent) {
        const element = await this.findElByXpath(xpath, parent)
        await this.driver.pause(timeout)
        await element.setValue(text)
        await this.driver.pause(timeout)
        return element
    }

    async waitElFinded(selector, parent, timeout = 5 * 1000) {
        let element
        let base = parent || this.driver
        await this.driver.waitUntil(async () => {
            element = await base.$(selector)
            return this.isElFinded(element)
        }, timeout)
        return element
    }

    async waitElsFinded(selector, parent, timeout = 5 * 1000) {
        let elements
        let base = parent || this.driver
        await this.driver.waitUntil(async () => {
            elements = await base.$$(selector)
            return this.isElsFinded(elements)
        }, timeout)
        return elements
    }

    async  waitActivityResumed(activity, timeout = 10 * 1000) {
        await this.driver.waitUntil(async () => {
            const name = await this.driver.getCurrentActivity()
            return activity === name
        }, timeout)
    }

    async  waitActivityDestroy(activity, timeout = 10 * 1000) {
        await this.driver.waitUntil(async () => {
            const name = await this.driver.getCurrentActivity()
            return name !== activity
        }, timeout)
    }

    /*---------------------private methods--------------------------*/
    async _calculateSlide(x, y, width, height, direction, threshold) {
        if (direction == 'bottom' || direction == 'top' || direction == 'left' || direction == 'right') {
            let fx, fy, tx, ty
            if (direction == 'top') {
                fx = tx = x + parseInt(width / 2)
                fy = y + height - threshold
                ty = y + threshold
            } else if (direction == 'bottom') {
                fx = tx = x + parseInt(width / 2)
                ty = y + height - threshold
                fy = y + threshold
            } else if (direction == 'left') {
                fy = ty = y + parseInt(height / 2)
                fx = x + threshold
                tx = x + width - threshold
            } else if (direction == 'right') {
                fy = ty = y + parseInt(height / 2)
                tx = x + threshold
                fx = x + width - threshold
            }
            await this.driver.touchPerform([{
                action: 'press',
                options: { x: fx, y: fy },
            }, {
                action: 'wait',
                options: { ms: 1000 },
            }, {
                action: 'moveTo',
                options: { x: tx, y: ty },
            }, {
                action: 'release',
            }])
        }
    }
    /*--------------------------------------------------------------*/

    async slideOnElement(element, direction = 'top', threshold = 20) {
        const { x, y } = await element.getLocation()
        const { width, height } = await element.getSize()
        await this._calculateSlide(x, y, width, height, direction, threshold)
    }

    async slideOnScreen(direction = 'top', threshold = 100) {
        const { width, height } = await this.driver.getWindowRect()
        await this._calculateSlide(0, 0, width, height, direction, threshold)
    }

    async setTextAndTriggerChange(element, text, timeout = 500) {
        await element.setValue(text)
        await this.driver.pause(timeout)
        await this.driver.pressKeyCode(62)
        await this.driver.pause(timeout)
        await this.driver.pressKeyCode(4)
    }

    async backToActivity(activity, depth = 10, tstart = 1000, tend = 3000) {
        while (depth-- > 0) {
            const name = await this.driver.getCurrentActivity()
            if (name == activity) {
                return name
            } else {
                await this.driver.pause(tstart)
                await this.driver.back()
                await this.driver.pause(tend)
            }
        }
    }

    async findElByMatcherInViews(containerSelector, itemsSelector, matcher, handler, maxTrys = 5) {
        const containerIsAndriod = containerSelector.indexOf(':id/') >= 0
        const itemsIsAndriod = itemsSelector.indexOf(':id/') >= 0
        const container = containerIsAndriod ? await this.findElById(containerSelector) : await this.findElByXpath(containerSelector)
        let element
        let finded = false
        while (!finded) {
            const items = itemsIsAndriod ? await this.findElsById(itemsSelector) : await this.findElsByXpath(itemsSelector)
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const checkResult = await matcher(item)
                if (checkResult) {
                    element = item
                    finded = true
                    break
                }
            }
            if (!finded) {
                await this.slideOnElement(container, 'top')
                await this.moment()
            } else {
                await handler(element)
                break
            }
            maxTrys--
            if (maxTrys <= 0) {
                break
            }
        }
        return element
    }
}

module.exports = Helper
