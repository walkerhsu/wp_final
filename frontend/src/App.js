import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import SignInPage from "./containers/pages/SignInPage";
import MainPage from "./containers/pages/MainPage";
import SignUpPage from "./containers/pages/SignUpPage";
import Appframe from "./containers/Appframe";
import UpdateAccountPage from "./containers/pages/UpdateAccountPage";
import AccountMainPage from "./containers/pages/AccountMainPage";
import CalendarPage from "./containers/pages/CalendarPage";
import AuthorsPage from "./containers/pages/AuthorsPage";
import InspirationPage from "./containers/pages/InspirationPage";
import InstructionsPage from "./containers/pages/InstrctionsPage";
import CommentsPage from "./containers/pages/CommentsPage";
import ContactPage from "./containers/pages/ContactPage";
function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="authors" element={<AuthorsPage />} />
          <Route path="inspiration" element={<InspirationPage />} />
          <Route path="instructions" element={<InstructionsPage />} />
          <Route path="comments" element={<CommentsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="account" element={<Appframe />}>
            <Route path="update" element={<UpdateAccountPage />} />
            <Route path="home" element={<AccountMainPage />} />
            {/* <Route path="home" element={<h1>home</h1>} /> */}
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="*" element={<h1>Sorry! Page not found</h1>} />
          </Route>

          {/* <Route path="/restaurant/:id" element={<RestaurantPage />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
