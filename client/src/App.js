import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Carhire from "./pages/Carhire";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import { CarsContextProviderWrapper } from "./components/context/cars.Context";

// Contexts
import { CarsProvider } from "./contexts/cars.context";

// Cars
import CarList from "./pages/Cars/CarList";
import AddCar from "./pages/Cars/AddCar";
import UpdateCar from "./pages/UpdateCar";
import DeleteCar from "./pages/Cars/DeleteCar";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <CarsProvider>
          <CarsContextProviderWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/carhire" element={<Carhire />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin">
                <Route index element={<Admin />} />
                <Route path="add" element={<AddCar />} />
                <Route path="update/:id" element={<UpdateCar />} />
                <Route path="delete/:id" element={<DeleteCar />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CarsContextProviderWrapper>
        </CarsProvider>
      </Router>
    </div>
  );
}

export default App;
