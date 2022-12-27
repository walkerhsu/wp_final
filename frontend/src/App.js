import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignInPage from "./containers/pages/SignInPage";
import MainPage from "./containers/pages/MainPage";
import SignUpPage from "./containers/pages/SignUpPage";
import AccountMainPage from "./containers/pages/AccountMainPage";
import UpdateAccountPage from "./containers/pages/UpdateAccountPage";
import AuthorsPage from "./containers/pages/AuthorsPage";
import InspirationPage from "./containers/pages/InspirationPage";
import InstructionsPage from "./containers/pages/InstrctionsPage";
import CommentsPage from "./containers/pages/CommentsPage";
import ContactPage from "./containers/pages/ContactPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/account/update" element={<UpdateAccountPage />} />
        <Route path="/account" element={<AccountMainPage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/inspiration" element={<InspirationPage />} />
        <Route path="/instructions" element={<InstructionsPage />} />
        <Route path="/comments" element={<CommentsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* <Route path="/restaurant/:id" element={<RestaurantPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
