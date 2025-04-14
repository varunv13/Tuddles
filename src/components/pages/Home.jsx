import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../shared/Navbar'
import Wrapper from '../Wrapper/wrapper'
import HeaderCarousel from '../../shared/HeaderCarousel'
import CategoriesCard from '../../shared/CategoriesCard'
import Card from '../../shared/Card'
import { useAuth } from '../../context/AuthContext'

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
      onWishlistClick: () => console.log("Zinc Classic Hoodie added to wishlist"),
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
      onWishlistClick: () => console.log("Zinc Streetwear Cap added to wishlist"),
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
      onWishlistClick: () => console.log("Zinc Minimalist Sneakers added to wishlist"),
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
      onWishlistClick: () => console.log("Zinc Performance Jacket added to wishlist"),
    },
    {
      title: "Zinc Tech Backpack",
      url: "https://prokleanhome.com/cdn/shop/collections/Pet_safe_1200x737.jpg?v=1646907990",
      shortDescription: "Sleek backpack with tech compartments and zinc-tone design.",
      description:
        "Organize your gear in style with this zinc-tone backpack. Features padded laptop sleeve, USB port, and waterproof compartments for daily commutes or travel.",
      price: 79.99,
      discountedPrice: 59.99,
      onAddToCart: () => console.log("Added Zinc Tech Backpack to cart"),
      onWishlistClick: () => console.log("Zinc Tech Backpack added to wishlist"),
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
      onWishlistClick: () => console.log("Zinc Trail Runners added to wishlist"),
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
      onWishlistClick: () => console.log("Zinc Wireless Earbuds added to wishlist"),
    },    
  ];
  

  const navigate=useNavigate()
  const [auth,setAuth]=useAuth()
  return (
    <>
    <Wrapper current={'home'}>
    <div className='text-2xl cursor-custom w-full h-auto bg-night'>
    
      {/* corousal */}
      <HeaderCarousel/>
      {/* corousal end */}
   

   
     {/* bank offer start  */}
      {/* <div className='w-full px-5 my-2'>
         <img src='https://supertails.com/cdn/shop/files/Homepage_desk-min_34987ee0-64bf-417a-b4f8-9af815c22588.png?v=1732992049'></img>
      </div> */}
     {/* bank offer end  */}

     
     {/* Popular products  */}
     {/* <div className='flex flex-col w-full h-fit my-2 p-6'>
       <div className='flex justify-center items-center'>
        <h1 className='font-extrabold font-title_font tracking-wider text-2xl text-amber-300 drop-shadow-[0px_0px_30px_rgba(192,33,110,1)] p-3'>Popular Products</h1>
       </div>
       <div className='flex flex-wrap justify-center md:justify-normal items-center gap-4 my-3'>
        <ProductCard ur={'https://supertails.com/cdn/shop/files/Frame_1405178184-min.png?v=1732537085'}/>
        <ProductCard  ur={'https://supertails.com/cdn/shop/files/Frame_1405180467-min.png?v=1733377612'}/>
        <ProductCard  ur={'https://supertails.com/cdn/shop/files/Frame_1405180047.png?v=1733205957'}/>
        <ProductCard  ur={'https://supertails.com/cdn/shop/files/Frame_1405178183-min.png?v=1732537526'}/>
        <ProductCard  ur={'https://supertails.com/cdn/shop/files/Frame_1405180472-min_800x.png?v=1733379910'}/>
        <ProductCard  ur={'https://supertails.com/cdn/shop/files/SKATRSTOYS_19.png?v=1714715536'}/>
       </div>
      </div> */}
     {/* Popular products end  */}
  

              {/* New Code Begins */}

  {/* Product Code Begins Here */}
  
  <div className=' bg-zinc-900 pt-10' >
  <h1 className='text-center text-white font-bold' >Most Popular Prodcuts</h1>
  <div className="flex flex-wrap gap-6 justify-center p-6 bg-zinc-900 min-h-screen pt-10">
      {products.map((product, index) => (
        <Card key={index} {...product} />
      ))}
    </div>
  </div>
      

  {/* Attractive Horizontal Line */}
  <div className="my-8 relative">
    <hr className="border-t-2 border-amber-300 w-3/4 mx-auto" />
  </div>

{/* popular categories */}
<div className="flex flex-col w-full h-fit mt-12 my-2">
  <div className="flex justify-center items-center">
    <h1 className="font-extrabold font-title_font tracking-wider text-2xl text-amber-300 drop-shadow-[0px_0px_30px_rgba(192,33,110,1)] py-3">
      Shop by Pet
    </h1>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 px-2 my-4 py-6  place-items-center justify-end">
    <CategoriesCard
      categoryName={"Dogs"}
      ur={
        "https://plus.unsplash.com/premium_photo-1694819488591-a43907d1c5cc?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGRvZ3xlbnwwfHwwfHx8MA%3D%3D"
      }
    />
    <CategoriesCard
      categoryName={"Cats"}
      ur={
        "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhdHN8ZW58MHx8MHx8fDA%3D"
      }
    />
    <CategoriesCard
      categoryName={"Rabbits"}
      ur={
        "https://media.istockphoto.com/id/173893247/photo/rabbit.webp?a=1&b=1&s=612x612&w=0&k=20&c=lLEYLC7Tlkb2PyIDda5Zi2kmpaRN8PmCSfuYDCJe2lY="
      }
    />
    <CategoriesCard
      categoryName={"Fishes"}
      ur={
        "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmlzaHxlbnwwfHwwfHx8MA%3D%3D"
      }
    />
    <CategoriesCard
      categoryName={"Birds"}
      ur={
        "https://plus.unsplash.com/premium_photo-1664543649513-c21242431e6e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAxfHxCaXJkc3xlbnwwfHwwfHx8MA%3D%3D"
      }
    />
    <CategoriesCard
      categoryName={"Reptiles"}
      ur={
        "https://media.istockphoto.com/id/1081594106/photo/green-iguana.webp?a=1&b=1&s=612x612&w=0&k=20&c=kqkbdhmpmkq3-UjzXZVp2ED2SaMsx9CNMD-DSwBl9EU="
      }
    />
  </div>
</div>
{/* popular categories end */}

    </div>
   
    </Wrapper>
    </>
  )
}

export default Home