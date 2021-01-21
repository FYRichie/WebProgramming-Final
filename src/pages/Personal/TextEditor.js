import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const TextEditor  = (buttonStates, layerIndex, eventIndex) =>{
    let Data = '';
    let Color = '';
    let Name = '';
    if (buttonStates.userData.layer.length > 0) {
        Color = buttonStates.userData.layer[layerIndex].layerColor;
        if(buttonStates.userData.layer[layerIndex].event !== undefined) {
            if(buttonStates.userData.layer[layerIndex].event.length > 0) {
                Data = buttonStates.userData.layer[layerIndex].event[eventIndex].eventData;
                Name = buttonStates.userData.layer[layerIndex].event[eventIndex].eventName;
            }
        }
    }
    const [data, setData] = useState(Data);
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
                color: Color,
                fontSize: "50px",
                fontFamily: "fantasy"
            }}
        >
            {Name}
        </div>
        <CKEditor
            editor={ ClassicEditor }
            data={data}
            onChange={editing}
        />
    </div>);
    return {
        EditorComponent,
        data
    };
    
}

export default TextEditor;
