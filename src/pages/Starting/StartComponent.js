import { Button } from "antd";
import StartPicture from "../../images/StartPicture.png";

export default () => {
    const LoginClick = () => {
        window.location.replace(window.location.origin + '/Login');
    }
    return (
        <div
            style={{
                background: "linear-gradient(90deg, #003D79, rgb(62, 151, 183) 500px)",
                height: window.innerHeight,
                display: "flex",
                alignItems: "center",
                flexDirection: "row"
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "100px"
                }}
            >
                <div
                    style={{
                        fontSize: "90px",
                        color: "#FFFFFF",
                        position: "absolute",
                        top: "250px",
                        fontFamily: "cursive"
                    }}
                >
                    SchEdulE
                </div>
                <Button
                    type="ghost"
                    size="large"
                    style={{
                        backgroundColor: "#019858",
                        fontSize: "20px",
                        marginTop: "110px",
                        width: "75px",
                        color: "white",
                        display: "flex",
                        alignItems: "center"
                    }}
                    onClick={LoginClick}
                >
                    Start
                </Button>
            </div>
            <img 
                src={StartPicture}
                style={{
                    position: "absolute",
                    right: "30px"
                }}
            /> 
        </div>
    );
}