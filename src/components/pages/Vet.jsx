import React, { useState } from "react";
import Navbar from "../../shared/Navbar";
import Footer from "../../shared/Footer";

const Vet = () => {
  const [formData, setFormData] = useState({
    petType: "",
    serviceType: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);
    alert("Vet appointment booked successfully!");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-900 text-white p-6">
        {/* Hero Section */}
        <div className="w-full max-w-5xl ml-56 flex flex-col md:flex-row items-center gap-8 mb-10">
          <img
            src="https://th.bing.com/th/id/OIP.age3p0BbSo5detwwtPMFEAHaLH?rs=1&pid=ImgDetMain"
            alt="Vet with pet"
            className="rounded-lg max-w-full h-80 object-cover shadow-lg"
          />
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-4 text-amber-300 drop-shadow">
              Book Vet Services
            </h1>
            <p className="text-zinc-300">
              Schedule an appointment with a trusted veterinarian for your pet.
              Choose the service, time, and let us take care of the rest.
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-800 rounded-lg shadow-xl max-w-3xl mx-auto p-6 md:p-8 space-y-6">
          {/* Pet Type */}
          <div>
            <label className="block text-sm mb-2 text-zinc-300">Pet Type</label>
            <select
              name="petType"
              value={formData.petType}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-700 text-white outline-none"
              required>
              <option value="">Select Pet</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Bird">Bird</option>
              <option value="Reptile">Reptile</option>
            </select>
          </div>

          {/* Service Type */}
          <div>
            <label className="block text-sm mb-2 text-zinc-300">
              Service Type
            </label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-700 text-white outline-none"
              required>
              <option value="">Select Service</option>
              <option value="Vaccination">Vaccination</option>
              <option value="Health Checkup">Health Checkup</option>
              <option value="Surgery">Surgery</option>
              <option value="Emergency Care">Emergency Care</option>
              <option value="Dental Care">Dental Care</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm mb-2 text-zinc-300">
              Preferred Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-700 text-white outline-none"
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm mb-2 text-zinc-300">
              Preferred Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-700 text-white outline-none"
              required
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm mb-2 text-zinc-300">
              Additional Notes
            </label>
            <textarea
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-700 text-white outline-none"
              placeholder="Any special instructions or concerns?"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-6 rounded font-semibold transition-colors duration-300">
            Book Appointment
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Vet;
