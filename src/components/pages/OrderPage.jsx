// import React, { useEffect, useState } from "react";
// import Wrapper from "../Layout/wrapper";
// import { useNavigate, useParams } from "react-router-dom";
// import { backend_url } from "../../utils/Config";
// import { useAuth } from "../../context/AuthContext";
// import Review from "../../images/review.png";

// const OrderPage = () => {
//   const { pID } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [discount, setDiscount] = useState(20);
//   const [error, setError] = useState(null);
//   const [auth] = useAuth();

//   // order details
//   const [house, setHouse] = useState("");
//   const [street, setStreet] = useState("");
//   const [landmark, setLandmark] = useState("");
//   const [billing_address, setbilling_address] = useState("");
//   const [billing_city, setbilling_city] = useState("");
//   const [billing_pincode, setbilling_pincode] = useState("");
//   const [billing_state, setbilling_state] = useState("");
//   const [billing_country, setbilling_country] = useState("India");
//   const [billing_email, setbilling_email] = useState(auth?.user?.email);
//   const [billing_phone, setbilling_phone] = useState("");
//   const [shipping_is_billing, setshipping_is_billing] = useState("YES");

//   const navigate = useNavigate();

//   const total_price = product?.price - (product?.price * discount) / 100;

//   // console.log(total_price)

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`${backend_url}/api/v1/products/p/${pID}`);
//         if (!response.ok) throw new Error("Product not found");
//         const data = await response.json();
//         setProduct(data.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [pID]);

//   if (loading)
//     return (
//       <Wrapper>
//         <div className="text-center py-8">Loading...</div>
//       </Wrapper>
//     );
//   if (error)
//     return (
//       <Wrapper>
//         <div className="text-center py-8 text-red-500">{error}</div>
//       </Wrapper>
//     );

//   return (
//     <Wrapper>
//       <div className=" mx-auto w-full px-4 pb-8 bg-night">
//         <div className="w-full flex flex-row justify-center">
//           <img
//             src={Review}
//             className="w-full md:w-1/2 h-40 object-cover rounded-lg"
//           />
//         </div>
//         <div className=" flex flex-col md:flex-row gap-8 bg-night">
//           {/* Left Side - Product Image */}
//           <div className="md:w-1/3">
//             <div className="bg-yellow-50 p-4 content-center rounded-lg shadow-lg shadow-amber-400">
//               <img
//                 src={product.product_Images[0]}
//                 alt={product.name}
//                 className="w-full h-60 object-contain rounded-lg"
//               />
//             </div>
//           </div>

//           {/* Right Side - Product Details */}
//           <div className="md:w-1/2 space-y-6 bg-night">
//             <h1 className="text-3xl font-bold text-amber-400">
//               {product.name}
//             </h1>
//             <div className="text-lg font-semibold text-white">
//               Brand: <span className="text-blue-600">{product.brand}</span>
//             </div>
//             <div className="text-2xl font-bold text-green-400">
//               ₹{product.price}
//             </div>

//             <div className="w-full p-2 flex flex-col">
//               <div className="flex flex-row justify-between">
//                 <h1 className="text-gray-200">Product Price </h1>
//                 <h1 className="text-green-400">{product?.price}/-</h1>
//               </div>
//               <div className="flex flex-row justify-between">
//                 <h1 className="text-gray-200">Discount </h1>
//                 <h1 className="text-green-400">
//                   -{(product?.price * discount) / 100}/-
//                 </h1>
//               </div>
//               <div className="flex flex-row justify-between border-t-2 border-teal-200">
//                 <h1 className="text-gray-200">Total </h1>
//                 <h1 className="text-green-400 font-extrabold">
//                   -------- ₹{total_price}
//                 </h1>
//               </div>
//             </div>

