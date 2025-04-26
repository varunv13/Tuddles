// import React, { useState } from "react";
// import Navbar from "../../shared/Navbar";
// import Footer from "../../shared/Footer";

// const PetAdoptionForm = () => {
//   const [formData, setFormData] = useState({
//     petName: "Max", // You can dynamically update this based on selected pet
//     adopterName: "",
//     adopterEmail: "",
//     adopterPhone: "",
//     adopterAddress: "",
//     adopterMessage: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Adoption request submitted:", formData);
//     alert("Adoption request submitted successfully!");
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-zinc-900 text-white p-6">
//         {/* Hero Section */}
//         <div className="w-full max-w-5xl ml-56 flex flex-col md:flex-row items-center gap-8 mb-10">
//           <img
//             src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=1000&auto=format&fit=crop&q=60"
//             alt="Adoptable Pet"
//             className="rounded-lg max-w-full h-80 object-cover shadow-lg"
//           />
//           <div className="md:w-1/2">
//             <h1 className="text-3xl font-bold mb-4 text-amber-300 drop-shadow">
//               Adopt a Pet - Max
//             </h1>
//             <p className="text-zinc-300">
//               Fill out the form below to adopt Max, a 2-year-old Golden
//               Retriever who’s looking for his forever home. He is friendly,
//               playful, and loves attention!
//             </p>
//           </div>
//         </div>

//         {/* Adoption Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-zinc-800 rounded-lg shadow-xl max-w-3xl mx-auto p-6 md:p-8 space-y-6">
//           <h2 className="text-2xl font-bold text-amber-300">Adopt Max</h2>

//           {/* Adopter's Name */}
//           <div>
//             <label className="block text-sm mb-2 text-zinc-300">
//               Your Name
//             </label>
//             <input
//               type="text"
//               name="adopterName"
//               value={formData.adopterName}
//               onChange={handleChange}
//               className="w-full p-2 rounded bg-zinc-700 text-white outline-none"
//               required
//             />
//           </div>

//           {/* Adopter's Email */}
//           <div>
//             <label className="block text-sm mb-2 text-zinc-300">
//               Your Email
//             </label>
//             <input
//               type="email"
//               name="adopterEmail"
//               value={formData.adopterEmail}
//               onChange={handleChange}
//               className="w-full p-2 rounded bg-zinc-700 text-white outline-none"
//               required
//             />
//           </div>

//           {/* Adopter's Phone */}
//           <div>
//             <label className="block text-sm mb-2 text-zinc-300">
//               Your Phone Number
//             </label>
//             <input
//               type="tel"
//               name="adopterPhone"
//               value={formData.adopterPhone}
//               onChange={handleChange}
//               className="w-full p-2 rounded bg-zinc-700 text-white outline-none"
//               required
//             />
//           </div>

//           {/* Adopter's Address */}
//           <div>
//             <label className="block text-sm mb-2 text-zinc-300">
//               Your Address
//             </label>
//             <textarea
//               name="adopterAddress"
//               rows="3"
//               value={formData.adopterAddress}
//               onChange={handleChange}
//               className="w-full p-2 rounded bg-zinc-700 text-white outline-none"
//               placeholder="Enter your address"
//               required
//             />
//           </div>

//           {/* Message */}
//           <div>
//             <label className="block text-sm mb-2 text-zinc-300">
//               Message to the Shelter
//             </label>
//             <textarea
//               name="adopterMessage"
//               rows="4"
//               value={formData.adopterMessage}
//               onChange={handleChange}
//               className="w-full p-2 rounded bg-zinc-700 text-white outline-none"
//               placeholder="Why do you want to adopt Max?"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-6 rounded font-semibold transition-colors duration-300">
//             Submit Adoption Request
//           </button>
//         </form>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default PetAdoptionForm;

// import React, { useEffect, useState } from "react";
// import Wrapper from "../Layout/wrapper";
// import axios from "axios";
// import { backend_url } from "../../utils/Config";
// import ProductWithOption from "../../shared/ProductWithOption";

// const priceRanges = [
//   { label: "Under $300", min: 0, max: 300 },
//   { label: "Under $500", min: 0, max: 500 },
//   { label: "Under $700", min: 0, max: 700 },
//   { label: "Under $1000", min: 0, max: 1000 },
//   { label: "Under $2000", min: 0, max: 2000 },
// ];

