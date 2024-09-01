export const waitForSprite = time => {
    return new Promise(resolve => {
        setTimeout(() => { resolve(true) }, time * 1000)
    })
}