//             {/* form details  */}
//             <div className="w-full flex-col justify-start items-center">
//               <h1 className="text-white text-xl font-bold">
//                 Fill the details to continue shopping....
//               </h1>
//               {/* Address Section */}
//               <div>
//                 <label for="house" className="text-white w-full">
//                   House/Flat No
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter House/Flat no"
//                   id="house"
//                   className="text-black w-full"
//                   onChange={(e) => setHouse(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label for="Street" className="text-white w-full">
//                   Street name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter your street name"
//                   id="Street"
//                   className="text-black w-full"
//                   onChange={(e) => setStreet(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label for="landmark" className="text-white w-full">
//                   Landmark
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter Land mark"
//                   id="landmark"
//                   className="text-black w-full"
//                   onChange={(e) => setLandmark(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label for="add" className="text-white w-full">
//                   Full Address
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter Address"
//                   id="add"
//                   className="text-black w-full"
//                   onChange={(e) => setbilling_address(e.target.value)}
//                   required
//                 />
//               </div>

//               <div>
//                 <label for="City" className="text-white w-full">
//                   City
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter City"
//                   id="City"
//                   className="text-black w-full"
//                   onChange={(e) => setbilling_city(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label for="State" className="text-white w-full">
//                   State
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter State"
//                   id="State"
//                   className="text-black w-full"
//                   onChange={(e) => setbilling_state(e.target.value)}
//                   required
//                 />
//               </div>

//               <div>
//                 <label for="pin" className="text-white w-full">
//                   Pincode
//                 </label>
//                 <input
//                   type="number"
//                   placeholder="Enter Pincode"
//                   id="pin"
//                   className="text-black w-full"
//                   onChange={(e) => setbilling_pincode(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label for="Phone" className="text-white w-full">
//                   Phone Number
//                 </label>
//                 <input
//                   type="number"
//                   placeholder="Enter Phone Number"
//                   id="Phone"
//                   className="text-black w-full"
//                   onChange={(e) => setbilling_phone(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Action Buttons */}
//             {auth?.user ? (
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button
//                   className="bg-amber-500 text-black font-bold px-6 py-3 rounded-lg hover:bg-amber-200 transition-colors flex-1"
//                   onClick={() => {
//                     // Validate necessary fields
//                     if (
//                       !house ||
//                       !street ||
//                       !billing_address ||
//                       !billing_city ||
//                       !billing_pincode ||
//                       !billing_state ||
//                       !billing_country ||
//                       !billing_phone
//                     ) {
//                       alert(
//                         "Please fill in all required fields before proceeding!",
//                       );
//                       return;
//                     }

//                     // Navigate if all fields are valid
//                     navigate(`/pay/${pID}`, {
//                       state: {
//                         house,
//                         street,
//                         landmark,
//                         billing_address,
//                         billing_city,
//                         billing_pincode,
//                         billing_state,
//                         billing_country,
//                         billing_email,
//                         billing_phone,
//                         shipping_is_billing,
//                         total_price,
//                       },
//                     });
//                   }}>
//                   Select Payment Method
//                 </button>
//               </div>
//             ) : (
//               <div>
//                 <h1>You have to login before continue</h1>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default OrderPage;





// import React, { useEffect, useState } from "react";
// import Wrapper from "../Layout/wrapper";
// import { useNavigate, useParams } from "react-router-dom";
// import { backend_url } from "../../utils/Config";
// import { useAuth } from "../../context/AuthContext";
// import Review from "../../images/review.png";

// const OrderPage = () => {
//   const { pID } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [discount] = useState(20);
//   const [error, setError] = useState(null);
//   const [auth] = useAuth();

//   const [house, setHouse] = useState("");
//   const [street, setStreet] = useState("");
//   const [landmark, setLandmark] = useState("");
//   const [billing_address, setbilling_address] = useState("");
//   const [billing_city, setbilling_city] = useState("");
//   const [billing_pincode, setbilling_pincode] = useState("");
//   const [billing_state, setbilling_state] = useState("");
//   const [billing_country] = useState("India");
//   const [billing_email] = useState(auth?.user?.email);
//   const [billing_phone, setbilling_phone] = useState("");
//   const [shipping_is_billing] = useState("YES");

//   const navigate = useNavigate();

//   const total_price = product?.price - (product?.price * discount) / 100;

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`${backend_url}/api/v1/products/p/${pID}`);
//         if (!response.ok) throw new Error("Product not found");
//         const data = await response.json();
//         setProduct(data.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [pID]);