// const petCategories = [
//   "Dogs",
//   "Cats",
//   "Birds",
//   "Rabbits",
//   "Reptiles",
//   "Fish",
//   "Rodents",
//   "Exotic",
// ];

// const PetAdoptionForm = () => {
//   const [pets, setPets] = useState([]);
//   const [filteredPets, setFilteredPets] = useState([]);
//   const [selectedPrice, setSelectedPrice] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   useEffect(() => {
//     fetchPets();
//   }, []);

//   useEffect(() => {
//     applyFilters();
//   }, [selectedPrice, selectedCategory, pets]);

//   const fetchPets = async () => {
//     try {
//       const { data } = await axios.get(`${backend_url}/api/v1/pets`);
//       setPets(data.data);
//       setFilteredPets(data.data);
//     } catch (error) {
//       console.error("Failed to fetch pets", error);
//     }
//   };

//   const applyFilters = () => {
//     let result = [...pets];

//     if (selectedPrice) {
//       result = result.filter(
//         (p) => p.price >= selectedPrice.min && p.price <= selectedPrice.max
//       );
//     }

//     if (selectedCategory) {
//       result = result.filter((p) => p.category === selectedCategory);
//     }

//     setFilteredPets(result);
//   };

//   const isSidebarCompact = selectedCategory || selectedPrice;
//   const categoryBgClass = selectedCategory ? 'bg-[#A0CED9]' : 'bg-[#D0EBF4]';
//   const priceBgClass = selectedPrice ? 'bg-[#A0CED9]' : 'bg-[#D0EBF4]';

//   return (
//     <Wrapper current={"pets"}>
//       <div className="w-full min-h-screen bg-primary px-4 md:px-8 py-6">
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Sidebar */}
//           <aside
//             className={`w-full md:w-1/4 rounded-2xl p-4 shadow-md space-y-8 transition-all duration-300 ${
//               isSidebarCompact ? 'h-auto' : 'h-50'
//             }`}
//           >
//             {/* Category Section */}
//             <div className={`${categoryBgClass} p-4 rounded-lg`}>
//               <h3 className="text-lg font-semibold text-gray-800 mb-3">Pet Category</h3>
//               <ul className="space-y-2">
//                 {petCategories.map((category) => (
//                   <li key={category}>
//                     <label className="flex justify-between items-center cursor-pointer text-sm text-[#30504E] hover:text-accent">
//                       <span>{category}</span>
//                       <input
//                         type="radio"
//                         name="pet-category"
//                         checked={selectedCategory === category}
//                         onChange={() => setSelectedCategory(category)}
//                         className="accent-accent"
//                       />
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Price Section */}
//             <div className={`${priceBgClass} p-4 rounded-lg`}>
//               <h3 className="text-lg font-semibold text-gray-800 mb-3">Price</h3>
//               <ul className="space-y-2">
//                 {priceRanges.map((range) => (
//                   <li key={range.label}>
//                     <label className="flex justify-between items-center cursor-pointer text-sm text-gray-700 hover:text-accent">
//                       <span>{range.label}</span>
//                       <input
//                         type="radio"
//                         name="price"
//                         checked={selectedPrice?.label === range.label}
//                         onChange={() => setSelectedPrice(range)}
//                         className="accent-accent"
//                       />
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Reset Filters Button */}
//             <button
//               onClick={() => {
//                 setSelectedCategory(null);
//                 setSelectedPrice(null);
//               }}
//               className="w-full bg-accent text-white font-medium py-2 rounded-lg hover:brightness-105 transition-all duration-200"
//             >
//               Reset Filters
//             </button>
//           </aside>

//           {/* Pet Grid */}
//           <main className="w-full md:w-3/4">
//             <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
//               Available Pets for You
//             </h1>

//             {filteredPets.length ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredPets.map((pet) => (
//                   <ProductWithOption
//                     key={pet._id}
//                     pID={pet._id}
//                     urls={pet.pet_Images}
//                     product_name={pet.name}
//                     price={pet.price}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center text-gray-600">No Pets Available</div>
//             )}
//           </main>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default PetAdoptionForm;

// import React, { useEffect, useState } from "react";
// import Wrapper from "../Layout/wrapper";
// import axios from "axios";
// import { backend_url } from "../../utils/Config";
// import ProductWithOption from "../../shared/ProductWithOption";

// const Pets = () => {
//   const [pets, setPets] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchPets();
//   }, []);

