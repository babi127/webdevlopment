import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./LandingPage";
import { LoginPage } from "./Login";
import { CustomersPage } from "./CustomerInterface";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/customer" element={<CustomersPage />} />

      </Routes>
    </Router>
  );
}

export default App;
