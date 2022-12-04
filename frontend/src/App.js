import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import SignInPage from './containers/SignInPage';
import MainPage from './containers/MainPage';
import SignUpPage from './containers/SignUpPage';
import AccountMainPage from './containers/AccountMainPage';
function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/account" element={<AccountMainPage />} />
          {/* <Route path="/restaurant/:id" element={<RestaurantPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
