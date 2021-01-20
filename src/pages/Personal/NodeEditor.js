import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default (buttonStates, layerIndex, eventIndex) => {
    const editing = (event, editor) => {
        const data = editor.getData();
        console.log(event, editor, data);
    }
    return (
        <div>
            <div>
                {buttonStates.userData.layer[layerIndex].event[eventIndex].eventName}
            </div>
            <CKEditor 
                editor={ClassicEditor}
                data={buttonStates.userData.layer[layerIndex].event[eventIndex].eventData}
                onChange={editing}
            />
        </div>
    );
}