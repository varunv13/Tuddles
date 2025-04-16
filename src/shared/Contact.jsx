import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center px-4 py-16">
        <div className="bg-white shadow-xl rounded-xl max-w-4xl w-full overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Left Side */}
          <div className="bg-gradient-to-br from-zinc-700 to-zinc-800 text-white p-10 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-4">Let’s Talk ✨</h2>
            <p className="text-lg mb-6">
              Got a project or idea? Drop your message and let’s make something
              great together.
            </p>
            <ul className="text-sm space-y-2">
              <li>
                <strong>Email:</strong> you@example.com
              </li>
              <li>
                <strong>Phone:</strong> +123 456 7890
              </li>
              <li>
                <strong>Location:</strong> Earth 🌍
              </li>
            </ul>
          </div>

          {/* Right Side - Form */}
          <div className="p-10">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="What’s on your mind?"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-zinc-900 hover:bg-zinc-600 text-white font-semibold py-3 rounded-md shadow-lg transition duration-300">
                  Send Message 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
