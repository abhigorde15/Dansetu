import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./Components/Navbar";
import "./App.css";
import Register from "./Components/Register";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import DonorProfile from "./Components/Donor/DonorProfile";
import Login from "./Components/Login";
import Food from "./Components/Donor/Food";
import InstituteDashboard from "./Components/Institues/InstituteDashboard";
import ShopkeeperDashboard from "./Components/Shopkeepers/ShopkeeperDashboard";
import FoodShops from "./Components/Shopkeepers/FoodShops";
import ProtectedRoute from "./Components/ProtectedRoute";

import Receipt from "./Components/Donor/Receipt";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("loggedIn"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [filterDonation, setFilteredDonation] = useState([]);
  useEffect(() => {
    const updateAuth = () => {
      setIsLoggedIn(localStorage.getItem("loggedIn"));
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", updateAuth); // Listen for storage changes
    return () => window.removeEventListener("storage", updateAuth);
  }, []);
 const handleReceiptGeneration =(filteredDonation)=>{
 
  console.log(filteredDonation);
  setFilteredDonation(filteredDonation);
 
 }
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        
          <>
            <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/about" element={<About />} />
          </>
        

        <Route element={<ProtectedRoute />}>
          {role === "donor" && (
            <>
              <Route path="/dashboard/donor" element={<DonorProfile handleReceiptGeneration={handleReceiptGeneration}/>} />
              <Route path="/dashboard/institute" element={<Navigate to="/" />} />
              <Route path="/dashboard/shopkeeper" element={<Navigate to="/" />} />
              <Route path="/product/food" element={<FoodShops />} />
              <Route path="/institute/food" element={<Food />} />
              <Route path="/payment/receipt" element={<Receipt  filterDonation={filterDonation} />} />

            </>
          )}
          {role === "institute" && (
            <>
              <Route path="/dashboard/donor" element={<Navigate to="/" />} />
              <Route path="/dashboard/institute" element={<InstituteDashboard />} />
              <Route path="/dashboard/shopkeeper" element={<Navigate to="/" />} />
              <Route path="/product/food" element={<Navigate to="/" />} />
              <Route path="/institute/food" element={<Navigate to="/" />} />
            </>
          )}
          {role === "shopkeeper" && (
            <>
              <Route path="/dashboard/donor" element={<Navigate to="/" />} />
              <Route path="/dashboard/institute" element={<Navigate to="/" />} />
              <Route path="/dashboard/shopkeeper" element={<ShopkeeperDashboard />} />
              <Route path="/product/food" element={<Navigate to="/" />} />
              <Route path="/institute/food" element={<Navigate to="/" />} />
            </>
          )}
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
