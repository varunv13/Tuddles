import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../shared/Navbar";
import Wrapper from "../Layout/wrapper";
import HeaderCarousel from "../../shared/HeaderCarousel";
import CategoriesCard from "../../shared/CategoriesCard";
import Card from "../../shared/Card";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  // Dummy Data
  const products = [
    {
      title: "Zinc Classic Hoodie",
      url: "https://th.bing.com/th/id/OIP.HpVgzytpeRYfw-g70tVqOwAAAA?w=400&h=400&rs=1&pid=ImgDetMain",
      shortDescription: "Warm, soft, and stylish hoodie in a zinc tone.",
      description:
        "Crafted with premium cotton, this hoodie is perfect for both style and comfort. Featuring a minimalistic zinc color, it's ideal for everyday wear.",
      price: 59.99,
      discountedPrice: 44.99,
      onAddToCart: () => console.log("Added Zinc Classic Hoodie to cart"),
      onWishlistClick: () =>
        console.log("Zinc Classic Hoodie added to wishlist"),
    },
    {
      title: "Zinc Streetwear Cap",
      url: "https://marketingweek.imgix.net/content/uploads/2014/10/PedigreeProducts1.jpg",
      shortDescription: "Trendy zinc-colored cap with adjustable strap.",
      description:
        "Stay cool and shaded with this sleek zinc streetwear cap. Designed with breathable materials and a modern fit.",
      price: 29.99,
      discountedPrice: 24.99,
      onAddToCart: () => console.log("Added Zinc Streetwear Cap to cart"),
      onWishlistClick: () =>
        console.log("Zinc Streetwear Cap added to wishlist"),
    },
    {
      title: "Zinc Minimalist Sneakers",
      url: "https://th.bing.com/th/id/OIP.Iwv3GC8fLHY-YWeKc4C0GgHaE1?w=612&h=400&rs=1&pid=ImgDetMain",
      shortDescription: "Everyday sneakers with a clean zinc finish.",
      description:
        "Versatile, lightweight, and ultra-comfortable — these zinc minimalist sneakers are your go-to choice for daily style.",
      price: 89.99,
      discountedPrice: 69.99,
      onAddToCart: () => console.log("Added Zinc Minimalist Sneakers to cart"),
      onWishlistClick: () =>
        console.log("Zinc Minimalist Sneakers added to wishlist"),
    },
    {
      title: "Zinc Performance Jacket",
      url: "https://th.bing.com/th/id/OIP.8-RiaFVumSXO_J_ger-SkAAAAA?w=400&h=400&rs=1&pid=ImgDetMain",
      shortDescription: "All-weather jacket with a sleek zinc finish.",
      description:
        "Designed for urban adventures, this water-resistant jacket keeps you warm and dry without sacrificing style. Tailored for movement and layered comfort.",
      price: 109.99,
      discountedPrice: 89.99,
      onAddToCart: () => console.log("Added Zinc Performance Jacket to cart"),
      onWishlistClick: () =>
        console.log("Zinc Performance Jacket added to wishlist"),
    },
    {
      title: "Zinc Tech Backpack",
      url: "https://prokleanhome.com/cdn/shop/collections/Pet_safe_1200x737.jpg?v=1646907990",
      shortDescription:
        "Sleek backpack with tech compartments and zinc-tone design.",
      description:
        "Organize your gear in style with this zinc-tone backpack. Features padded laptop sleeve, USB port, and waterproof compartments for daily commutes or travel.",
      price: 79.99,
      discountedPrice: 59.99,
      onAddToCart: () => console.log("Added Zinc Tech Backpack to cart"),
      onWishlistClick: () =>
        console.log("Zinc Tech Backpack added to wishlist"),
    },
    {
      title: "Zinc Trail Runners",
      url: "https://i.ytimg.com/vi/j-P08ix87xM/maxresdefault.jpg",
      shortDescription: "Lightweight trail shoes with zinc-tone mesh.",
      description:
        "Engineered for off-road agility and all-day comfort, these zinc-colored trail runners are perfect for hikes, urban jogs, or casual wear.",
      price: 99.99,
      discountedPrice: 79.99,
      onAddToCart: () => console.log("Added Zinc Trail Runners to cart"),
      onWishlistClick: () =>
        console.log("Zinc Trail Runners added to wishlist"),
    },
    {
      title: "Zinc Urban Watch",
      url: "https://th.bing.com/th/id/OIP.U5uhrc9_KN-f9NCRjcHwnQHaEK?w=1024&h=576&rs=1&pid=ImgDetMain",
      shortDescription: "Minimal analog wristwatch with a brushed zinc dial.",
      description:
        "This water-resistant, stainless steel watch features a sleek zinc-tone face and leather strap. A perfect blend of modern and classic.",
      price: 129.99,
      discountedPrice: 99.99,
      onAddToCart: () => console.log("Added Zinc Urban Watch to cart"),
      onWishlistClick: () => console.log("Zinc Urban Watch added to wishlist"),
    },
    {
      title: "Zinc Wireless Earbuds",
      url: "https://th.bing.com/th/id/OIP.V6or30NQsa8Vjwew1L3dIwAAAA?w=474&h=246&rs=1&pid=ImgDetMain",
      shortDescription: "Compact earbuds with deep bass and zinc shell.",
      description:
        "Experience crisp sound and low-latency Bluetooth in these sleek zinc-finished earbuds. Comes with a magnetic charging case.",
      price: 69.99,
      discountedPrice: 49.99,
      onAddToCart: () => console.log("Added Zinc Wireless Earbuds to cart"),
      onWishlistClick: () =>
        console.log("Zinc Wireless Earbuds added to wishlist"),
    },
  ];

  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  return (

    <>
      <Wrapper current={"home"}>
        <div className="w-full bg-gradient-to-b from-yellow-100 to-slate-500 overflow-x-hidden">
          {/* Hero Section */}
          <div className="relative overflow-hidden h-96 bg-gradient-to-r from-purple-600 to-blue-500 animate-gradient">
  {/* Swimming fish elements */}
  <div className="absolute top-1/4 -left-20 animate-swim-1">🐠</div>
  <div className="absolute top-1/3 -left-32 animate-swim-2">🐡</div>
  <div className="absolute top-1/2 -left-24 animate-swim-3">🐟</div>
  <div className="absolute top-3/4 -left-28 animate-swim-4">🦈</div>

  {/* Existing content */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center text-white space-y-6 px-4 relative z-10">
      <h1 className="text-5xl font-bold tracking-tight drop-shadow-lg animate-fade-in-up">
        Premium Pet Essentials
      </h1>
      <p className="text-xl font-light max-w-2xl mx-auto animate-fade-in-up delay-100">
        Discover curated products for your beloved companions
      </p>
    </div>
  </div>
</div>

          {/* Featured Products */}
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="mb-14 text-center">
              <span className="bg-purple-100 text-purple-600 px-6 py-2 rounded-full text-sm font-semibold">
                Best Sellers
              </span>
              <h2 className="mt-4 text-3xl font-bold text-gray-900">
                Most Loved by Pet Parents
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.slice(0, 4).map((product, index) => (

                <Card
                  {...product}
                  className="p-4"
                  imageClassName="rounded-t-xl"
                  priceStyle="text-purple-600"
                />

              ))}
            </div>
          </div>

          {/* Category Showcase */}
          <div className="bg-gray-50/65 py-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="mb-14 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Shop by Category
                </h2>
                <p className="text-gray-600 max-w-xl mx-auto">
                  Find everything you need for different types of pets
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { name: "Dogs", icon: "🐶" },
                  { name: "Cats", icon: "🐱" },
                  { name: "Birds", icon: "🦜" },
                  { name: "Fish", icon: "🐠" },
                  { name: "Reptiles", icon: "🦎" },
                  { name: "Small Pets", icon: "🐹" },
                ].map((category, index) => (
                  <button
                    key={index}
                    className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="text-4xl mb-3 group-hover:text-purple-600 transition-colors">
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                      {category.name}
                    </h3>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* All Products Grid */}
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Explore Our Collection
              </h2>
              <div className="border-b-2 border-gray-200 pb-14">
                <div className="max-w-2xl mx-auto text-gray-600">
                  Premium quality products for your pet's health and happiness
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="relative group  rounded-lg overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Card
                    {...product}
                    className="p-4"
                    imageClassName="w-full h-64 object-cover"
                    priceStyle="text-lg font-bold text-purple-600"
                    titleStyle="text-gray-900 font-semibold"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-purple-600 text-white py-16">
            <div className="max-w-4xl mx-auto text-center px-4">
              <h3 className="text-3xl font-bold mb-6">
                Join Our Pet Lovers Community
              </h3>
              <p className="text-lg mb-8">
                Get exclusive offers, pet care tips, and early access to new products
              </p>
              <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors">
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
    </>

  );
};

export default Home;

