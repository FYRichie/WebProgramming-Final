import React from "react";
import { Menu } from "antd";

// export default (name, color, selected, index, buttonStates) => {
//     const Selection = () =>{
//         if (selected) {
//             return <div className="layer-selected"/>;
//         }
//     }

//     const Selecting = (id) => {
//         let _newLayer = buttonStates.userData.layer;
//         _newLayer[id].selected = !_newLayer[id].selected;
//         const newUserData = {
//             userName: buttonStates.userData.userName,
//             layer: _newLayer,
//             somethingelse: buttonStates.userData.somethingelse
//         };
//         buttonStates.setUserData(newUserData);
//     }

//     const Deleting = (id) => {
//         const _newLayer = buttonStates.userData.layer.filter((ele,Id) => Id !== id);
//         const nUD = {
//             userName: buttonStates.userData.userName,
//             layer: _newLayer,
//             somethingelse: buttonStates.userData.somethingelse
//         };
//         buttonStates.setUserData(nUD);
//     }

//     return (
//         <div className="layer" id={String(index)} >
//             <div className="layer-color-box" style={{backgroundColor: color}} onClick={() => {Selecting(index)}}/>
//             <div>{name}</div>
//             {Selection()}
//             <div className="layer-delete" onClick={() => {Deleting(index)}}></div>
//         </div>
//     );
// }
const {SubMenu} = Menu;

export default (ele, index, buttonStates) => {
    return (
        <SubMenu title={ele.name} >
            
        </SubMenu>
    );
}