import "../../../css/AuthorsPage.css"
import person1 from "../../../images/person1.png"
import person2 from "../../../images/person2.png"
import person3 from "../../../images/person3.png"
import homeLink from "../../../images/home.png"
import { useNavigate } from "react-router-dom";
const AuthorsPage = () => {
    const navigate = useNavigate();
    const backToHomePage = () => {
        navigate("/");
    }

    return <div className="Wrapper">
        <div className="about-section" style={{fontSize: 60+'px'}}>
            About Us Page
        </div>
        <br></br>
        <h1 style={{textAlign: "center", fontSize: 50+'px',fontFamily: "Bradley Hand"}}>~ Our Team ~</h1>
        <div className="row">
            <div className="column">
                <div className="card">
                <img src={person1} alt="Ryan" style={{width:60 + '%'}} />
                    <div className="container">
                        <h1>Ryan Chu</h1>
                        <h2 className="title">Backend Developer</h2>
                        <h3>Some text.</h3>
                        <h3>ryan@example.com</h3>
                        <br></br>
                        {/* <p><button className="button">Contact</button></p> */}
                        <br></br>
                    </div>
                </div>
            </div>

            <div className="column">
                <div className="card">
                <img src={person2} alt="Walker" style={{width:60 + '%'}} />
                    <div className="container">
                        <h1>Walker Hsu</h1>
                        <h2 className="title">Frontend Developer</h2>
                        <h3>Some text.</h3>
                        <h3>walker@example.com</h3>
                        <br></br>
                        {/* <p><button className="button">Contact</button></p> */}
                        <br></br>
                    </div>
                </div>
            </div>

            <div className="column">
                <div className="card">
                <img src={person3} alt="David" style={{width:60 + '%'}} />
                    <div className="container">
                        <h1>David Liu</h1>
                        <h2 className="title">HomePage Designer</h2>
                        <h3>Some text.</h3>
                        <h3>david@example.com</h3>
                        <br></br>
                        {/* <p><button className="button">Contact</button></p> */}
                        <br></br>
                    </div>
                </div>
            </div>
        </div>
        <img className="homeLink" src={homeLink} style={{width: 50+'px'}} onClick={backToHomePage}/>
    </div>
}
export default AuthorsPage;