//   const fetchPets = async () => {
//     try {
//       const { data } = await axios.get(`${backend_url}/api/v1/pets`);
//       // Assuming pets are just products under the "Pet Adoption & Services" category
//       const petProducts = data.data.filter(
//         (product) => product.category === "Pet Adoption & Services"
//       );
//       setPets(petProducts);
//     } catch (error) {
//       console.error("Failed to fetch pets", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Wrapper current={"pets"}>
//       <div className="w-full min-h-screen bg-primary px-4 md:px-8 py-6">
//         <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
//           Find Your New Best Friend 🐶🐱
//         </h1>

//         {loading ? (
//           <div className="text-center text-gray-600">Loading pets...</div>
//         ) : pets.length ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {pets.map((pet) => (
//               <ProductWithOption
//                 key={pet._id}
//                 pID={pet._id}
//                 urls={pet.product_Images[0]}
//                 product_name={pet.name}
//                 price={pet.price}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center text-gray-600">No Pets Available</div>
//         )}
//       </div>
//     </Wrapper>
//   );
// };

// export default Pets;

import React, { useEffect, useState } from "react";
import Wrapper from "../Layout/wrapper";
import axios from "axios";
import { backend_url } from "../../utils/Config";
import PetCard from "../../shared/PetCard"; // Correct Import

// const Pets = () => {
//   const [pets, setPets] = useState([]); // state for pets data
//   const [filteredPets, setFilteredPets] = useState([]); // filtered pets
//   const [selectedType, setSelectedType] = useState(null); // selected pet type

//   useEffect(() => {
//     fetchPets();
//   }, []);

//   useEffect(() => {
//     applyFilters();
//   }, [selectedType, pets]);

//   const fetchPets = async () => {
//     try {
//       const { data } = await axios.get(`${backend_url}/api/v1/pets`);
//       setPets(data.data); // assuming response contains the pet data in 'data'
//       setFilteredPets(data.data);  // initially, no filter
//     } catch (error) {
//       console.error("Failed to fetch pets", error);
//     }
//   };

//   const applyFilters = () => {
//     let result = [...pets];

//     // Apply filter based on pet type
//     if (selectedType) {
//       result = result.filter((p) => p.pet_Type === selectedType);
//     }

//     setFilteredPets(result);
//   };

//   // Pet Types (can be customized further)
//   const petTypes = [
//     "Dogs",
//     "Cats",
//     "Birds",
//     "Fish",
//     "Reptiles",
//     "Small Pets"
//   ];

//   return (
//     <Wrapper current={"pets"}>
//       <div className="w-full min-h-screen bg-primary px-4 md:px-8 py-6">
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Sidebar */}
//           <aside className="w-full md:w-1/4 rounded-2xl p-4 shadow-md space-y-8">
//             {/* Pet Type Section */}
//             <div className="bg-[#FBC4AB] p-4 rounded-lg">
//               <h3 className="text-lg font-semibold text-gray-800 mb-3">Pet Type</h3>
//               <ul className="space-y-2">
//                 {petTypes.map((type) => (
//                   <li key={type}>
//                     <label className="flex justify-between items-center cursor-pointer text-sm text-[#5C3B28] hover:text-accent">
//                       <span>{type}</span>
//                       <input
//                         type="radio"
//                         name="petType"
//                         checked={selectedType === type}
//                         onChange={() => setSelectedType(type)}
//                         className="accent-accent"
//                       />
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Reset Filters Button */}
//             <button
//               onClick={() => {
//                 setSelectedType(null);
//               }}
//               className="w-full bg-accent text-white font-medium py-2 rounded-lg hover:brightness-105 transition-all duration-200"
//             >
//               Reset Filters
//             </button>
//           </aside>

//           {/* Pet Grid */}
//           <main className="w-full md:w-3/4">
//             <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
//               Available Pets for Adoption
//             </h1>

//             {filteredPets.length ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredPets.map((pet) => (
//                   <ProductWithOption
//                     key={pet._id}
//                     pID={pet._id}
//                     urls={pet.pet_Images[0]} // assuming the first image is the primary
//                     product_name={pet.breed_Name} // showing breed name as product name
//                     price={pet.price}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center text-gray-600">No Pets Available</div>
//             )}
//           </main>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// const Pets = () => {
// const [pets, setPets] = useState([]);
// const [filteredPets, setFilteredPets] = useState([]);
// const [selectedPetType, setSelectedPetType] = useState(null);
// const [selectedPrice, setSelectedPrice] = useState(null);

