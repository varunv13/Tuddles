// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { backend_url } from "../../utils/Config";
// import Wrapper from "../Layout/wrapper";

// const SinglePet = () => {
//   const { petID } = useParams();
//   const [pet, setPet] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPet = async () => {
//       try {
//         const response = await fetch(`${backend_url}/api/v1/pets/p/${petID}`);
//         if (!response.ok) throw new Error("Product not found");
//         const data = await response.json();
//         setPet(data.data);
//       } catch (err) {
//         console.error(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPet();
//   }, [petID]);

//   if (loading) return <div className="min-h-screen flex justify-center items-center text-gray-500">Loading...</div>;
//   if (!pet) return <div className="min-h-screen flex justify-center items-center text-red-500">Pet not found</div>;

//   const { pet_Type, breed_Name, pet_Images, pet_Description, pet_Age, price, seller_Info } = pet;

//   return (
//     <Wrapper>
//       <div className="min-h-screen bg-primary py-10 px-4 md:px-10">
//         <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
//           {/* Image Section */}
//           <div className="md:w-1/2 bg-secondary p-8 flex items-center justify-center">
//             <img
//               src={pet_Images[0]}
//               alt={breed_Name}
//               className="w-full h-96 object-contain rounded-2xl shadow-md"
//             />
//           </div>

//           {/* Details Section */}
//           <div className="md:w-1/2 p-10 flex flex-col justify-between">
//             <div>
//               <h1 className="text-4xl font-title_font text-accent mb-2">{breed_Name}</h1>
//               <h2 className="text-xl font-semibold text-night mb-6">{pet_Type}</h2>
//               <p className="text-gray-600 text-justify font-poppins mb-8 leading-relaxed">{pet_Description}</p>

//               <div className="flex items-center gap-6 mb-8">
//                 <span className="text-3xl font-bold text-green-600 font-poppins">₹{price}</span>
//                 <span className="text-sm text-gray-500 font-poppins">(Age: {pet_Age} year{pet_Age > 1 ? "s" : ""})</span>
//               </div>

//               {/* Seller Info */}
//               <div className="border-2 border-night p-5 rounded-2xl bg-secondary shadow-sm mb-8">
//                 <h3 className="text-xl font-semibold text-gray-700 font-poppins mb-3">Seller Information</h3>
//                 <p className="text-sm text-gray-600 font-poppins">Name: {seller_Info.name}</p>
//                 <p className="text-sm text-gray-600 font-poppins">Contact: {seller_Info.contact}</p>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex flex-col gap-4">
//               <button
//                 className="w-full bg-accent hover:bg-orange-500 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:scale-[1.02] transition-all duration-300"
//                 onClick={() => navigate(`/o/${petID}`)}
//               >
//                 Order Now
//               </button>
//               <button
//                 className="w-full bg-lime-600 hover:bg-lime-700 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:scale-[1.02] transition-all duration-300"
//                 onClick={() => navigate(`/cart`)}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default SinglePet;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { backend_url } from "../../utils/Config";
import Wrapper from "../Layout/wrapper";

const SinglePet = () => {
  const { petID } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(`${backend_url}/api/v1/pets/p/${petID}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setPet(data.data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [petID]);

  if (loading) return <div className="min-h-screen flex justify-center items-center text-gray-500">Loading...</div>;
  if (!pet) return <div className="min-h-screen flex justify-center items-center text-red-500">Pet not found</div>;

  const { pet_Type, breed_Name, pet_Images, pet_Description, pet_Age, price, seller_Info } = pet;

  return (
    <Wrapper>
      <div className="min-h-screen bg-primary py-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all">
          
          {/* Image Section */}
          <div className="md:w-1/2 p-10 flex items-center justify-center bg-secondary rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
            <img
              src={pet_Images[0]}
              alt={breed_Name}
              className="w-full h-96 object-contain rounded-2xl shadow-md hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 p-10 flex flex-col justify-between font-poppins">
            <div>
              {/* Pet Type Badge */}
              <span className="inline-block bg-night text-gray-800 text-xs font-bold py-1 px-3 rounded-full uppercase tracking-wider mb-4">
                {pet_Type}
              </span>

              {/* Title */}
              <h1 className="text-5xl font-title_font text-accent mb-6">{breed_Name}</h1>

              {/* Description */}
              <p className="text-gray-700 text-lg mb-8 leading-relaxed text-justify">
                {pet_Description}
              </p>

              {/* Seller Info */}
              <div className="bg-navbar-blue/20 p-6 rounded-2xl mb-8 border border-navbar-blue shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Seller Information</h3>
                <p className="text-sm text-gray-600">Name: {seller_Info.name}</p>
                <p className="text-sm text-gray-600">Contact: {seller_Info.contact}</p>
              </div>
            </div>

            {/* Price & Buttons */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl font-bold text-green-600">₹{price}</span>
                <span className="text-sm text-gray-500">(Age: {pet_Age} year{pet_Age > 1 ? "s" : ""})</span>
              </div>

              <button
                className="w-full bg-accent hover:bg-orange-500 text-white py-3 rounded-xl font-bold text-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
                onClick={() => navigate(`/o/pet/${petID}`)}
              >
                🛒 Order Now
              </button>
              <button
                className="w-full bg-lime-600 hover:bg-lime-700 text-white py-3 rounded-xl font-bold text-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
                onClick={() => navigate(`/cart`)}
              >
                ➕ Add to Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </Wrapper>
  );
};

export default SinglePet;
