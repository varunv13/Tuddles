import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import TextInput from "../../shared/TextInput";
import { backend_url } from "../../utils/Config";
import Wrapper from "../Layout/wrapper";

const EditProfile = () => {
  const [auth, setAuth] = useAuth(); // Access and set auth context
  const [theme, setTheme] = useState("light");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Assuming role is not editable

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Profile Image
  const [profileImage, setProfileImage] = useState("");
  const [profileImageFile, setProfileImageFile] = useState(null);

  // Setting initial values when the component mounts
  useEffect(() => {
    if (auth.user) {
      setUserName(auth.user.user_Name || "");
      setEmail(auth.user.email || "");
      setOrders(auth.user.orders || []);
      setProfileImage(auth.user.profile_Image || "");
    }
  }, [auth.user]);

  // Handle image upload to Cloudinary
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "PawsPoint_image"); // Replace with your Cloudinary upload preset
    formData.append("cloud_name", "dfjcqaurp");
    formData.append("folder", "profile_images"); // Optional: Organize images in a folder

    try {
      // Use fetch to upload the image to Cloudinary
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dfjcqaurp/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      // Check if the response is OK (status code 2xx)
      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      // Parse the response as JSON
      const data = await response.json();

      // The URL of the uploaded image is in 'secure_url'
      const imageUrl = data.secure_url;

      // console.log(imageUrl)

      // Set the profile image URL in the state
      setProfileImage(imageUrl);

      // Notify user of success
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image!");
    }
  };

  // Handle profile update request
  const updateProfile = async (e) => {
    e.preventDefault();

    // Validate password match
    if (password !== confirmPassword) {
      toast.error("New password and confirmation do not match!");
      return;
    }

    try {
      const updatedData = {
        user_Name: userName,

        profile_Image: profileImage, // Send the Cloudinary image URL
        orders, // Assuming orders can also be edited, otherwise remove this
        password, // New password
      };

      const response = await axios.put(
        `${backend_url}/api/v1/users/update/${auth.user._id}`,
        updatedData,
      );

      if (response.data.statusCode === 200) {
        toast.success("Profile updated successfully!");

        // Save updated user data in localStorage
        const updatedUser = { ...auth.user, ...updatedData };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Update the auth context with the updated user data
        setAuth((prevState) => ({
          ...prevState,
          user: updatedUser,
        }));
      } else {
        toast.error("Failed to update profile!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile!");
    }
  };

  return (
    //     <Wrapper>
    //       <div
    //         className={`w-full h-full bg-signUpBgMobile ${
    //           theme === "light" ? "md:bg-signUpBg" : "md:bg-sighUpBgDark"
    //         } bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center`}>
    //         <div className="backdrop-blur-md rounded-md h-fit p-6 space-y-4 flex flex-col justify-center items-center">
    //           <div className="text-green-400 p-3 text-xl font-bold flex flex-col ">
    //             Edit Profile
    //           </div>
    //           <form className="w-full max-w-md space-y-4" onSubmit={updateProfile}>
    //             <TextInput
    //               title="Username"
    //               placeHolder="Enter your username..."
    //               type="text"
    //               theme={theme}
    //               value={userName}
    //               setValue={setUserName}
    //             />

    //             {/* Profile Image Section */}
    //             <div className="space-y-2">
    //               <div className="text-xs text-gray-600">Profile Image</div>
    //               {profileImage && (
    //                 <img
    //                   src={profileImage}
    //                   alt="Profile"
    //                   className="w-20 h-20 rounded-full object-cover mb-2"
    //                 />
    //               )}
    //               <input
    //                 type="file"
    //                 accept="image/*"
    //                 onChange={(e) => {
    //                   const file = e.target.files[0];
    //                   setProfileImageFile(file);
    //                   handleImageUpload(file); // Upload image to Cloudinary
    //                 }}
    //               />
    //             </div>

    //             {/* Orders Section */}
    //             {/* <div className="flex flex-col space-y-2">
    //               <div className="text-xs text-gray-600">Orders (non-editable)</div>
    //               <ul className="list-disc pl-5">
    //                 {orders.length > 0 ? (
    //                   orders.map((order, index) => <li key={index}>{order}</li>)
    //                 ) : (
    //                   <li>No orders available</li>
    //                 )}
    //               </ul>
    //             </div> */}

    //             {/* User Role (non-editable, just displaying) */}
    //             <div className="flex flex-col space-y-2">
    //               <div className="text-xs text-gray-600">Role</div>
    //             </div>

    //             {/* Password Change Section */}
    //             <div className="space-y-2">
    //               <TextInput
    //                 title="New Password"
    //                 placeHolder="Enter your new password..."
    //                 type="password"
    //                 theme={theme}
    //                 value={password}
    //                 setValue={setPassword}
    //                 required={false}
    //               />
    //               <TextInput
    //                 title="Confirm New Password"
    //                 placeHolder="Confirm your new password..."
    //                 type="password"
    //                 theme={theme}
    //                 value={confirmPassword}
    //                 setValue={setConfirmPassword}
    //                 required={false}
    //               />
    //             </div>

    //             <button
    //               className="w-full h-12 bg-green-500 text-white rounded-3xl hover:bg-green-600 transition duration-300"
    //               type="submit">
    //               Update Profile
    //             </button>
    //           </form>
    //         </div>
    //       </div>
    // //     </Wrapper>

    <Wrapper>
      <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 bg-gray-500 dark:bg-gray-900">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
          <h2 className="text-green-500 text-2xl font-semibold text-center">
            Edit Profile
          </h2>

          <form className="space-y-4" onSubmit={updateProfile}>
            <TextInput
              title="Username"
              placeHolder="Enter your username..."
              type="text"
              theme={theme}
              value={userName}
              setValue={setUserName}
            />

            <div className="space-y-2">
              <label className="text-xs text-gray-600 dark:text-gray-300">
                Profile Image
              </label>
              {profileImage && (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-green-400 hover:scale-105 transition duration-300"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setProfileImageFile(file);
                  handleImageUpload(file);
                }}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-600 dark:text-gray-300">
                Role
              </label>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {auth.user?.role || "N/A"}
              </span>
            </div>

            <div className="space-y-2">
              <TextInput
                title="New Password"
                placeHolder="Enter your new password..."
                type="password"
                theme={theme}
                value={password}
                setValue={setPassword}
                required={false}
              />
              <TextInput
                title="Confirm New Password"
                placeHolder="Confirm your new password..."
                type="password"
                theme={theme}
                value={confirmPassword}
                setValue={setConfirmPassword}
                required={false}
              />
              {(password || confirmPassword) && (
                <small className="text-xs text-gray-400">
                  Leave blank if you don't want to change your password.
                </small>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-12 rounded-3xl transition duration-300 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}>
              {isSubmitting ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default EditProfile;
