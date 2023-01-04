import { useNavigate } from "react-router-dom";
import homeLink from "../../../images/home.png";
import "../../../css/InstructionsPage.css";
import { useState } from "react";
import inst1 from "../../../images/app-inst1.png";
import inst2 from "../../../images/app-inst2.png";
import inst3 from "../../../images/app-inst3.png";
import inst4 from "../../../images/app-inst4.png";

const InstructionsPage = () => {
    const [text, setText] = useState(true)
    const navigate = useNavigate();
    const backToHomePage = () => {
        navigate("/");
    }

    return (
        <>
        {text ?
        <div className="Wrapper">
            <div className="about-section" style={{fontSize: 60+'px'}}>
                App Instructions
            </div>
            <br></br>
            <div className="instructionWrapper">
                <h1 style={{fontSize: 25+'px', color: 'red'}}>
                    1. Register your own account first !
                </h1>
                <h1 style={{fontSize: 25+'px', color: 'green'}}>
                    2. Record you daily incomes and expenses !
                </h1>
                <h1 style={{fontSize: 25+'px', color: 'blue'}}>
                    3. Go through all the statistic methods we offer to learn your expenditure structure !
                </h1>
                <h1 style={{fontSize: 25+'px', color: 'purple'}}>
                    4. Share your thoughts with other users !
                </h1>
                <h1 style={{fontSize: 25+'px', color: 'black'}}>
                    5. Enjoy our app !
                </h1>
                <button className='switch' onClick={() => setText(false)}>Illustration</button>
            </div>
            <img alt="home" className="homeLink" src={homeLink} style={{width: 50+'px'}} onClick={backToHomePage}/>
        </div>
        :
        <div className="illWrapper">
            <div className="illustration">
                <div className="numTag" style={{color: 'red'}}>1.</div>
                <img className='app-inst' alt='app-instruction1' src={inst1} style={{width:40 + '%'}} />
                <div className="numTag" style={{color: 'green'}}>2.</div>
                <img className='app-inst' alt='app-instruction2' src={inst2} style={{width:40 + '%'}} />
                <div className="numTag" style={{color: 'blue'}}>3.</div>
                <img className='app-inst' alt='app-instruction3' src={inst3} style={{width:40 + '%'}} />
                <div className="numTag" style={{color: 'purple'}}>4.</div>
                <img className='app-inst' alt='app-instruction4' src={inst4} style={{width:40 + '%'}} />
            </div>
            <button className='switch' onClick={() => setText(true)}>TEXT</button>
        </div>
        }
        </>
    )
}
export default InstructionsPage;