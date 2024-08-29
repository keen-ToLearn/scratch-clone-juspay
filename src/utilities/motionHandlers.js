export const moveTrigger = (spriteAt, dir, units) => {
    let spritePos = JSON.parse(JSON.stringify(spriteAt))
    let initDeg = spritePos.deg
    
    if(dir == 'r' || (dir == 'm' && spritePos.deg == 0))
        spritePos.x += units
    else if(dir == 'l' || (dir == 'm' && spritePos.deg == 180))
        spritePos.x -= units
    else if(dir == 'u' || (dir == 'm' && spritePos.deg == 270))
        spritePos.y -= units
    else if(dir == 'd' || (dir == 'm' && spritePos.deg == 90))
        spritePos.y += units
    else {
        let resultPlane = 0
        if(spritePos.deg < 90)
            resultPlane = 4
        else if(spritePos.deg < 180) {
            resultPlane = 3
            spritePos.deg = 180 - spritePos.deg
        }
        else if(spritePos.deg < 270) {
            resultPlane = 2
            spritePos.deg -= 180
        }
        else if(spritePos.deg < 360) {
            resultPlane = 1
            spritePos.deg = 360 - spritePos.deg
        }

        let xChange = (units * Math.cos(spritePos.deg * Math.PI / 180))
        let yChange = (units * Math.sin(spritePos.deg * Math.PI / 180))

        if([1, 2].includes(resultPlane))
            spritePos.y -= yChange
        else
            spritePos.y += yChange

        if([1, 4].includes(resultPlane))
            spritePos.x += xChange
        else
            spritePos.x -= xChange
    }

    spritePos.deg = initDeg

    return spritePos
}

export const turnTrigger = (spriteAt, turnOps) => {
    let spritePos = JSON.parse(JSON.stringify(spriteAt))

    if(turnOps.reset)
        spritePos.deg = 0
    else if(turnOps.dir == 'r')
        spritePos.deg += turnOps.deg
    else
        spritePos.deg -= turnOps.deg

    return spritePos
}

export const gotoTrigger = (spriteAt, gotoOps) => {
    let spritePos = JSON.parse(JSON.stringify(spriteAt))

    if(gotoOps.random) {
        let xMulti = Math.round(Math.random())
        let yMulti = Math.round(Math.random())

        spritePos.x = (xMulti == 0 ? 1 : -1) * Number((Math.random()*200).toFixed())
        spritePos.y = (yMulti == 0 ? 1 : -1) * Number((Math.random()*200).toFixed())

        spritePos.x = (spritePos.x < 0 ? 0 : spritePos.x)
        spritePos.y = (spritePos.y < 0 ? 0 : spritePos.y)
    }
    else {
        spritePos.x = gotoOps.x
        spritePos.y = gotoOps.y
    }

    return spritePos
}