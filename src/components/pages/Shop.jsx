// import React, { useEffect, useState } from "react";
// import Wrapper from "../Layout/wrapper";
// import axios from "axios";
// import { backend_url } from "../../utils/Config";
// import ProductWithOption from "../../shared/ProductWithOption";

// // This can be customized
// const priceRanges = [
//   { label: "Under $300", min: 0, max: 300 },
//   { label: "Under $500", min: 0, max: 500 },
//   { label: "Under $700", min: 0, max: 700 },
//   { label: "Under $1000", min: 0, max: 1000 },
//   { label: "Under $2000", min: 0, max: 2000 },
// ];

// // This needs to be changes according to the backend
// const categories = [
//   "Pet Food & Treats",
//   "Pet Accessories",
//   "Toys",
//   "Pet Grooming & Hygiene",
//   "Pet Health & Wellness",
//   "Pet Housing & Enclosures",
//   "Pet Training & Behavior",
//   "Pet Adoption & Services",
// ];

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedPrice, setSelectedPrice] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   useEffect(() => {
//     getAllProducts();
//   }, []);

//   useEffect(() => {
//     applyFilters();
//   }, [selectedPrice, selectedCategory, products]);

//   const getAllProducts = async () => {
//     try {
//       const response = await axios.get(`${backend_url}/api/v1/products`);
//       setProducts(response.data.data);
//       setFilteredProducts(response.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const applyFilters = () => {
//     let filtered = [...products];

//     if (selectedPrice) {
//       filtered = filtered.filter(
//         (product) =>
//           product.price >= selectedPrice.min &&
//           product.price <= selectedPrice.max,
//       );
//     }

//     if (selectedCategory) {
//       filtered = filtered.filter(
//         (product) => product.category === selectedCategory,
//       );
//     }

//     setFilteredProducts(filtered);
//   };

//   return (
//     <Wrapper current={"shop"}>
//       <div className="w-full flex flex-col p-2 bg-night">
//         <img
//           src="https://supertails.com/cdn/shop/files/Big_sale_562b1227-ffb9-48e4-96fb-c5c866b149b9_1600x.png?v=1737615716"
//           className="w-full h-64"
//         />

//         <div className="flex flex-col md:flex-row w-full bg-yellow-200">
//           <div className="w-full md:w-1/5 bg-gray-800 p-4">
//             <h2 className="text-amber-300 mb-2">Filter by Category</h2>
//             <ul>
//               {categories.map((category, index) => (
//                 <li key={index}>
//                   <label className="cursor-pointer flex justify-between items-center hover:bg-slate-400 p-1">
//                     <span>{category}</span>
//                     <input
//                       type="radio"
//                       name="category"
//                       onChange={() => setSelectedCategory(category)}
//                       checked={selectedCategory === category}
//                     />
//                   </label>
//                 </li>
//               ))}
//             </ul>

//             <h2 className="text-amber-300 mt-4 mb-2">Filter by Price Range</h2>
//             <ul>
//               {priceRanges.map((range, index) => (
//                 <li key={index}>
//                   <label className="cursor-pointer flex justify-between items-center hover:bg-slate-400 p-1">
//                     <span>{range.label}</span>
//                     <input
//                       type="radio"
//                       name="price"
//                       onChange={() => setSelectedPrice(range)}
//                       checked={selectedPrice === range}
//                     />
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="w-full md:h-4/5 flex flex-col bg-night">
//             <h1 className="text-amber-300 text-center m-3">Happy Cuddle</h1>
//             <div className="w-full flex flex-row flex-wrap gap-5 bg-night p-3 justify-evenly">
//               {filteredProducts.length > 0 ? (
//                 filteredProducts.map((product, id) => (
//                   <ProductWithOption
//                     key={id}
//                     pID={product?._id}
//                     urls={product?.product_Images[0]}
//                     product_name={product?.name}
//                     price={product?.price}
//                   />
//                 ))
//               ) : (
//                 <h1>No Product Available</h1>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default Shop;


import React, { useEffect, useState } from "react";
import Wrapper from "../Layout/wrapper";
import axios from "axios";
import { backend_url } from "../../utils/Config";
import ProductWithOption from "../../shared/ProductWithOption";

const priceRanges = [
  { label: "Under $300", min: 0, max: 300 },
  { label: "Under $500", min: 0, max: 500 },
  { label: "Under $700", min: 0, max: 700 },
  { label: "Under $1000", min: 0, max: 1000 },
  { label: "Under $2000", min: 0, max: 2000 },
];

const categories = [
  "Pet Food & Treats",
  "Pet Accessories",
  "Toys",
  "Pet Grooming & Hygiene",
  "Pet Health & Wellness",
  "Pet Housing & Enclosures",
  "Pet Training & Behavior",
  "Pet Adoption & Services",
];

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedPrice, setSelectedPrice] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     applyFilters();
//   }, [selectedPrice, selectedCategory, products]);

//   const fetchProducts = async () => {
//     try {
//       const { data } = await axios.get(`${backend_url}/api/v1/products`);
//       setProducts(data.data);
//       setFilteredProducts(data.data);
//     } catch (error) {
//       console.error("Failed to fetch products", error);
//     }
//   };

//   const applyFilters = () => {
//     let result = [...products];

//     if (selectedPrice) {
//       result = result.filter(
//         (p) => p.price >= selectedPrice.min && p.price <= selectedPrice.max
//       );
//     }

//     if (selectedCategory) {
//       result = result.filter((p) => p.category === selectedCategory);
//     }

//     setFilteredProducts(result);
//   };

//   // return (
//   //   <Wrapper current={"shop"}>
//   //     <div className="w-full min-h-screen bg-primary px-4 md:px-8 py-6">
//   //       <div className="flex flex-col md:flex-row gap-6">
//   //         {/* Sidebar */}
//   //         <aside className="w-full md:w-1/4 bg-[#FBC4AB] rounded-2xl p-4 shadow-md space-y-8">
//   //           <div>
//   //             <h3 className="text-lg font-semibold text-gray-800 mb-3">Category</h3>
//   //             <ul className="space-y-2">
//   //               {categories.map((category) => (
//   //                 <li key={category}>
//   //                   <label className="flex justify-between items-center cursor-pointer text-sm text-[#5C3B28] hover:text-accent">
//   //                     <span>{category}</span>
//   //                     <input
//   //                       type="radio"
//   //                       name="category"
//   //                       checked={selectedCategory === category}
//   //                       onChange={() => setSelectedCategory(category)}
//   //                       className="accent-accent"
//   //                     />
//   //                   </label>
//   //                 </li>
//   //               ))}
//   //             </ul>
//   //           </div>

//   //           <div>
//   //             <h3 className="text-lg font-semibold text-gray-800 mb-3">Price</h3>
//   //             <ul className="space-y-2">
//   //               {priceRanges.map((range) => (
//   //                 <li key={range.label}>
//   //                   <label className="flex justify-between items-center cursor-pointer text-sm text-gray-700 hover:text-accent">
//   //                     <span>{range.label}</span>
//   //                     <input
//   //                       type="radio"
//   //                       name="price"
//   //                       checked={selectedPrice === range}
//   //                       onChange={() => setSelectedPrice(range)}
//   //                       className="accent-accent"
//   //                     />
//   //                   </label>
//   //                 </li>
//   //               ))}
//   //             </ul>
//   //           </div>

//   //           <button
//   //             onClick={() => {
//   //               setSelectedCategory(null);
//   //               setSelectedPrice(null);
//   //             }}
//   //             className="w-full bg-accent text-white font-medium py-2 rounded-lg hover:brightness-105 transition-all duration-200"
//   //           >
//   //             Reset Filters
//   //           </button>
//   //         </aside>

//   //         {/* Product Grid */}
//   //         <main className="w-full md:w-3/4">
//   //           <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
//   //             Happy Cuddle Products
//   //           </h1>

//   //           {filteredProducts.length ? (
//   //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//   //               {filteredProducts.map((product) => (
//   //                 <ProductWithOption
//   //                   key={product._id}
//   //                   pID={product._id}
//   //                   urls={product.product_Images[0]}
//   //                   product_name={product.name}
//   //                   price={product.price}
//   //                 />
//   //               ))}
//   //             </div>
//   //           ) : (
//   //             <div className="text-center text-gray-600">No Product Available</div>
//   //           )}
//   //         </main>
//   //       </div>
//   //     </div>
//   //   </Wrapper>
//   // );

//   return (
//     <Wrapper current={"shop"}>
//       <div className="w-full min-h-screen bg-primary px-4 md:px-8 py-6">
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Sidebar */}
//           <aside className="w-full md:w-1/4 bg-[#F7BFB4] rounded-2xl p-4 shadow-md space-y-8">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-3">Category</h3>
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
  
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-3">Price</h3>
//               <ul className="space-y-2">
//                 {priceRanges.map((range) => (
//                   <li key={range.label}>
//                     <label className="flex justify-between items-center cursor-pointer text-sm text-gray-700 hover:text-accent">
//                       <span>{range.label}</span>
//                       <input
//                         type="radio"
//                         name="price"
//                         checked={selectedPrice === range}
//                         onChange={() => setSelectedPrice(range)}
//                         className="accent-accent"
//                       />
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             </div>
  
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
  
