import "../../../css/InspirationPage.css";
import homeLink from "../../../images/home.png";
import { useNavigate } from "react-router-dom";

const InspirationPage = () => {
    const navigate = useNavigate();
    const backToHomePage = () => {
        navigate("/");
    }

    return <div className="Wrapper">
        
        <div className="about-section" style={{fontSize: 60+'px'}}>
            Our Inspiration
        </div>
        <br></br>
        <h1 style={{textAlign: "center", fontSize: 50+'px',fontFamily: "Bradley Hand"}}>~ Why and How accounting matters ~</h1>
        <img className="homeLink" src={homeLink} style={{width: 50+'px'}} onClick={backToHomePage}/>
    </div>
}
export default InspirationPage;