// const petTypes = ["Dogs", "Cats", "Birds", "Fish", "Reptiles", "Small Pets"];
// const priceRanges = [
//   { label: "Under 300", min: 0, max: 300 },
//   { label: "Under 500", min: 0, max: 500 },
//   { label: "Under 700", min: 0, max: 700 },
//   { label: "Under 1000", min: 0, max: 1000 },
//   { label: "Under 2000", min: 0, max: 2000 },
// ];

// useEffect(() => {
//   fetchPets();
// }, []);

// useEffect(() => {
//   applyFilters();
// }, [selectedPetType, selectedPrice, pets]);

// const fetchPets = async () => {
//   try {
//     const { data } = await axios.get(`${backend_url}/api/v1/pets`);
//     setPets(data.data);
//     setFilteredPets(data.data);
//   } catch (error) {
//     console.error("Failed to fetch pets", error);
//   }
// };

// const applyFilters = () => {
//   let result = [...pets];
//   if (selectedPetType) {
//     result = result.filter((pet) => pet.pet_Type === selectedPetType);
//   }

//   if (selectedPrice) {
//     result = result.filter(
//       (pet) =>
//         pet.price >= selectedPrice.min && pet.price <= selectedPrice.max,
//     );
//   }

//   setFilteredPets(result);
// };

// return (
//   <Wrapper current={"pets"}>
//     <div className="w-full min-h-screen bg-primary px-4 md:px-8 py-6">
//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Sidebar */}
//         <aside className="w-full md:w-1/4 rounded-2xl p-4 shadow-md space-y-8">
//           {/* Pet Type Section */}
//           <div className="bg-[#F7BFB4] p-4 rounded-lg">
//             <h3 className="text-lg font-semibold text-gray-800 mb-3">
//               Pet Type
//             </h3>
//             <ul className="space-y-2">
//               {petTypes.map((type) => (
//                 <li key={type}>
//                   <label className="flex justify-between items-center cursor-pointer text-sm text-[#5C3B28] hover:text-accent">
//                     <span>{type}</span>
//                     <input
//                       type="radio"
//                       name="petType"
//                       checked={selectedPetType === type}
//                       onChange={() => setSelectedPetType(type)}
//                       className="accent-accent"
//                     />
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Price Section */}
//           {/* <div className="bg-[#FBC4AB] p-4 rounded-lg">
//             <h3 className="text-lg font-semibold text-gray-800 mb-3">Price</h3>
//             <ul className="space-y-2">
//               {priceRanges.map((range) => (
//                 <li key={range.label}>
//                   <label className="flex justify-between items-center cursor-pointer text-sm text-gray-700 hover:text-accent">
//                     <span>{range.label}</span>
//                     <input
//                       type="radio"
//                       name="price"
//                       checked={selectedPrice === range}
//                       onChange={() => setSelectedPrice(range)}
//                       className="accent-accent"
//                     />
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div> */}
//           <div className="bg-[#FBC4AB] p-4 rounded-lg">
//             <h3 className="text-lg font-semibold text-gray-800 mb-3">
//               Price
//             </h3>
//             <ul className="space-y-2">
//               {priceRanges.map((range) => (
//                 <li key={range.label}>
//                   <label className="flex justify-between items-center cursor-pointer text-sm text-gray-700 hover:text-accent">
//                     <span>{range.label}</span>
//                     <input
//                       type="radio"
//                       name="price"
//                       checked={
//                         selectedPrice &&
//                         selectedPrice.min === range.min &&
//                         selectedPrice.max === range.max
//                       }
//                       onChange={() => setSelectedPrice(range)}
//                       className="accent-accent"
//                     />
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Reset Filters Button */}
//           <button
//             onClick={() => {
//               setSelectedPetType(null);
//               setSelectedPrice(null);
//             }}
//             className="w-full bg-accent text-white font-medium py-2 rounded-lg hover:brightness-105 transition-all duration-200">
//             Reset Filters
//           </button>
//         </aside>

//         {/* Pet Grid */}
//         <main className="w-full md:w-3/4">
//           <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
//             Available Pets
//           </h1>

//           {filteredPets.length ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredPets.map((pet) => (
//                 <ProductWithOption
//                   key={pet._id}
//                   pID={pet._id}
//                   urls={pet.pet_Images[0]}
//                   product_name={pet.breed_Name}
//                   price={pet.price}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center text-gray-600">No Pets Available</div>
//           )}
//         </main>
//       </div>
//     </div>
//   </Wrapper>
// );

