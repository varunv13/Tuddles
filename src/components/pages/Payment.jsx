import React, { useEffect, useState } from "react";
import Wrapper from "../Layout/wrapper";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { backend_url } from "../../utils/Config";
import { useAuth } from "../../context/AuthContext";
import PaymentImage from "../../images/payment.png";
import axios from "axios";
import { toast } from "react-toastify";

const Payment = () => {
  const { pID } = useParams();
  const [product, setProduct] = useState(null);
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState(20);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("COD");
  const [auth] = useAuth();
  const navigate = useNavigate();

  const total_price = product?.price - (product?.price * discount) / 100;

  // console.log(auth.user)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${backend_url}/api/v1/products/p/${pID}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [pID]);

  const handlePlaceOrder = async () => {
    if (!state || !auth?.user || !product) {
      alert("Missing required information. Please check your details.");
      return;
    }

    const orderData = {
      user: auth.user._id,
      seller: product.seller_Info,
      productId: product._id,
      itemType: "Product",
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
      const response = await axios.post(
        `${backend_url}/api/v1/orders/singleOrder`,
        orderData,
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      // console.log(total_price)
      console.log(response.data);

      // alert("Order placed successfully!");
      if (response && response?.data?.statusCode === 201) {
        toast.success("🐕‍🦺 Wou wou...Order Placed ✅");
        navigate("/order-success");
      } else {
        toast.error("Some error occured 😥");
      }
    } catch (err) {
      console.error("Order error:", err.response?.data?.message || err.message);
      alert(`Error: ${err.response?.data?.message || "Order creation failed"}`);
    }
  };

  const handlePayment = async () => {
    const orderData = {
      user: auth.user._id,
      seller: product.seller_Info,
      productId: product._id,
      itemType: "Product",
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

    // Save orderData to localStorage
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
      console.log(order);
      // console.log(key_data.data.key)

      //razorpay payment gateway
      // Open Razorpay Checkout
      const options = {
        key: key_data.data.key, // Replace with your Razorpay key_id
        amount: total_price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "PawsPoint",
        description: "Test Transaction",
        order_id: order.id, // This is the order_id created in the backend
        callback_url: `${backend_url}/api/v1/payments/payment-verification`, // Your success URL
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

      //razorpay end
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

  // return (
  //   <Wrapper current={"Payment Page"}>
  //     <div className="w-full bg-night min-h-screen flex flex-col items-center py-6 px-4">
  //       <img
  //         src={PaymentImage}
  //         alt="Payment"
  //         className="w-full md:w-2/3 lg:w-1/2 max-h-60 object-cover rounded-xl shadow-lg mb-6"
  //       />

  //       <div className="w-full md:w-2/3 lg:w-1/2 bg-white p-6 rounded-2xl shadow-xl">
  //         <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
  //           Choose Payment Method
  //         </h1>

  //         <div className="space-y-4 mb-6">
  //           {/* COD Option */}
  //           <div
  //             onClick={() => setSelectedPayment("COD")}
  //             className={`transition-all duration-200 p-5 rounded-xl border-2 shadow-sm cursor-pointer ${
  //               selectedPayment === "COD"
  //                 ? "border-amber-500 bg-amber-100"
  //                 : "border-gray-300 hover:bg-gray-50"
  //             }`}>
  //             <div className="flex justify-between items-center">
  //               <p className="font-semibold text-lg">Cash on Delivery</p>
  //               <p className="text-xl font-bold text-gray-800">
  //                 ₹{product?.price}
  //               </p>
  //             </div>
  //           </div>

  //           {/* Online Option */}
  //           <div
  //             onClick={() => setSelectedPayment("online")}
  //             className={`transition-all duration-200 p-5 rounded-xl border-2 shadow-sm cursor-pointer ${
  //               selectedPayment === "online"
  //                 ? "border-amber-500 bg-amber-100"
  //                 : "border-gray-300 hover:bg-gray-50"
  //             }`}>
  //             <div className="flex justify-between items-center mb-2">
  //               <p className="font-semibold text-lg">Pay Online</p>
  //               <div className="text-right">
  //                 <p className="text-xl font-bold text-gray-800">
  //                   ₹{product?.price}
  //                 </p>
  //                 <p className="text-green-600 text-sm font-medium">
  //                   Save ₹{(product?.price * discount) / 100}
  //                 </p>
  //               </div>
  //             </div>
  //             <p className="text-sm text-gray-500">Extra discount with bank offers</p>
  //           </div>
  //         </div>

  //         {/* Price Summary */}
  //         <div className="mb-6">
  //           <h2 className="text-xl font-semibold mb-4 text-gray-700">Price Summary</h2>
  //           <div className="space-y-2 text-sm">
  //             <div className="flex justify-between">
  //               <span>Total Product Price</span>
  //               <span>+ ₹{product?.price}</span>
  //             </div>
  //             <div className="flex justify-between">
  //               <span>Total Discounts</span>
  //               <span className="text-green-600">- ₹{(product?.price * discount) / 100}</span>
  //             </div>
  //             <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
  //               <span>Order Total</span>
  //               <span>₹{total_price}</span>
  //             </div>
  //           </div>
  //         </div>

  //         <p className="text-green-700 font-medium mb-4 text-sm">
  //           🎉 You saved ₹{(product?.price * discount) / 100} on this order!
  //         </p>

  //         <button
  //           onClick={selectedPayment === "online" ? handlePayment : handlePlaceOrder}
  //           className="w-full bg-accent hover:bg-orange-600 text-white text-lg py-3 rounded-lg font-semibold shadow transition-colors">
  //           {selectedPayment === "online" ? "Pay Now" : "Place Order"}
  //         </button>
  //       </div>
  //     </div>
  //   </Wrapper>
  // );

  return (
    <Wrapper current={"Payment Page"}>
      <div className="w-full min-h-screen bg-primary flex justify-center py-10 px-4">
        <div className="w-full max-w-2xl bg-secondary rounded-2xl shadow-xl p-6 md:p-10 font-poppins">
          {/* Header */}
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Choose Payment Method
          </h1>

          {/* Payment Options */}
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
                <p className="text-lg font-bold text-gray-800">
                  ₹{product?.price}
                </p>
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
                    ₹{product?.price}
                  </p>
                  <p className="text-green-600 text-sm">
                    Save ₹{(product?.price * discount) / 100}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Price Details */}
          {/* <div className="mb-6 bg-white rounded-lg p-4 shadow">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Price Details (1 Item)</h2>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Total Product Price</span>
                  <span>+ ₹{product?.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Discounts</span>
                  <span className="text-green-600">- ₹{(product?.price * discount) / 100}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-gray-800">
                  <span>Order Total</span>
                  <span>₹{total_price}</span>
                </div>
              </div>
            </div> */}

          {/* Price Details */}
          <div className="mb-6 bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-bold mb-4 text-gray-800">
              Price Details (1 Item)
            </h2>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Total Product Price</span>
                <span>+ ₹{product?.price}</span>
              </div>

              {selectedPayment === "online" && (
                <div className="flex justify-between">
                  <span>Total Discounts</span>
                  <span className="text-green-600">
                    - ₹{(product?.price * discount) / 100}
                  </span>
                </div>
              )}

              <div className="border-t pt-4 flex justify-between font-bold text-gray-800">
                <span>Order Total</span>
                <span>
                  ₹{selectedPayment === "online" ? total_price : product?.price}
                </span>
              </div>
            </div>
          </div>

          {/* Final Message */}
          {/* <p className="text-green-700 font-medium mb-6 text-center">
            🎉 You saved ₹{(product?.price * discount) / 100} on this order!
          </p> */}

          {selectedPayment === "online" && (
            <p className="text-green-700 font-medium mb-6 text-center">
              🎉 You saved ₹{(product?.price * discount) / 100} on this order!
            </p>
          )}

          {/* Action Button */}
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

export default Payment;
