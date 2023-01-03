import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import MainPage from "./containers/pages/MainPage";
import SignInPage from "./containers/pages/Login/SignInPage";
import SignUpPage from "./containers/pages/Login/SignUpPage";

import Appframe from "./containers/Appframe";
import AccountMainPage from "./containers/pages/Account/AccountMainPage";
import CalendarPage from "./containers/pages/Account/CalendarPage";
import ClassificationPage from "./containers/pages/Account/ClassificationPage";
import AnalysisPage from "./containers/pages/Account/AnalysisPage";

import AuthorsPage from "./containers/pages/AboutUs/AuthorsPage";
import InspirationPage from "./containers/pages/AboutUs/InspirationPage";
import InstructionsPage from "./containers/pages/AboutUs/InstrctionsPage";
import CommentsPage from "./containers/pages/Account/CommentsPage";
import ContactPage from "./containers/pages/Account/ContactPage";
import SettingsPage from "./containers/pages/Account/SettingsPage";

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
          <Route path="account" element={<Appframe />}>
            <Route path="home" element={<AccountMainPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="classification" element={<ClassificationPage />} />
            <Route path="analysis" element={<AnalysisPage />} />
            <Route path="comments" element={<CommentsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<h1>Sorry! Page not found</h1>} />
          </Route>
          

          {/* <Route path="/restaurant/:id" element={<RestaurantPage />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
