import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const TextEditor  = (props) =>{
    if(props.data === undefined) {
        const data = 'Type your note here...';
    }
    else {
        const data = props.data;
    }
    return (
        <div>
            <CKEditor
                editor={ ClassicEditor }
                data="<p>type your note here...</p>"
                onReady={editor => {console.log(editor)}}
                onChange={ ( event, editor ) => {
                    const changed_data = editor.getData();
                    console.log({ changed_data });
                } }
            />
        </div>
    );
    
}

export default TextEditor;