//           {/* Product Grid */}
//           <main className="w-full md:w-3/4">
//             <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
//               Happy Cuddle Products
//             </h1>
  
//             {filteredProducts.length ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredProducts.map((product) => (
//                   <ProductWithOption
//                     key={product._id}
//                     pID={product._id}
//                     urls={product.product_Images[0]}
//                     product_name={product.name}
//                     price={product.price}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center text-gray-600">No Product Available</div>
//             )}
//           </main>
//         </div>
//       </div>
//     </Wrapper>
//   );
  

// };

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedPrice, selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/api/v1/products`);
      setProducts(data.data);
      setFilteredProducts(data.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const applyFilters = () => {
    let result = [...products];

    if (selectedPrice) {
      result = result.filter(
        (p) => p.price >= selectedPrice.min && p.price <= selectedPrice.max
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    setFilteredProducts(result);
  };

  // Check if filters are applied for compact style
  const isSidebarCompact = selectedCategory || selectedPrice;

  // Get the background color classes dynamically based on selection
  const categoryBgClass = selectedCategory ? 'bg-[#FBC4AB]' : 'bg-[#F7BFB4]';
  const priceBgClass = selectedPrice ? 'bg-[#FBC4AB]' : 'bg-[#F7BFB4]';

  return (
    <Wrapper current={"shop"}>
      <div className="w-full min-h-screen bg-primary px-4 md:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside
            className={`w-full md:w-1/4 rounded-2xl p-4 shadow-md space-y-8 transition-all duration-300 ${
              isSidebarCompact ? 'h-auto' : 'h-50'
            }`}
          >
            {/* Category Section */}
            <div className={`${categoryBgClass} p-4 rounded-lg`}>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Category</h3>
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
            <div className={`${priceBgClass} p-4 rounded-lg`}>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Price</h3>
              <ul className="space-y-2">
                {priceRanges.map((range) => (
                  <li key={range.label}>
                    <label className="flex justify-between items-center cursor-pointer text-sm text-gray-700 hover:text-accent">
                      <span>{range.label}</span>
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPrice === range}
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
              className="w-full bg-accent text-white font-medium py-2 rounded-lg hover:brightness-105 transition-all duration-200"
            >
              Reset Filters
            </button>
          </aside>

          {/* Product Grid */}
          <main className="w-full md:w-3/4">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
              Happy Cuddle Products
            </h1>

            {filteredProducts.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductWithOption
                    key={product._id}
                    pID={product._id}
                    urls={product.product_Images[0]}
                    product_name={product.name}
                    price={product.price}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600">No Product Available</div>
            )}
          </main>
        </div>
      </div>
    </Wrapper>
  );
};

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedPrice, setSelectedPrice] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     applyFilters();
//   }, [selectedPrice, selectedCategory, products]);

//   const fetchProducts = async () => {
//     try {
//       const { data } = await axios.get(`${backend_url}/api/v1/products`);
//       setProducts(data.data);
//       setFilteredProducts(data.data);
//     } catch (error) {
//       console.error("Failed to fetch products", error);
//     }
//   };

//   const applyFilters = () => {
//     let result = [...products];

//     if (selectedPrice) {
//       result = result.filter(
//         (p) => p.price >= selectedPrice.min && p.price <= selectedPrice.max
//       );
//     }

//     if (selectedCategory) {
//       result = result.filter((p) => p.category === selectedCategory);
//     }

//     setFilteredProducts(result);
//   };

//   // Determine if either price or category is selected for compact styling
//   const isSidebarCompact = selectedCategory || selectedPrice;

//   // Get background classes based on selection
//   const categoryBgClass = selectedCategory ? 'bg-[#FBC4AB]' : 'bg-[#F7BFB4]';
//   const priceBgClass = selectedPrice ? 'bg-[#FBC4AB]' : 'bg-[#F7BFB4]';

//   return (
//     <Wrapper current={"shop"}>
//       <div className="w-full min-h-screen bg-primary px-4 md:px-8 py-6">
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Sidebar */}
//           <aside className="w-full md:w-1/4 rounded-2xl p-4 shadow-md space-y-8 bg-[#FFF1EE]">
//   {/* Category Section */}
//   <div className={`${selectedCategory ? 'bg-[#FBC4AB]' : 'bg-[#F7BFB4]'} p-4 rounded-lg`}>
//     <h3 className="text-lg font-semibold text-gray-800 mb-3">Category</h3>
//     <ul className="space-y-2">
//       {categories.map((category) => (
//         <li key={category}>
//           <label className="flex justify-between items-center cursor-pointer text-sm text-[#5C3B28] hover:text-accent">
//             <span>{category}</span>
//             <input
//               type="radio"
//               name="category"
//               checked={selectedCategory === category}
//               onChange={() => setSelectedCategory(category)}
//               className="accent-accent"
//             />
//           </label>
//         </li>
//       ))}
//     </ul>
//   </div>

//   {/* Price Section */}
//   <div className={`${selectedPrice ? 'bg-[#FBC4AB]' : 'bg-[#F7BFB4]'} p-4 rounded-lg`}>
//     <h3 className="text-lg font-semibold text-gray-800 mb-3">Price</h3>
//     <ul className="space-y-2">
//       {priceRanges.map((range) => (
//         <li key={range.label}>
//           <label className="flex justify-between items-center cursor-pointer text-sm text-gray-700 hover:text-accent">
//             <span>{range.label}</span>
//             <input
//               type="radio"
//               name="price"
//               checked={selectedPrice === range}
//               onChange={() => setSelectedPrice(range)}
//               className="accent-accent"
//             />
//           </label>
//         </li>
//       ))}
//     </ul>
//   </div>

//   {/* Reset Button */}
//   <button
//     onClick={() => {
//       setSelectedCategory(null);
//       setSelectedPrice(null);
//     }}
//     className="w-full bg-accent text-white font-medium py-2 rounded-lg hover:brightness-105 transition-all duration-200"
//   >
//     Reset Filters
//   </button>
// </aside>


//           {/* Product Grid */}
//           <main className="w-full md:w-3/4">
//             <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
//               Happy Cuddle Products
//             </h1>

//             {filteredProducts.length ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredProducts.map((product) => (
//                   <ProductWithOption
//                     key={product._id}
//                     pID={product._id}
//                     urls={product.product_Images[0]}
//                     product_name={product.name}
//                     price={product.price}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center text-gray-600">No Product Available</div>
//             )}
//           </main>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

export default Shop;

