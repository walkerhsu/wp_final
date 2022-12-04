import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import LoginPage from './containers/LoginPage';
import MainPage from './containers/MainPage';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/restaurant/:id" element={<RestaurantPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