//   if (loading) return <Wrapper><div className="text-center py-8">Loading...</div></Wrapper>;
//   if (error) return <Wrapper><div className="text-center py-8 text-red-500">{error}</div></Wrapper>;

//   return (
//     <Wrapper>
//       <div className="mx-auto w-full px-4 pb-8 bg-[#f7d794]">
//         <div className="container mx-auto px-4 py-8 flex flex-col gap-8 md:flex-row md:items-start md:justify-between overflow-x-hidden">
//           {/* LEFT SIDE: Product Table */}
//           <div className="md:w-2/3">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Summary</h2>
//             <div className="border border-secondary rounded-lg overflow-x-auto shadow-sm bg-primary">
//               <table className="w-full text-left">
//                 <thead className="bg-secondary border-b-2">
//                   <tr>
//                     <th className="p-3">Image</th>
//                     <th className="p-3">Product</th>
//                     <th className="p-3 text-center">Brand</th>
//                     <th className="p-3 text-center">Price</th>
//                     <th className="p-3 text-center">Discounted</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr className="hover:bg-night transition-all">
//                     <td className="p-3">
//                       <img src={product.product_Images[0]} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
//                     </td>
//                     <td className="p-3 font-medium text-accent">{product.name}</td>
//                     <td className="p-3 text-center text-navbar-blue">{product.brand}</td>
//                     <td className="p-3 text-center">₹{product.price}</td>
//                     <td className="p-3 text-center text-green-600 font-semibold">₹{total_price}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
    
//           {/* RIGHT SIDE: Shipping Form */}
//           <div className="md:w-1/3 border border-secondary p-6 bg-night rounded-lg shadow-md">
//             <h2 className="text-xl font-bold mb-4 text-gray-700">Shipping Details</h2>
    
//             <div className="space-y-3">
//               <input type="text" placeholder="House/Flat No" className="w-full p-2 border border-secondary rounded bg-primary" onChange={(e) => setHouse(e.target.value)} />
//               <input type="text" placeholder="Street Name" className="w-full p-2 border border-secondary rounded bg-primary" onChange={(e) => setStreet(e.target.value)} />
//               <input type="text" placeholder="Landmark" className="w-full p-2 border border-secondary rounded bg-primary" onChange={(e) => setLandmark(e.target.value)} />
//               <input type="text" placeholder="Full Address" className="w-full p-2 border border-secondary rounded bg-primary" onChange={(e) => setbilling_address(e.target.value)} />
//               <input type="text" placeholder="City" className="w-full p-2 border border-secondary rounded bg-primary" onChange={(e) => setbilling_city(e.target.value)} />
//               <input type="text" placeholder="State" className="w-full p-2 border border-secondary rounded bg-primary" onChange={(e) => setbilling_state(e.target.value)} />
//               <input type="number" placeholder="Pincode" className="w-full p-2 border border-secondary rounded bg-primary" onChange={(e) => setbilling_pincode(e.target.value)} />
//               <input type="number" placeholder="Phone Number" className="w-full p-2 border border-secondary rounded bg-primary" onChange={(e) => setbilling_phone(e.target.value)} />
//             </div>
    
//             {auth?.user ? (
//               <button
//                 className="mt-5 bg-accent hover:bg-orange-400 transition-all text-white font-bold py-2 w-full rounded"
//                 onClick={() => {
//                   if (!house || !street || !billing_address || !billing_city || !billing_pincode || !billing_state || !billing_country || !billing_phone) {
//                     alert("Please fill in all required fields before proceeding!");
//                     return;
//                   }
//                   navigate(`/pay/${pID}`, {
//                     state: {
//                       house,
//                       street,
//                       landmark,
//                       billing_address,
//                       billing_city,
//                       billing_pincode,
//                       billing_state,
//                       billing_country,
//                       billing_email,
//                       billing_phone,
//                       shipping_is_billing,
//                       total_price,
//                     },
//                   });
//                 }}
//               >
//                 Select Payment Method
//               </button>
//             ) : (
//               <div className="text-red-500 mt-4">You have to login before continuing</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </Wrapper>
//   );
  
// };

// export default OrderPage;


import React, { useEffect, useState } from "react";
import Wrapper from "../Layout/wrapper";
import { useNavigate, useParams } from "react-router-dom";
import { backend_url } from "../../utils/Config";
import { useAuth } from "../../context/AuthContext";

