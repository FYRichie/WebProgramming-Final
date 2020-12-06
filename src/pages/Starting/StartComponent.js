import {NavLink} from 'react-router-dom';

export default () => {
    const LoginClick = () => {
        window.location.replace(window.location.origin + '/Login');
    }
    return (
        <button onClick={LoginClick}>Login</button>
    );
}