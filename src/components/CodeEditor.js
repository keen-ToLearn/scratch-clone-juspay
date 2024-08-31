import React, { useEffect, useState } from "react";
import Sidebar from "./layout/Sidebar";
import MidArea from "./layout/MidArea";
import PreviewArea from "./layout/PreviewArea";
import "../styles/codeEditor.css";
import Icon from "./visual/Icon";
import CatSprite from "./visual/CatSprite";
import First from "./visual/First";
import Second from "./visual/Second";
import Third from "./visual/Third";
import Fourth from "./visual/Fourth";
import Fifth from "./visual/Fifth";
import Sixth from "./visual/Sixth";
import DragBlock from "./DragBlock";
import { SpriteActionsContext } from "../contexts/SpriteActionsContext";
import { gotoTrigger, moveTrigger, turnTrigger } from "../utilities/motionHandlers";
import { costumeTrigger, resizeTrigger, speakTrigger } from "../utilities/lookHandlers";
import CostumeArea from "./layout/CostumeArea";
import { pinCombinationsUpdator, pinnedBlockExtractor, updateCombinationHelper } from "../utilities/combinationHelpers";

const CodeEditor = () => {
    // editor states like - Run, Stop, change Section
    const [run, setRun] = useState(false);
    const [section, setSection] = useState(0); // 0 - Code, 1 - Costume, 2 - Replay

    // costume states
    const [costumes, setCostumes] = useState([
        CatSprite,
        First,
        Second,
        Third,
        Fourth,
        Fifth,
        Sixth
    ]);
    const [inUse, setInUse] = useState(0);

    // sprite related
    const [spriteAt, setSpriteAt] = useState({
        x: 0,
        y: 0,
        deg: 0
    });
    const [spriteClicked, setSpriteClicked] = useState(false);
    const [spritePinned, setSpritePinned] = useState(false);

    const [speak, setSpeak] = useState(null);
    const [spriteSize, setSpriteSize] = useState(1);

    // block drag related
    const [block, setBlock] = useState(null);
    const [blockAt, setBlockAt] = useState({ x: 0, y: 0 });

    const [combinations, setCombinations] = useState([]);
    const [combinationPinned, setCombinationPinned] = useState(null);

    // methods for editor states like Run, Section change
    const triggerRun = () => { setRun(true) }
    const stopRun = () => { setRun(false) }

    const changeSection = sec => { setSection(sec) }

    // costume related methods, update list, change sprite
    const addCostume = newCostume => {
        setCostumes(costumes => [ ...costumes, () => (
            <img src={newCostume} alt="newCostume" />
        ) ])
    }

    const changeCostume = to => {
        if(to < costumes.length)
            setInUse(to)
    }

    // methods related to sprite
    const updateSpritePos = to => {
        setSpriteAt(pos => ({ ...pos,
            x: to.x,
            y: to.y,
            deg: to.deg
        }))
    }

    const clickTheSprite = () => {
        setSpriteClicked(true)
        triggerRun()
    }

    const pinTheSprite = should => { setSpritePinned(should) }

    const makeSpriteSpeak = speak => {
        setSpeak(said => (speak && said ? { ...said,
            act: speak.act,
            speakWhat: speak.speakWhat
        } : speak))
    }

    const resizeSprite = size => { setSpriteSize(size) }

    // block methods, that is being dragged
    const pickBlock = block => { setBlock(block) }

    const initializeBlockPos = (xPos, yPos) => { setBlockAt({ x: xPos, y: yPos }) }

    const handleBlockMove = event => {
        if(block)
            setBlockAt({ x: event.clientX, y: event.clientY })
    }

    const handleBlockReleaseOutsideDrop = event => {
        pickBlock(null)
        setBlockAt({ x: 0, y: 0 })

        if(combinationPinned != null)
            pinTheCombination(null)
    }

    const createCombination = combination => {
        setCombinations(combinations => [ ...combinations, combination ])
    }

    const pinTheCombination = combination => {
        setCombinationPinned(combination)
        
        if(combination) {
            // set the block, also update the combinations
            let pinnedComboBlock = JSON.parse(JSON.stringify(combinations[combination.combId]))
            pickBlock(pinnedBlockExtractor(pinnedComboBlock, combination))

            let newCombinations = JSON.parse(JSON.stringify(combinations))
            setCombinations(pinCombinationsUpdator(newCombinations, combination))
        }
    }

    const releasePinOnCombination = combo => {
        // use block and combo to add block in correct combo
        if(!block || ['flag', 'sprite'].includes(block[0].what))
            return
        
        let updatedComboList = JSON.parse(JSON.stringify(combinations))
        
        setCombinations(updateCombinationHelper(updatedComboList, combo, block))
        handleBlockReleaseOutsideDrop()
    }

    // action methods - motion, looks, control, events
    const spriteMotionTrigger = func => {
        let spritePos = null

        if(func.what == 'move')
            spritePos = moveTrigger(spriteAt, func.options.dir, func.options.units)
        else if(func.what == 'turn')
            spritePos = turnTrigger(spriteAt, func.options)
        else
            spritePos = gotoTrigger(spriteAt, func.options)
        
        updateSpritePos(spritePos)
    }

    const spriteLooksTrigger = async (func) => {
        if(['say', 'think'].includes(func.what)) {
            makeSpriteSpeak({ act: func.what, speakWhat: func.default })
            if(func.timed)
                makeSpriteSpeak(await speakTrigger(func.time))
        }
        else if(func.what == 'costume')
            changeCostume(costumeTrigger(func.next, func.which, costumes.length, inUse))
        else
            resizeSprite(resizeTrigger(spriteSize, func.definite, func.to))
    }

    return (
        <div className="bg-blue-100 font-sans h-screen">
            <div className="h-12 flex flex-row items-center">
                <div className="self-stretch mt-2 items-center">
                    <button type="button" className={`h-full px-3 rounded-t-lg border-t-2
                        border-r-2 flex flex-row items-center text-${section == 0 ? 'purple-500' : 'gray-400'}
                        bg-${section == 0 ? 'white' : 'gray-100'}`}
                        onClick={() => changeSection(0)}>
                        <Icon name="code" size={15} className="mr-1" />
                        <span className="font-semibold">Code</span>
                    </button>
                </div>
                <div className="self-stretch mt-2 items-center">
                    <button type="button" className={`h-full px-3 rounded-t-lg border-t-2
                        border-r-2 flex flex-row items-center text-${section == 1 ? 'purple-500' : 'gray-400'}
                        bg-${section == 1 ? 'white' : 'gray-100'}`}
                        onClick={() => changeSection(1)}>
                        <Icon name="paint-brush" size={15} className="mr-1" />
                        <span className="font-semibold">Costume</span>
                    </button>
                </div>
                <div className="self-stretch mt-2 items-center">
                    <button type="button" className={`h-full px-3 rounded-t-lg border-t-2
                        border-r-2 flex flex-row items-center text-${section == 2 ? 'purple-500' : 'gray-400'}
                        bg-${section == 2 ? 'white' : 'gray-100'}`}
                        onClick={() => changeSection(2)}>
                        <Icon name="stream" size={15} className="mr-1" />
                        <span className="font-semibold">Replay</span>
                    </button>
                </div>
                
                {section == 0 &&
                <div className="ml-auto mr-5 cursor-pointer" onClick={triggerRun}>
                    <Icon name="flag" className="text-green-600" />
                </div>}
                {section == 0 &&
                <div className="mr-12 cursor-pointer" onClick={stopRun}>
                    <Icon name="stop" className="text-red-600" />
                </div>}
            </div>
            {section == 0 ?
            <div className="playground flex flex-row" onMouseMove={event => handleBlockMove(event)}
                onMouseUp={event => handleBlockReleaseOutsideDrop(event)}>
                <div className="flex-1 overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-r-xl mr-1">
                    <SpriteActionsContext.Provider value={{
                        spriteMotionTrigger: (func) => spriteMotionTrigger(func),
                        spriteLooksTrigger: (func) => spriteLooksTrigger(func),
                        pickBlock: (block) => pickBlock(block),
                        initializeBlockPos: (xPos, yPos) => initializeBlockPos(xPos, yPos)
                    }}>
                        <Sidebar />
                        <MidArea block={block} combinations={combinations}
                            createCombination={combination => createCombination(combination)}
                            pinTheCombination={combination => pinTheCombination(combination)}
                            pickBlock={block => pickBlock(block)}
                            releasePinOnCombination={combo => releasePinOnCombination(combo)} />
                    </SpriteActionsContext.Provider>
                </div>
                <div className="w-1/3 overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-l-xl ml-1">
                    <PreviewArea costumes={costumes} inUse={inUse} spriteAt={spriteAt}
                        updateSpritePos={to => updateSpritePos(to)} clickTheSprite={() => clickTheSprite()}
                        pinTheSprite={should => pinTheSprite(should)} spritePinned={spritePinned}
                        speak={speak} spriteSize={spriteSize} />
                </div>
                {block != null &&
                    <div className="absolute" style={{
                        top: blockAt.y + 2,
                        left: blockAt.x + 2,
                    }}>
                        <DragBlock block={block} />
                    </div>}
            </div> : (section == 1 ?
            <div className="playground flex flex-row">
                <div className="flex-1 h-full overflow-auto flex flex-row bg-white border-t border-r border-gray-200 rounded-r-xl mr-4">
                    <CostumeArea costumes={costumes} addCostume={newCostume => addCostume(newCostume)}
                        inUse={inUse} changeCostume={to => changeCostume(to)} />
                </div>
            </div> :
            <div className="playground flex flex-row"></div>)}
        </div>
    );
}

export default CodeEditor;