import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Wrapper from "../Layout/wrapper";
import { backend_url } from "../../utils/Config";
import { useAuth } from "../../context/AuthContext";

// const OrderPetPage = () => {
//   const { petID } = useParams();
//   const [pet, setPet] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [discount] = useState(10); // pets can have 10% discount maybe?
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
//   const total_price = pet?.price - (pet?.price * discount) / 100;

//   useEffect(() => {
//     const fetchPet = async () => {
//       try {
//         const response = await fetch(`${backend_url}/api/v1/pets/p/${petID}`);
//         if (!response.ok) throw new Error("Pet not found");
//         const data = await response.json();
//         setPet(data.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPet();
//   }, [petID]);

//   if (loading) return <Wrapper><div className="text-center py-8">Loading...</div></Wrapper>;
//   if (error) return <Wrapper><div className="text-center py-8 text-red-500">{error}</div></Wrapper>;

//   return (
//     <Wrapper>
//       <div className="mx-auto w-full px-4 pb-8 bg-[#FFF1D5]">
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-6xl mx-auto flex flex-col gap-8 md:flex-row md:items-start md:justify-between overflow-x-hidden">
            
//             {/* LEFT SIDE: Pet Summary */}
//             <div className="md:w-2/3">
//               <h2 className="text-2xl font-bold text-accent mb-4 border-b border-secondary pb-2">🐾 Pet Summary</h2>
//               <div className="border border-secondary rounded-lg overflow-x-auto shadow-sm bg-primary">
//                 <table className="w-full text-left">
//                   <thead className="bg-secondary border-b-2">
//                     <tr>
//                       <th className="p-3">Image</th>
//                       <th className="p-3">Breed</th>
//                       <th className="p-3 text-center">Type</th>
//                       <th className="p-3 text-center">Age</th>
//                       <th className="p-3 text-center">Price</th>
//                       <th className="p-3 text-center">Discounted</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr className="hover:bg-night transition-all">
//                       <td className="p-3">
//                         <img src={pet.pet_Images[0]} alt={pet.breed_Name} className="w-16 h-16 rounded-lg object-cover" />
//                       </td>
//                       <td className="p-3 font-medium text-accent">{pet.breed_Name}</td>
//                       <td className="p-3 text-center text-navbar-blue">{pet.pet_Type}</td>
//                       <td className="p-3 text-center">{pet.pet_Age} yr</td>
//                       <td className="p-3 text-center">₹{pet.price}</td>
//                       <td className="p-3 text-center text-green-600 font-semibold">₹{total_price}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* RIGHT SIDE: Shipping Form */}
//             <div className="md:w-1/3 border border-secondary p-6 bg-night rounded-lg shadow-md">
//               <h2 className="text-xl font-bold text-accent mb-4 border-b border-secondary pb-2">📦 Shipping Details</h2>
//               <div className="space-y-3">
//                 {[{placeholder: "House/Flat No", setter: setHouse}, {placeholder: "Street Name", setter: setStreet}, {placeholder: "Landmark", setter: setLandmark}, {placeholder: "Full Address", setter: setbilling_address}, {placeholder: "City", setter: setbilling_city}, {placeholder: "State", setter: setbilling_state}, {placeholder: "Pincode", setter: setbilling_pincode}, {placeholder: "Phone Number", setter: setbilling_phone}].map(({placeholder, setter}, idx) => (
//                   <input key={idx} type={placeholder.includes("Phone") || placeholder.includes("Pincode") ? "number" : "text"} placeholder={placeholder} className="w-full p-2 border border-secondary rounded bg-primary focus:outline-none focus:ring-2 focus:ring-accent" onChange={(e) => setter(e.target.value)} />
//                 ))}
//               </div>

//               {auth?.user ? (
//                 <button
//                   className="mt-5 bg-accent hover:bg-accent/80 transition-all text-white font-semibold py-2 w-full rounded-2xl shadow-sm"
//                   onClick={() => {
//                     if (!house || !street || !billing_address || !billing_city || !billing_pincode || !billing_state || !billing_country || !billing_phone) {
//                       alert("Please fill in all required fields before proceeding!");
//                       return;
//                     }
//                     navigate(`/pay-pet/${petID}`, {
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
//                   }}
//                 >
//                   Select Payment Method
//                 </button>
//               ) : (
//                 <div className="text-red-500 mt-4">You have to login before continuing</div>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

const OrderPetPage = () => {
    const { pID } = useParams();
    const [pet, setpet] = useState(null);
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
    const total_price = pet?.price - (pet?.price * discount) / 100;
  
    useEffect(() => {
      const fetchpet = async () => {
        try {
          const response = await fetch(`${backend_url}/api/v1/pets/p/${pID}`);
          if (!response.ok) throw new Error("pet not found");
          const data = await response.json();
          setpet(data.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchpet();
    }, [pID]);
  
    if (loading) return <Wrapper><div className="text-center py-8">Loading...</div></Wrapper>;
    if (error) return <Wrapper><div className="text-center py-8 text-red-500">{error}</div></Wrapper>;
  
    if (!pet) {
      return <Wrapper><div className="text-center py-8">pet not available</div></Wrapper>;
    }
  
    return (
      <Wrapper>
        <div className="mx-auto w-full px-4 pb-8 bg-[#FFF1D5]">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto flex flex-col gap-8 md:flex-row md:items-start md:justify-between overflow-x-hidden">
              {/* LEFT SIDE: pet Table */}
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold text-accent mb-4 border-b border-secondary pb-2">🛍️ pet Summary</h2>
                <div className="border border-secondary rounded-lg overflow-x-auto shadow-sm bg-primary">
                  <table className="w-full text-left">
                    <thead className="bg-secondary border-b-2">
                      <tr>
                        <th className="p-3">Image</th>
                        <th className="p-3">pet</th>
                        <th className="p-3 text-center">Brand</th>
                        <th className="p-3 text-center">Price</th>
                        <th className="p-3 text-center">Discounted</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-night transition-all">
                        <td className="p-3">
                          <img src={pet.pet_Images[0]} alt={pet.name} className="w-16 h-16 rounded-lg object-cover" />
                        </td>
                        <td className="p-3 font-medium text-accent">{pet.name}</td>
                        <td className="p-3 text-center text-navbar-blue">{pet.brand}</td>
                        <td className="p-3 text-center">₹{pet.price}</td>
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
  

export default OrderPetPage;