const OrderPage = () => {
  const { pID } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [discount] = useState(20);
  const [error, setError] = useState(null);
  const [auth] = useAuth();

  const [house, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [billing_address, setbilling_address] = useState("");
  const [billing_city, setbilling_city] = useState("");
  const [billing_pincode, setbilling_pincode] = useState("");
  const [billing_state, setbilling_state] = useState("");
  const [billing_country] = useState("India");
  const [billing_email] = useState(auth?.user?.email);
  const [billing_phone, setbilling_phone] = useState("");
  const [shipping_is_billing] = useState("YES");

  const navigate = useNavigate();
  const total_price = product?.price - (product?.price * discount) / 100;

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

  if (loading) return <Wrapper><div className="text-center py-8">Loading...</div></Wrapper>;
  if (error) return <Wrapper><div className="text-center py-8 text-red-500">{error}</div></Wrapper>;

  return (
    <Wrapper>
      <div className="mx-auto w-full px-4 pb-8 bg-[#FFF1D5]">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto flex flex-col gap-8 md:flex-row md:items-start md:justify-between overflow-x-hidden">
            {/* LEFT SIDE: Product Table */}
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-accent mb-4 border-b border-secondary pb-2">🛍️ Product Summary</h2>
              <div className="border border-secondary rounded-lg overflow-x-auto shadow-sm bg-primary">
                <table className="w-full text-left">
                  <thead className="bg-secondary border-b-2">
                    <tr>
                      <th className="p-3">Image</th>
                      <th className="p-3">Product</th>
                      <th className="p-3 text-center">Brand</th>
                      <th className="p-3 text-center">Price</th>
                      <th className="p-3 text-center">Discounted</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-night transition-all">
                      <td className="p-3">
                        <img src={product.product_Images[0]} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                      </td>
                      <td className="p-3 font-medium text-accent">{product.name}</td>
                      <td className="p-3 text-center text-navbar-blue">{product.brand}</td>
                      <td className="p-3 text-center">₹{product.price}</td>
                      <td className="p-3 text-center text-green-600 font-semibold">₹{total_price}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* RIGHT SIDE: Shipping Form */}
            <div className="md:w-1/3 border border-secondary p-6 bg-night rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-accent mb-4 border-b border-secondary pb-2">📦 Shipping Details</h2>
              <div className="space-y-3">
                {[{placeholder: "House/Flat No", setter: setHouse}, {placeholder: "Street Name", setter: setStreet}, {placeholder: "Landmark", setter: setLandmark}, {placeholder: "Full Address", setter: setbilling_address}, {placeholder: "City", setter: setbilling_city}, {placeholder: "State", setter: setbilling_state}, {placeholder: "Pincode", setter: setbilling_pincode}, {placeholder: "Phone Number", setter: setbilling_phone}].map(({placeholder, setter}, idx) => (
                  <input key={idx} type={placeholder.includes("Phone") || placeholder.includes("Pincode") ? "number" : "text"} placeholder={placeholder} className="w-full p-2 border border-secondary rounded bg-primary focus:outline-none focus:ring-2 focus:ring-accent" onChange={(e) => setter(e.target.value)} />
                ))}
              </div>

              {auth?.user ? (
                <button
                  className="mt-5 bg-accent hover:bg-accent/80 transition-all text-white font-semibold py-2 w-full rounded-2xl shadow-sm"
                  onClick={() => {
                    if (!house || !street || !billing_address || !billing_city || !billing_pincode || !billing_state || !billing_country || !billing_phone) {
                      alert("Please fill in all required fields before proceeding!");
                      return;
                    }
                    navigate(`/pay/${pID}`, {
                      state: {
                        house,
                        street,
                        landmark,
                        billing_address,
                        billing_city,
                        billing_pincode,
                        billing_state,
                        billing_country,
                        billing_email,
                        billing_phone,
                        shipping_is_billing,
                        total_price,
                      },
                    });
                  }}
                >
                  Select Payment Method
                </button>
              ) : (
                <div className="text-red-500 mt-4">You have to login before continuing</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default OrderPage;

