import "../../../css/ContactPage.css"
import FormDialog from "../../../components/FormDialog";
const ContactPage = () => {
    return <div className="Wrapper">
        <div className="dialogBox" />
        <div className="messageWrapper">
            <div className="textBox">Your comments and suggestions are welcome ! ! !</div>
            <FormDialog />
        </div>
    </div>
}
export default ContactPage;