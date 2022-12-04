import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate("/login");
    };
    return (
        <div>
            <h1>Main Page</h1>
            <button onClick={navigateToLogin}>Login</button>
        </div>
    )
}
export default MainPage;