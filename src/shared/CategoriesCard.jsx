import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesCard = ({ categoryName, ur, to = "#" }) => {
  return (
    <Link to={to}>
      <div className="bg-zinc-900 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out p-4 md:p-5 w-36 h-44 md:w-52 md:h-60 flex flex-col items-center justify-between group hover:scale-105">
        
        <div className="w-full h-3/4 flex items-center justify-center overflow-hidden rounded-md">
          <img
            src={ur}
            alt={categoryName}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 rounded-md"
          />
        </div>

        <hr className="w-full border-zinc-700 my-2" />

        <h2 className="text-white text-sm md:text-base font-medium text-center">
          {categoryName}
        </h2>
      </div>
    </Link>
  );
};

export default CategoriesCard;
