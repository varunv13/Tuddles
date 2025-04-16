import React from "react";
import { FaHeart } from "react-icons/fa";

const Card = ({
  title,
  url,
  shortDescription,
  description,
  price,
  discountedPrice,
  onAddToCart,
  onWishlistClick,
}) => {
  return (
    <div className="w-[240px] bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-indigo-500">
      {/* Product Image */}
      <div>
        <img src={url} alt={title} className="w-full h-36 object-cover" />
      </div>

      {/* Product Info */}
      <div className="mt-6 px-3 flex flex-col h-auto">
        {" "}
        {/* Change h-full to h-auto */}
        {/* Title */}
        <h2 className="text-base font-bold text-white mb-1">{title}</h2>
        {/* Short Description */}
        <p className="mt-1 text-xs text-pink-300 font-medium">
          {shortDescription}
        </p>
        {/* Description */}
        <p className="mt-1 text-xs text-gray-300 line-clamp-2 italic">
          {description}
        </p>
        {/* Price Section */}
        <div className="mt-2 flex items-center space-x-2 mb-3">
          <span className="text-sm font-bold text-yellow-300">
            ${discountedPrice?.toFixed(2)}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ${price?.toFixed(2)}
          </span>
        </div>
        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-auto mb-3">
          <button
            onClick={onAddToCart}
            className="w-full bg-blue-600 text-white py-1.5 px-3 rounded hover:bg-blue-700 transition text-sm">
            Add to Cart
          </button>
          <button
            onClick={onWishlistClick}
            className="w-full flex items-center justify-center gap-1 bg-pink-200 text-red-600 py-1.5 px-3 rounded hover:bg-pink-300 transition text-sm">
            <FaHeart className="text-sm" />
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
