import React from "react";
import DragBlock from "../DragBlock";

const ReplayArea = props => {
    const replayRenderer = props.replayList.map((block, i) => {
        return(
            <div key={i} className={`w-1/3 overflow-hidden border-2 ${props.replayId == i ? 'border-blue-300' : ''}
                rounded-lg cursor-pointer`} onClick={() => props.updateReplayId(i)}>
                <div>
                    <DragBlock block={block} />
                </div>
            </div>
        );
    })

    return(
        <div className="flex-1 flex flex-row flex-wrap gap-2 p-2">
            {props.replayList.length == 0 ?
            <div className="flex-1 text-center text-lg font-medium text-gray-500 pt-4">
                Click on Flag or Sprite to save Blocks
            </div> : replayRenderer}
        </div>
    );
}

export default ReplayArea;