// };

// const priceRanges = [
//   { label: "Under $300", min: 0, max: 300 },
//   { label: "Under $500", min: 0, max: 500 },
//   { label: "Under $700", min: 0, max: 700 },
//   { label: "Under $1000", min: 0, max: 1000 },
//   { label: "Under $2000", min: 0, max: 2000 },
// ];

// const categories = ["Dog", "Cat", "Bird", "Fish", "Reptile", "Small Pet"];

// const Pets = () => {
//   const [pets, setPets] = useState([]);
//   const [filteredPets, setFilteredPets] = useState([]);
//   const [selectedPrice, setSelectedPrice] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   useEffect(() => {
//     fetchPets();
//   }, []);

//   useEffect(() => {
//     applyFilters();
//   }, [selectedPrice, selectedCategory, pets]);

//   // const fetchPets = async () => {
//   //   try {
//   //     const { data } = await axios.get(`${backend_url}/api/v1/pets`);
//   //     setPets(data.data);
//   //     setFilteredPets(data.data);
//   //   } catch (error) {
//   //     console.error("Failed to fetch pets", error);
//   //   }
//   // };

//   const fetchPets = async () => {
//     try {
//       const { data } = await axios.get(`${backend_url}/api/v1/pets`, {
//         params: {
//           page: 1, // First page
//           limit: 8, // Or adjust as needed
//         },
//       });
//       setPets(data.data);
//       setFilteredPets(data.data);
//     } catch (error) {
//       console.error("Failed to fetch pets", error);
//     }
//   };

//   const applyFilters = () => {
//     let result = [...pets];

//     if (selectedPrice) {
//       result = result.filter(
//         (p) => p.price >= selectedPrice.min && p.price <= selectedPrice.max,
//       );
//     }

//     if (selectedCategory) {
//       result = result.filter((p) => p.pet_Type === selectedCategory);
//     }

//     setFilteredPets(result);
//   };

//   // Check if filters are applied for compact style
//   const isSidebarCompact = selectedCategory || selectedPrice;

//   return (
//     <Wrapper current={"pets"}>
//       <div className="w-full min-h-screen bg-primary px-4 md:px-8 py-6">
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Sidebar */}
//           <aside
//             className={`w-full md:w-1/4 rounded-2xl p-4 shadow-md space-y-8 transition-all duration-300 ${
//               isSidebarCompact ? "h-auto" : "h-50"
//             }`}>
//             {/* Category Section */}
//             <div className="bg-[#FBC4AB] p-4 rounded-lg">
//               <h3 className="text-lg font-semibold text-gray-800 mb-3">
//                 Pet Type
//               </h3>
//               <ul className="space-y-2">
//                 {categories.map((category) => (
//                   <li key={category}>
//                     <label className="flex justify-between items-center cursor-pointer text-sm text-[#5C3B28] hover:text-accent">
//                       <span>{category}</span>
//                       <input
//                         type="radio"
//                         name="category"
//                         checked={selectedCategory === category}
//                         onChange={() => setSelectedCategory(category)}
//                         className="accent-accent"
//                       />
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Price Section */}
//             <div className="bg-[#FBC4AB] p-4 rounded-lg">
//               <h3 className="text-lg font-semibold text-gray-800 mb-3">
//                 Price
//               </h3>
//               <ul className="space-y-2">
//                 {priceRanges.map((range) => (
//                   <li key={range.label}>
//                     <label className="flex justify-between items-center cursor-pointer text-sm text-gray-700 hover:text-accent">
//                       <span>{range.label}</span>
//                       <input
//                         type="radio"
//                         name="price"
//                         checked={
//                           selectedPrice &&
//                           selectedPrice.min === range.min &&
//                           selectedPrice.max === range.max
//                         }
//                         onChange={() => setSelectedPrice(range)}
//                         className="accent-accent"
//                       />
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Reset Filters Button */}
//             <button
//               onClick={() => {
//                 setSelectedCategory(null);
//                 setSelectedPrice(null);
//               }}
//               className="w-full bg-accent text-white font-medium py-2 rounded-lg hover:brightness-105 transition-all duration-200">
//               Reset Filters
//             </button>
//           </aside>

//           {/* Pet Grid */}
//           <main className="w-full md:w-3/4">
//             <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
//               Available Pets
//             </h1>

