import React, { useState } from 'react';
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';

const PetAdoptionForm = () => {
  const [formData, setFormData] = useState({
    petName: 'Max', // You can dynamically update this based on selected pet
    adopterName: '',
    adopterEmail: '',
    adopterPhone: '',
    adopterAddress: '',
    adopterMessage: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Adoption request submitted:", formData);
    alert("Adoption request submitted successfully!");
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      {/* Hero Section */}
      <div className="w-full max-w-5xl ml-56 flex flex-col md:flex-row items-center gap-8 mb-10">
        <img
          src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=1000&auto=format&fit=crop&q=60"
          alt="Adoptable Pet"
          className="rounded-lg max-w-full h-80 object-cover shadow-lg"
        />
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4 text-amber-300 drop-shadow">
            Adopt a Pet - Max
          </h1>
          <p className="text-zinc-300">
            Fill out the form below to adopt Max, a 2-year-old Golden Retriever who’s
            looking for his forever home. He is friendly, playful, and loves attention!
          </p>
        </div>
      </div>

      {/* Adoption Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 rounded-lg shadow-xl max-w-3xl mx-auto p-6 md:p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-amber-300">Adopt Max</h2>

        {/* Adopter's Name */}
        <div>
          <label className="block text-sm mb-2 text-zinc-300">Your Name</label>
          <input
            type="text"
            name="adopterName"
            value={formData.adopterName}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-700 text-white outline-none"
            required
          />
        </div>

        {/* Adopter's Email */}
        <div>
          <label className="block text-sm mb-2 text-zinc-300">Your Email</label>
          <input
            type="email"
            name="adopterEmail"
            value={formData.adopterEmail}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-700 text-white outline-none"
            required
          />
        </div>

        {/* Adopter's Phone */}
        <div>
          <label className="block text-sm mb-2 text-zinc-300">Your Phone Number</label>
          <input
            type="tel"
            name="adopterPhone"
            value={formData.adopterPhone}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-700 text-white outline-none"
            required
          />
        </div>

        {/* Adopter's Address */}
        <div>
          <label className="block text-sm mb-2 text-zinc-300">Your Address</label>
          <textarea
            name="adopterAddress"
            rows="3"
            value={formData.adopterAddress}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-700 text-white outline-none"
            placeholder="Enter your address"
            required
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm mb-2 text-zinc-300">Message to the Shelter</label>
          <textarea
            name="adopterMessage"
            rows="4"
            value={formData.adopterMessage}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-700 text-white outline-none"
            placeholder="Why do you want to adopt Max?"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-6 rounded font-semibold transition-colors duration-300"
        >
          Submit Adoption Request
        </button>
      </form>
    </div>
     <Footer />
    </>
  );
};

export default PetAdoptionForm;
