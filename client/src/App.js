import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Carhire from "./pages/Carhire";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import { CarsContextProviderWrapper } from "./components/context/cars.Context";

function App() {
  return (
    <div className="App">
      <Router>
        <CarsContextProviderWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carhire" element={<Carhire />} />
            <Route path="/cart" element={<Cart />} />{" "}
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </CarsContextProviderWrapper>
      </Router>
    </div>
  );
}

export default App;
