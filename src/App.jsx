import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";

import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import EditProfile from "./components/pages/EditProfile";
import CreateProduct from "./components/pages/protected/CreateProduct";
import OwnProduct from "./components/pages/protected/OwnProduct";
import UpdateProduct from "./components/pages/protected/UpdateProduct";
import SearchResult from "./components/pages/SearchResult";
import Shop from "./components/pages/Shop";
import SingleProduct from "./components/pages/SingleProduct";
import OrderPage from "./components/pages/OrderPage";
import Payment from "./components/pages/Payment";
import PaymentSuccess from "./components/pages/PaymentSuccess";
import Contact from "./shared/Contact";
import Vet from "./components/pages/Vet";
import Adapt from "./components/pages/Adapt";

function App() {
  const [cookies] = useCookies(["token"]);
  const cookie = cookies?.token;

  return (
    <div className="cursor-custom w-screen h-screen font-poppins">
      <Routes>
        {cookie ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/search-product" element={<SearchResult />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/p/:pID" element={<SingleProduct />} />
            <Route path="/o/:pID" element={<OrderPage />} />
            <Route path="/pay/:pID" element={<Payment />} />
            <Route path="/paymentSuccess" element={<PaymentSuccess />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route
              path="/dashboard/createproduct"
              element={<CreateProduct />}
            />
            <Route path="/dashboard/own-product" element={<OwnProduct />} />
            <Route
              path="/dashboard/update-product"
              element={<UpdateProduct />}
            />
            <Route path="*" element={<Home />} />
            <Route path="/vet" element={<Vet />} />
            <Route path="/adapt" element={<Adapt />} />
            <Route path="/contact" element={<Contact />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Signup />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
