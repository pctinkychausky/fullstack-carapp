import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Carhire from "./pages/Carhire";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Contexts
import { CarsProvider } from "./contexts/cars.context";
import { BasketProvider } from "./contexts/basket.context";
import { OrdersProvider } from "./contexts/orders.context";
// Cars
import CarList from "./pages/Cars/CarList";
import AddCar from "./pages/Cars/AddCar";
import UpdateCar from "./pages/UpdateCar";
import DeleteCar from "./pages/Cars/DeleteCar";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

//auth
import PrivateRoute from "./components/privateRoute/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <CarsProvider>
          <OrdersProvider>
            <BasketProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/carhire" element={<Carhire />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/admin">
                  <Route index element={<PrivateRoute component={Admin} />} />
                  <Route path="add" element={<AddCar />} />
                  <Route path="update/:id" element={<UpdateCar />} />
                  <Route path="delete/:id" element={<DeleteCar />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>{" "}
            </BasketProvider>{" "}
          </OrdersProvider>
        </CarsProvider>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
