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

import Wrapper from "./components/Layout/Wrapper";

function App() {
  const [cookies] = useCookies(["token"]);
  const cookie = cookies?.token;

  return (
    <div className="cursor-custom w-screen font-poppins">
      <Routes>
        {cookie ? (
          <>
            <Route
              path="/"
              element={
                // <Wrapper>
                  <Home />
                // </Wrapper>
              }
            />
            <Route
              path="/search-product"
              element={
                // <Wrapper>
                  <SearchResult />
                // </Wrapper>
              }
            />
            <Route
              path="/shop"
              element={
                // <Wrapper>
                  <Shop />
                // </Wrapper>
              }
            />
            <Route
              path="/p/:pID"
              element={
                // <Wrapper>
                  <SingleProduct />
                // </Wrapper>
              }
            />
            <Route
              path="/o/:pID"
              element={
                // <Wrapper>
                  <OrderPage />
                // </Wrapper>
              }
            />
            <Route
              path="/pay/:pID"
              element={
                // <Wrapper>
                  <Payment />
                // </Wrapper>
              }
            />
            <Route
              path="/paymentSuccess"
              element={
                // <Wrapper>
                  <PaymentSuccess />
                // </Wrapper>
              }
            />
            <Route
              path="/dashboard"
              element={
                // <Wrapper>
                  <Dashboard />
                // </Wrapper>
              }
            />
            <Route
              path="/profile"
              element={
                // <Wrapper>
                  <EditProfile />
                // </Wrapper>
              }
            />
            <Route
              path="/dashboard/createproduct"
              element={
                // <Wrapper>
                  <CreateProduct />
                // </Wrapper>
              }
            />
            <Route
              path="/dashboard/own-product"
              element={
                // <Wrapper>
                  <OwnProduct />
                // </Wrapper>
              }
            />
            <Route
              path="/dashboard/update-product"
              element={
                // <Wrapper>
                  <UpdateProduct />
                // </Wrapper>
              }
            />
            <Route
              path="/vet"
              element={
                // <Wrapper>
                  <Vet />
                // </Wrapper>
              }
            />
            <Route
              path="/adapt"
              element={
                // <Wrapper>
                  <Adapt />
                // </Wrapper>
              }
            />
            <Route
              path="/contact"
              element={
                // <Wrapper>
                  <Contact />
                // </Wrapper>
              }
            />
            <Route
              path="*"
              element={
                // <Wrapper>
                  <Home />
                // </Wrapper>
              }
            />
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
