import "../../../css/AuthorsPage.css"
import person1 from "../../../images/person1.png"
import person2 from "../../../images/person2.png"
import person3 from "../../../images/person3.png"
const AuthorsPage = () => {
    return <div className="Wrapper">
        <div className="about-section">
        <h1>About Us Page</h1>
        <p>Some text about who we are and what we do.</p>
        <p>Resize the browser window to see that this page is responsive by the way.</p>
        </div>

        <h2 style={{textAlign: "center"}}>Our Team</h2>
        <div className="row">
            <div className="column">
                <div className="card">
                <img src={person1} alt="Ryan" style={{width:70 + '%'}} />
                    <div className="container">
                        <h1>Ryan Chu</h1>
                        <h2 className="title">Backend Developer</h2>
                        <h3>Some text.</h3>
                        <h3>ryan@example.com</h3>
                        <br></br>
                        <p><button className="button">Contact</button></p>
                        <br></br>
                    </div>
                </div>
            </div>

            <div className="column">
                <div className="card">
                <img src={person2} alt="Walker" style={{width:70 + '%'}} />
                    <div className="container">
                        <h1>Walker Hsu</h1>
                        <h2 className="title">Frontend Developer</h2>
                        <h3>Some text.</h3>
                        <h3>walker@example.com</h3>
                        <br></br>
                        <p><button className="button">Contact</button></p>
                        <br></br>
                    </div>
                </div>
            </div>

            <div className="column">
                <div className="card">
                <img src={person3} alt="David" style={{width:70 + '%'}} />
                    <div className="container">
                        <h1>David Liu</h1>
                        <h2 className="title">HomePage Designer</h2>
                        <h3>Some text.</h3>
                        <h3>david@example.com</h3>
                        <br></br>
                        <p><button className="button">Contact</button></p>
                        <br></br>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default AuthorsPage;