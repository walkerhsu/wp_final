import { useNavigate } from "react-router-dom";
import homeLink from "../../../images/home.png";
import "../../../css/InstructionsPage.css";

const InstructionsPage = () => {
    const navigate = useNavigate();
    const backToHomePage = () => {
        navigate("/");
    }

    return <div className="Wrapper">
        <div className="about-section" style={{fontSize: 60+'px'}}>
            App Instructions
        </div>
        <br></br>
        <h1 style={{textAlign: "center", fontSize: 50+'px',fontFamily: "Bradley Hand"}}>some text</h1>
        <img alt="home" className="homeLink" src={homeLink} style={{width: 50+'px'}} onClick={backToHomePage}/>
    </div>
}
export default InstructionsPage;