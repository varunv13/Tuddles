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
import Pets from "./components/pages/Pets";
import SinglePet from "./components/pages/SinglePet";
import OrderPetPage from "./components/pages/OrderPetPage";
import AdminOrderPanel from "./components/pages/protected/AdminOrderPanel";

function App() {
  const [cookies] = useCookies(["token"]);
  const cookie = cookies?.token;

  return (
    <div className="cursor-custom w-screen font-poppins">
      <Routes>
        {cookie ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/search-product" element={<SearchResult />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/p/:pID" element={<SingleProduct />} />
            <Route path="/o/:pID" element={<OrderPage />} /> {/* For Product */}
            <Route path="/pay/:pID" element={<Payment />} /> {/* For Product */}
            <Route path="/paymentSuccess" element={<PaymentSuccess />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/dashboard/createproduct" element={<CreateProduct />} />
            <Route path="/dashboard/own-product" element={<OwnProduct />} />
            <Route path="/dashboard/update-product" element={<UpdateProduct />} />
            <Route path="/vet" element={<Vet />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/pet/:petID" element={<SinglePet />} /> {/* For Pet */}
            <Route path="/o/pet/:petID" element={<OrderPetPage />} /> {/* For Pet */}
            <Route path="/pay/pet/:petID" element={<Payment />} /> {/* For Pet */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard/admin/update-order" element={<AdminOrderPanel />} />
            <Route path="*" element={<Home />} />
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
