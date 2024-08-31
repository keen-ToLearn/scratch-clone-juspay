export const pinnedBlockExtractor = (pin, combination) => {
    let pinnedComboBlock = pin.block

    if(combination.depth.length == 0 ||
        (combination.depth.length == 1 && combination.aimLevel == 1))
        pinnedComboBlock = pinnedComboBlock.slice(combination.idx)
    else {
        pinnedComboBlock = pinnedComboBlock[combination.idx]
        let depthSize = combination.depth.length
        let nextActionData = pinnedComboBlock
        
        for(let id = 0; id < depthSize - 1; id++) {
            pinnedComboBlock = nextActionData.actionData
            nextActionData = pinnedComboBlock[combination.depth[id + 1]]
        }
        if(combination.depth.length == 1)
            pinnedComboBlock = pinnedComboBlock.actionData
        else if(combination.aimLevel > combination.depth.length)
            pinnedComboBlock = pinnedComboBlock[combination.depth[depthSize - 1]].actionData

        pinnedComboBlock = pinnedComboBlock.slice(combination.aim)
    }

    return pinnedComboBlock
}

export const pinCombinationsUpdator = (newCombo, combination) => {
    let newCombinations = newCombo
    
    if(combination.depth.length == 0 ||
        (combination.depth.length == 1 && combination.aimLevel == 1)) {
        if(combination.idx == 0)
            newCombinations = [
                ...newCombinations.slice(0, combination.combId),
                ...newCombinations.slice(combination.combId + 1)
            ]
        else {
            let modifiedCombo = newCombinations[combination.combId]
            modifiedCombo.block = [
                ...(modifiedCombo.block).slice(0, combination.idx)
            ]

            newCombinations = [
                ...newCombinations.slice(0, combination.combId),
                modifiedCombo,
                ...newCombinations.slice(combination.combId + 1)
            ]
        }
    }
    else {
        let modifiedCombo = newCombinations[combination.combId]
        let idxActionData = modifiedCombo.block[combination.idx]

        let levelActionData = []
        combination.depth.forEach((_, i) => {
            if(idxActionData) {
                levelActionData.push(idxActionData)

                if(i + 1 < combination.depth.length)
                    idxActionData = idxActionData.actionData[combination.depth[i + 1]]
                else
                    idxActionData = null
            }
        })

        let depthSize = combination.depth.length
        let removalDone = false

        for(let i = depthSize - 1; i >= 0; i--) {
            if(i == depthSize - 1) {
                if(combination.depth.length == combination.aimLevel)
                    removalDone = false
                else {
                    let tempActionData = levelActionData[i].actionData
                    tempActionData = [ ...tempActionData.slice(0, combination.aim) ]
                    levelActionData[i].actionData = tempActionData
                    removalDone = true
                }
            }
            else {
                let tempActionData = levelActionData[i].actionData
                if(!removalDone) {
                    tempActionData = [
                        ...tempActionData.slice(0, combination.depth[i + 1])
                    ]
                    removalDone = true
                }
                else
                    tempActionData[combination.depth[i + 1]] = levelActionData[i+1]
                levelActionData[i].actionData = tempActionData
            }
        }

        modifiedCombo.block[combination.idx] = levelActionData[0]

        newCombinations = [
            ...newCombinations.slice(0, combination.combId),
            modifiedCombo,
            ...newCombinations.slice(combination.combId + 1)
        ]
    }

    return newCombinations
}

export const updateCombinationHelper = (currentCombos, combo, block) => {
    let updatedComboList = currentCombos
    let chosenCombo = updatedComboList[combo.combId].block
    
    if(combo.depth.length == 0 || (combo.depth.length == 1 &&
        (combo.depth.length == combo.aimLevel && chosenCombo[combo.idx].actionData.length != 0))) {
        let newChosenCombo = [
            ...chosenCombo.slice(0, combo.idx + 1),
            ...block,
            ...chosenCombo.slice(combo.idx + 1)
        ]
        chosenCombo = newChosenCombo
        updatedComboList[combo.combId].block = chosenCombo
    }
    else if(combo.depth.length == 1) {
        let idxActionData = chosenCombo[combo.idx].actionData
        idxActionData = [
            ...idxActionData.slice(0, combo.aim + 1),
            ...block,
            ...idxActionData.slice(combo.aim + 1)
        ]
        chosenCombo[combo.idx].actionData = idxActionData
        updatedComboList[combo.combId].block = chosenCombo
    }
    else {
        let idxActionData = chosenCombo[combo.idx]

        let levelActionData = []
        combo.depth.forEach((_, i) => {
            if(idxActionData) {
                levelActionData.push(idxActionData)

                if(i + 1 < combo.depth.length)
                    idxActionData = idxActionData.actionData[combo.depth[i + 1]]
                else
                    idxActionData = null
            }
        })

        let depthSize = combo.depth.length
        let blockPlaced = false

        for(let i = depthSize - 1; i >= 0; i--) {
            if(i == depthSize - 1) {
                if(depthSize == combo.aimLevel && (levelActionData[i].actionData.length != 0))
                    blockPlaced = false
                else {
                    let tempActionData = levelActionData[i].actionData
                    tempActionData = [
                        ...tempActionData.slice(0, combo.aim + 1),
                        ...block,
                        ...tempActionData.slice(combo.aim + 1)
                    ]
                    levelActionData[i].actionData = tempActionData
                    blockPlaced = true
                }
            }
            else {
                let tempActionData = levelActionData[i].actionData
                tempActionData[combo.depth[i + 1]] = levelActionData[i+1]
                
                if(!blockPlaced) {
                    tempActionData.splice(combo.depth[i + 1] + 1, 0, ...block)
                    blockPlaced = true
                }
                levelActionData[i].actionData = tempActionData
            }
        }

        updatedComboList[combo.combId].block[combo.idx] = levelActionData[0]
    }

    return updatedComboList
}