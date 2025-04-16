import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../../../shared/Loading";
import Wrapper from "../../Layout/wrapper";
import { toast } from "react-toastify";
import TextInput from "../../../shared/TextInput";
import axios from "axios";
import { backend_url } from "../../../utils/Config";

const CreateProduct = () => {
  const [auth] = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState("light");

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [images, setImage] = useState("");
  const [isUploading, setIsUploading] = useState(false); // Track image upload status
  const navigate = useNavigate();

  const handleImageUpload = async (file) => {
    setIsUploading(true); // Start upload process
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "PawsPoint_image");
    formData.append("cloud_name", "dfjcqaurp");
    formData.append("folder", "product_images");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dfjcqaurp/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      const data = await response.json();
      setImage(data.secure_url); // Set the uploaded image URL
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image!");
      setImage(""); // Clear image state on failure
    } finally {
      setIsUploading(false); // End upload process
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if all fields are filled
    if (!name || !brand || !price || !description || !category || !images) {
      return toast.error("Please fill out all fields");
    }

    try {
      // Create the data object to send
      const data = {
        name,
        brand,
        price,
        description,
        category,
        product_Images: images, // Uploaded image URL
      };

      // Send the data to the backend
      const response = await axios.post(
        `${backend_url}/api/v1/products/new`,
        data,
      );

      if (response.data.statusCode === 201) {
        toast.success("Product created successfully");
        navigate("/dashboard"); // Redirect after successful product creation
      } else {
        toast.error("Failed to create Product");
      }
    } catch (error) {
      console.error("Product creation failed", error);
      toast.error("Product creation failed. Please try again.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (auth?.user && auth?.user?.user_Role === "seller") {
        setIsLoading(false);
        toast.success("Authentication Successful");
      } else {
        navigate("/dashboard");
        toast.error("Authentication failed");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [auth, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <div className="min-h-screen flex flex-col bg-primary text-black dark:bg-gray-900 dark:text-white">
        <div className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Create Product</h1>
          <form className="w-full p-6" onSubmit={handleSubmit}>
            {images && (
              <div className="text-center mb-4">
                <img
                  src={images}
                  alt="product"
                  className="mx-auto max-h-48 rounded-lg shadow-md"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="border border-dashed border-white px-4 py-6 block w-full text-center rounded-lg cursor-pointer font-bold text-white bg-gray-700 hover:bg-gray-600">
                {photo ? photo.name : "Upload Image"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setPhoto(file);
                    handleImageUpload(file);
                  }}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-6 mb-4">
              <div className="flex-1 min-w-[45%]">
                <label className="block text-black mb-1">Product Name</label>
                <input
                  type="text"
                  placeholder="Enter your product name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700"
                />
              </div>

              <div className="flex-1 min-w-[45%]">
                <label className="block text-black mb-1">Product Price</label>
                <input
                  type="number"
                  placeholder="Enter your product price..."
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-6 mb-4">
              <div className="flex-1 min-w-[45%]">
                <label className="block text-black mb-1">Brand</label>
                <input
                  type="text"
                  placeholder="Enter your product brand..."
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700"
                />
              </div>

              <div className="flex-1 min-w-[45%]">
                <label className="block text-white mb-1">Category</label>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700">
                  <option value="">Choose a category</option>
                  <option value="Food">Food</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Cages">Cages</option>
                  <option value="Toys">Toys</option>
                  <option value="Travel">Travel</option>
                  <option value="Aquariums">Aquariums</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-black mb-1">Description</label>
              <textarea
                placeholder="Enter your product description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700"
              />
            </div>

            <button
              type="submit"
              disabled={isUploading || !images}
              className={`w-full py-3 text-white font-bold rounded-lg transition duration-300 ${
                isUploading || !images
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}>
              {isUploading ? "Uploading..." : "Create Product"}
            </button>
          </form>
        </div>
      </div>
      </div>
    </Wrapper>
  );
};

export default CreateProduct;
