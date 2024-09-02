import React, { useRef } from "react";
import Icon from "../visual/Icon";

const CostumeArea = props => {
    const fileRef = useRef("");

    const handleCostumeUpload = event => {
        const file = event.target.files[0]
        const fileBlob = URL.createObjectURL(file)

        props.addCostume(fileBlob)
        
        fileRef.current = ""
    }

    const costumesRenderer = props.costumes.map((costume, i) => {
        const Unique = costume

        return(
            <div key={i} className={`w-1/5 overflow-hidden border-2 ${props.inUse == i ? 'border-blue-300' : ''}
                rounded-lg cursor-pointer`} onClick={() => props.changeCostume(i)}>
                <div style={{ transform: 'scale(0.46)' }}>
                    <Unique />
                </div>
            </div>
        );
    })

    return(
        <div className="flex flex-row flex-wrap gap-2 p-2">
            <div className={`w-1/5 border-2 border-blue-400 bg-blue-50
                rounded-lg cursor-pointer flex flex-row items-center justify-center`}
                onClick={() => { fileRef.current.click() }}>
                <Icon name="plus" size={38} className="text-blue-500" />
            </div>
            <input type="file" accept="image/*" style={{ display: 'none' }}
                ref={input => { fileRef.current = input }}
                onChange={event => handleCostumeUpload(event)}/>
            {costumesRenderer}
        </div>
    );
}

export default CostumeArea;