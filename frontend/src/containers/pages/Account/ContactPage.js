import "../../../css/ContactPage.css"
import FormDialog from "../../../components/FormDialog";
// import homeLink from "../../../images/home.png"
// import { useNavigate } from "react-router-dom";


const ContactPage = () => {
    // const navigate = useNavigate();
    // const backToHomePage = () => {
    //     navigate("/account/home");
    // }

    return <div className="Wrapper">
        <div className="dialogBox" />
        <div className="messageWrapper">
            <div className="textBox">Your comments and suggestions are welcome ! ! !</div>
            <FormDialog />
        </div>
        {/* <img className="homeLink" src={homeLink} style={{width: 50+'px'}} onClick={backToHomePage}/> */}
    </div>
}
export default ContactPage;