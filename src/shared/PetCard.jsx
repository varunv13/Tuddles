import React from "react";
import { Link } from "react-router-dom";

const PetCard = ({ key, petID, image, name, price, description }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg mb-4" />
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-gray-900">${price}</span>

        {/* View Details Button */}
        <Link to={`/pet/${petID}`} className="bg-accent text-white py-1 px-4 rounded-lg hover:bg-accent-dark transition-all duration-200">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
