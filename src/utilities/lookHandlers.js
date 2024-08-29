export const speakTrigger = time => {
    return new Promise(resolve => {
        setTimeout(() => { resolve(null) }, time * 1000)
    })
}

export const costumeTrigger = (next, which, count, inUse) => {
    let id = inUse
    
    if(next)
        id = (inUse + 1) % count
    else
        id = which
    
    return id
}

export const resizeTrigger = (size, definite, to) => {
    let newSize = size

    if(definite && to < 0)
        newSize = 1
    else if(definite)
        newSize = to/100
    else
        newSize += to/100
    
    if(newSize < 0)
        newSize = 1
    
    return newSize
}