//             {filteredPets.length === 0 ? (
//               <div className="text-center text-gray-600 flex flex-col items-center">
//                 <p>No Pets Available</p>
//                 <div className="text-4xl">
//                   <span role="img" aria-label="dog">
//                     🐕
//                   </span>
//                   <span role="img" aria-label="cat">
//                     🐈
//                   </span>
//                 </div>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredPets.map((pet) => (
//                   <PetCard
//                     key={pet._id}
//                     petID={pet._id}
//                     image={pet.pet_Images[0]}
//                     name={pet.breed_Name}
//                     price={pet.price}
//                     description={pet.pet_Description}
//                   />
//                 ))}
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default Pets;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Wrapper from "../components/Wrapper"; // adjust the path if different
// import PetCard from "../components/PetCard"; // adjust the path if different
// import { backend_url } from "../utils/constants"; // adjust the path if different

const priceRanges = [
  { label: "Under $300", min: 0, max: 300 },
  { label: "Under $500", min: 0, max: 500 },
  { label: "Under $700", min: 0, max: 700 },
  { label: "Under $1000", min: 0, max: 1000 },
  { label: "Under $2000", min: 0, max: 2000 },
];

const categories = ["Dog", "Cat", "Bird", "Fish", "Reptile", "Small Pet"];

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPets(currentPage);
  }, [currentPage]);

  useEffect(() => {
    applyFilters();
  }, [selectedPrice, selectedCategory, pets]);

  const fetchPets = async (page = 1) => {
    try {
      const { data } = await axios.get(`${backend_url}/api/v1/pets`, {
        params: {
          page: page,
          limit: 5, // How many pets you want per page
        },
      });
      setPets(data.data);
      setFilteredPets(data.data);
      setTotalPages(data.pagination.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch pets", error);
    }
  };

  const applyFilters = () => {
    let result = [...pets];

    if (selectedPrice) {
      result = result.filter(
        (p) => p.price >= selectedPrice.min && p.price <= selectedPrice.max,
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.pet_Type === selectedCategory);
    }

    setFilteredPets(result);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const isSidebarCompact = selectedCategory || selectedPrice;

  return (
    <Wrapper current={"pets"}>
      <div className="w-full min-h-screen bg-primary px-4 md:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside
            className={`w-full md:w-1/4 rounded-2xl p-4 shadow-md space-y-8 transition-all duration-300 ${
              isSidebarCompact ? "h-auto" : "h-50"
            }`}>
            {/* Category Section */}
            <div className="bg-[#FBC4AB] p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Pet Type
              </h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <label className="flex justify-between items-center cursor-pointer text-sm text-[#5C3B28] hover:text-accent">
                      <span>{category}</span>
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="accent-accent"
                      />
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Section */}
            <div className="bg-[#FBC4AB] p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Price
              </h3>
              <ul className="space-y-2">
                {priceRanges.map((range) => (
                  <li key={range.label}>
                    <label className="flex justify-between items-center cursor-pointer text-sm text-gray-700 hover:text-accent">
                      <span>{range.label}</span>
                      <input
                        type="radio"
                        name="price"
                        checked={
                          selectedPrice &&
                          selectedPrice.min === range.min &&
                          selectedPrice.max === range.max
                        }
                        onChange={() => setSelectedPrice(range)}
                        className="accent-accent"
                      />
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reset Filters Button */}
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedPrice(null);
              }}
              className="w-full bg-accent text-white font-medium py-2 rounded-lg hover:brightness-105 transition-all duration-200">
              Reset Filters
            </button>
          </aside>

          {/* Main Content */}
          <main className="w-full md:w-3/4">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
              Available Pets
            </h1>

            {filteredPets.length === 0 ? (
              <div className="text-center text-gray-600 flex flex-col items-center">
                <p>No Pets Available</p>
                <div className="text-4xl">
                  <span role="img" aria-label="dog">
                    🐕
                  </span>
                  <span role="img" aria-label="cat">
                    🐈
                  </span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPets.map((pet) => (
                  <PetCard
                    key={pet._id}
                    petID={pet._id}
                    image={pet.pet_Images[0]}
                    name={pet.breed_Name}
                    price={pet.price}
                    description={pet.pet_Description}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-8 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-accent hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === index + 1
                      ? "bg-accent text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-accent hover:text-white transition-all duration-200`}>
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-accent hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            </div>
          </main>
        </div>
      </div>
    </Wrapper>
  );
};

export default Pets;
