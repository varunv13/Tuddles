import React, { useEffect, useState } from "react";
import Wrapper from "../Layout/wrapper";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { backend_url } from "../../utils/Config";
import { useAuth } from "../../context/AuthContext";
import PaymentImage from "../../images/payment.png"; // Optional: Pet image here if desired
import axios from "axios";
import { toast } from "react-toastify";

const PetPayment = () => {
  const { petID } = useParams(); // petID for the specific pet or appointment
  const [pet, setPet] = useState(null);
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState(20); // Adjust discount as needed
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("COD");
  const [auth] = useAuth();
  const navigate = useNavigate();

  const total_price = pet?.price - (pet?.price * discount) / 100;

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(`${backend_url}/api/v1/pets/p/${petID}`);
        if (!response.ok) throw new Error("Pet not found");
        const data = await response.json();
        setPet(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [petID]);

  const handlePlaceOrder = async () => {
    if (!state || !auth?.user || !pet) {
      alert("Missing required information. Please check your details.");
      return;
    }

    const orderData = {
      user: auth.user._id,
      seller: pet.seller_Info,
      //   petId: pet._id,
      productId: pet._id,
      itemType: "Pet",
      quantity: 1,
      shipping_Address: {
        building_No: state.house,
        street: state.street,
        landmark: state.landmark,
        city: state.billing_city,
        state: state.billing_state,
        country: state.billing_country,
        pincode: state.billing_pincode,
      },
      billing_Address: {
        building_No: state.house,
        street: state.street,
        landmark: state.landmark,
        city: state.billing_city,
        state: state.billing_state,
        country: state.billing_country,
        pincode: state.billing_pincode,
      },
      price: total_price,
      delivery_Cost: 0,
      payment_Method: selectedPayment,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${backend_url}/api/v1/orders/singleOrder`,
        orderData,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      );

      if (response && response?.data?.statusCode === 201) {
        toast.success("🐕‍🦺 Pet Adoption Order Placed ✅");
        navigate("/order-success");
      } else {
        toast.error("Some error occurred 😥");
      }
    } catch (err) {
      console.error("Order error:", err.response?.data?.message || err.message);
      alert(`Error: ${err.response?.data?.message || "Order creation failed"}`);
    }
  };

  const handlePayment = async () => {
    const orderData = {
      user: auth.user._id,
      seller: pet.seller_Info,
      petId: pet._id,
      itemType: "Pet",
      quantity: 1,
      shipping_Address: {
        building_No: state.house,
        street: state.street,
        landmark: state.landmark,
        city: state.billing_city,
        state: state.billing_state,
        country: state.billing_country,
        pincode: state.billing_pincode,
      },
      billing_Address: {
        building_No: state.house,
        street: state.street,
        landmark: state.landmark,
        city: state.billing_city,
        state: state.billing_state,
        country: state.billing_country,
        pincode: state.billing_pincode,
      },
      price: total_price,
      delivery_Cost: 0,
      payment_Method: "Online",
    };

    localStorage.setItem("orderData", JSON.stringify(orderData));

    try {
      const data = {
        total_amount: total_price,
      };
      const key_data = await axios.get(`${backend_url}/api/v1/payments/getkey`);
      const response = await axios.post(
        `${backend_url}/api/v1/payments/process`,
        data,
      );

      const order = response.data.order;

      const options = {
        key: key_data.data.key,
        amount: total_price,
        currency: "INR",
        name: "PawsPoint",
        description: "Pet Adoption Payment",
        order_id: order.id,
        callback_url: `${backend_url}/api/v1/payments/payment-verification`,
        prefill: {
          name: auth?.user?.user_Name,
          email: auth?.user?.email,
          contact: state.billing_phone,
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading)
    return (
      <Wrapper>
        <div className="text-center py-8">Loading...</div>
      </Wrapper>
    );
  if (error)
    return (
      <Wrapper>
        <div className="text-center py-8 text-red-500">{error}</div>
      </Wrapper>
    );

  return (
    <Wrapper current={"Payment Page"}>
      <div className="w-full min-h-screen bg-primary flex justify-center py-10 px-4">
        <div className="w-full max-w-2xl bg-secondary rounded-2xl shadow-xl p-6 md:p-10 font-poppins">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Choose Payment Method
          </h1>

          <div className="space-y-6 mb-8">
            <div
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                selectedPayment === "COD"
                  ? "border-amber-500 bg-amber-200"
                  : "border-gray-300 bg-white hover:bg-gray-50"
              }`}
              onClick={() => setSelectedPayment("COD")}>
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-700">
                  Cash on Delivery
                </p>
                <p className="text-lg font-bold text-gray-800">₹{pet?.price}</p>
              </div>
            </div>

            <div
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                selectedPayment === "online"
                  ? "border-amber-500 bg-amber-200"
                  : "border-gray-300 bg-white hover:bg-gray-50"
              }`}
              onClick={() => setSelectedPayment("online")}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-semibold text-gray-700">
                    Pay Online
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Extra discount with bank offers
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">
                    ₹{pet?.price}
                  </p>
                  <p className="text-green-600 text-sm">
                    Save ₹{(pet?.price * discount) / 100}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-bold mb-4 text-gray-800">
              Price Details (1 Pet)
            </h2>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Total Pet Adoption Fee</span>
                <span>+ ₹{pet?.price}</span>
              </div>

              {selectedPayment === "online" && (
                <div className="flex justify-between">
                  <span>Total Discounts</span>
                  <span className="text-green-600">
                    - ₹{(pet?.price * discount) / 100}
                  </span>
                </div>
              )}

              <div className="border-t pt-4 flex justify-between font-bold text-gray-800">
                <span>Order Total</span>
                <span>
                  ₹{selectedPayment === "online" ? total_price : pet?.price}
                </span>
              </div>
            </div>
          </div>

          {selectedPayment === "online" && (
            <p className="text-green-700 font-medium mb-6 text-center">
              🎉 You saved ₹{(pet?.price * discount) / 100} on this adoption!
            </p>
          )}

          <button
            className="w-full bg-accent hover:bg-orange-500 text-white py-3 rounded-xl font-semibold transition-all"
            onClick={
              selectedPayment === "online" ? handlePayment : handlePlaceOrder
            }>
            {selectedPayment === "online" ? "Pay Now" : "Place Order"}
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default PetPayment;
