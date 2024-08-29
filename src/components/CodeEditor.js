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

const CodeEditor = () => {
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

    const triggerRun = () => { setRun(true) }
    const stopRun = () => { setRun(false) }

    const changeSection = sec => { setSection(sec) }

    const changeCostume = to => {
        if(to < costumes.length)
            setInUse(to)
    }

    const updateSpritePos = to => { setSpriteAt(to) }

    const clickTheSprite = () => {
        setSpriteClicked(true)
        triggerRun()
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
                    <Icon name="play" className="text-green-600" />
                </div>}
                {section == 0 &&
                <div className="mr-12 cursor-pointer" onClick={stopRun}>
                    <Icon name="stop" className="text-red-600" />
                </div>}
            </div>
            {section == 0 ?
            <div className="playground flex flex-row">
                <div className="flex-1 overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-r-xl mr-1">
                    <Sidebar />
                    <MidArea />
                </div>
                <div className="w-1/3 overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-l-xl ml-1">
                    <PreviewArea costumes={costumes} inUse={inUse} spriteAt={spriteAt}
                        updateSpritePos={to => updateSpritePos(to)}
                        clickTheSprite={() => clickTheSprite()} />
                </div>
            </div> : (section == 1 ?
            <div className="playground flex flex-row"></div> :
            <div className="playground flex flex-row"></div>)}
        </div>
    );
}

export default CodeEditor;