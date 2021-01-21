import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const TextEditor  = (buttonStates, layerIndex, eventIndex) =>{
    if(buttonStates.userData.layer.length > 0) const [data, setData] = useState(buttonStates.userData.layer[layerIndex].event[eventIndex].eventData);
    const editing = (event, editor) => {
        setData(editor.getData());
    }
    
    const EditorComponent = (<div
        style={{
            width: '640px',
        }}
    >
        <div
            style={{
                color: buttonStates.userData.layer[layerIndex].layerColor,
                fontSize: "50px",
                fontFamily: "fantasy"
            }}
        >
            {buttonStates.userData.layer[layerIndex].event[eventIndex].eventName}
        </div>
        <CKEditor
            editor={ ClassicEditor }
            data={buttonStates.userData.layer[layerIndex].event[eventIndex].eventData}
            onChange={editing}
        />
    </div>);
    return {
        EditorComponent,
        data
    };
    
}

export default TextEditor;