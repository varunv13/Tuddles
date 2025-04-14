import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../shared/Loading';
import Wrapper from '../../Wrapper/wrapper';
import { toast } from 'react-toastify';
import TextInput from '../../../shared/TextInput';
import axios from 'axios';
import { backend_url } from '../../../utils/Config';

const CreateProduct = () => {
  const [auth] = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('light');

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [photo, setPhoto] = useState('');
  const [images, setImage] = useState('');
  const [isUploading, setIsUploading] = useState(false); // Track image upload status
  const navigate = useNavigate();

  const handleImageUpload = async (file) => {
    setIsUploading(true); // Start upload process
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'PawsPoint_image');
    formData.append('cloud_name', 'dfjcqaurp');
    formData.append('folder', 'product_images');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dfjcqaurp/image/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image to Cloudinary');
      }

      const data = await response.json();
      setImage(data.secure_url); // Set the uploaded image URL
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload image!');
      setImage(''); // Clear image state on failure
    } finally {
      setIsUploading(false); // End upload process
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if all fields are filled
    if (!name || !brand || !price || !description || !category || !images) {
      return toast.error('Please fill out all fields');
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
      const response = await axios.post(`${backend_url}/api/v1/products/new`, data);

      if (response.data.statusCode === 201) {
        toast.success('Product created successfully');
        navigate('/dashboard'); // Redirect after successful product creation
      } else {
        toast.error('Failed to create Product');
      }
    } catch (error) {
      console.error('Product creation failed', error);
      toast.error('Product creation failed. Please try again.');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (auth?.user && auth?.user?.user_Role === 'seller') {
        setIsLoading(false);
        toast.success('Authentication Successful');
      } else {
        navigate('/dashboard');
        toast.error('Authentication failed');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [auth, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <div className="h-full w-full bg-night flex flex-col justify-center items-center">
        <div className="h-fit w-4/5 bg-slate-800 flex flex-col justify-center items-center">
          <h1 className="text-emerald-400 text-2xl font-extrabold">CREATE PRODUCT</h1>
          <form className="w-full flex flex-col justify-center items-center space-y-4" onSubmit={handleSubmit}>
            <TextInput
              title="Product Name"
              placeHolder="Enter your product name..."
              type="text"
              theme={theme}
              value={name}
              setValue={setName}
              
            />
            <TextInput
              title="Product Description"
              placeHolder="Enter your product description..."
              type="text"
              theme={theme}
              value={description}
              setValue={setDescription}
            />
            <TextInput
              title="Product Brand"
              placeHolder="Enter your product brand..."
              type="text"
              theme={theme}
              value={brand}
              setValue={setBrand}
            />
            <TextInput
              title="Product Price"
              placeHolder="Enter your product price..."
              type="number"
              theme={theme}
              value={price}
              setValue={setPrice}
            />
            <label htmlFor="categories" className="block mb-2 text-sm font-medium text-white">
              Select a category
            </label>
            <select
              id="categories"
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-3/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose a category</option>
              <option value="Food">Food</option>
              <option value="Accessories">Accessories</option>
              <option value="Cages">Cages</option>
              <option value="Toys">Toys</option>
              <option value="Travel">Travel</option>
              <option value="Aquariums">Aquariums</option>
            </select>
            <div className="space-y-2 bg-yellow-200 p-1 rounded-lg">
              <div className="text-xs text-gray-600 ">Choose Image</div>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setPhoto(file);
                  handleImageUpload(file);
                }}
                required
                className='bg-yellow-200'
              />
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    className="h-24 w-24"
                  />
                </div>
              )}
            </div>
            <button
  className={`w-full h-12 text-white rounded-3xl transition duration-300 ${
    isUploading || !images
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-green-500 hover:bg-green-600'
  }`}
  type="submit"
  disabled={isUploading || !images} // Button disabled if uploading or image not uploaded
>
  {isUploading ? 'Uploading...' : 'Create Product'}
</button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateProduct;
