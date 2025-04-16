// import React, { useState } from 'react'
// import TextInput from '../../shared/TextInput'
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios';
// import { useCookies } from 'react-cookie';
// import { backend_url } from '../../utils/Config';
// import { toast } from 'react-toastify';
// import { useAuth } from '../../context/AuthContext';

// const Signup = () => {
//   const [theme, setTheme] = useState('light')
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const navigate = useNavigate()
//   const { setAuth } = useAuth();

//   //cookie set up
//   const [cookies, setCookie] = useCookies(['token']);

//   //change theme
//   const changeTheme = () => {
//     if (theme === 'light') {
//       setTheme('dark')
//     } else {
//       setTheme('light')
//     }
//   }

//   //handle signup
//   const signup = async () => {
//     try {
//       if (password !== confirmPassword) {
//         toast.warning('Password and confirm password do not match');
//         return; // Stop further execution
//       }

//       const user_Role = 'consumer';
//       const data = {
//         user_Name: name,
//         email: email,
//         password: password,
//         user_Role: user_Role,
//       };

//       const response = await axios.post(backend_url + '/api/v1/users/auth/sign-up', data);

//       if (response && response?.data?.statusCode === 201) {
//         const token = response?.data?.data?.token;
//         const date = new Date();
//         date.setDate(date.getDate() + 30);
//         setCookie('token', token, { path: '/', expires: date });

//         toast.success('User created successfully');

//         // Set the user data in localStorage
//         const userData = response.data.data.user;
//   localStorage.setItem('user', JSON.stringify(userData));

//         // Setting the auth data in context
//         await setAuth({
//           user: userData,
//           token,
//         });

//         navigate('/'); // Navigate to the home page
//         return; // Explicitly stop further execution
//       }

//       // Handle server-side errors
//       // toast.error(response?.data?.errors || 'An error occurred during signup');
//       return; // Stop further execution
//     } catch (error) {
//       // Handle any network or unexpected errors
//       // toast.error('Failed to register. Please try again later.');
//       console.error('Sign-up error:', error);
//       return; // Explicitly stop further execution
//     }
//   };

//   return (
//     <div className={`w-full h-full bg-signUpBgMobile ${theme === 'light' ? 'md:bg-imgg' : 'md:bg-im'} bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center`}>

//       <label class="inline-flex items-center relative">

//         <input class="peer hidden" id="toggle" type="checkbox" onClick={() => changeTheme()} />
//         <div
//           class="relative w-[110px] h-[50px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-[40px] after:h-[40px] after:bg-gradient-to-r from-orange-500 to-yellow-400 peer-checked:after:from-zinc-900 peer-checked:after:to-zinc-900 after:rounded-full after:top-[5px] after:left-[5px] active:after:w-[50px] peer-checked:after:left-[105px] peer-checked:after:translate-x-[-100%] shadow-sm duration-300 after:duration-300 after:shadow-md"
//         ></div>
//         <svg
//           height="0"
//           width="100"
//           viewBox="0 0 24 24"
//           data-name="Layer 1"
//           id="Layer_1"
//           xmlns="http://www.w3.org/2000/svg"
//           class="fill-white peer-checked:opacity-60 absolute w-6 h-6 left-[13px]"
//         >
//           <path
//             d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z"
//           ></path>
//         </svg>
//         <svg
//           height="512"
//           width="512"
//           viewBox="0 0 24 24"
//           data-name="Layer 1"
//           id="Layer_1"
//           xmlns="http://www.w3.org/2000/svg"
//           class="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-6 h-6 right-[13px]"
//         >
//           <path
//             d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24Zm.074-22a10.776,10.776,0,0,0-1.675.127,10.1,10.1,0,0,0-8.344,8.8A9.928,9.928,0,0,0,4.581,18.7a10.473,10.473,0,0,0,11.093,2.734.5.5,0,0,0,.138-.856h0C9.883,16.1,9.417,8.087,14.865,3.124a.459.459,0,0,0,.127-.465.491.491,0,0,0-.356-.362A10.68,10.68,0,0,0,12.083,2ZM20.5,12a1,1,0,0,1-.97-.757l-.358-1.43L17.74,9.428a1,1,0,0,1,.035-1.94l1.4-.325.351-1.406a1,1,0,0,1,1.94,0l.355,1.418,1.418.355a1,1,0,0,1,0,1.94l-1.418.355-.355,1.418A1,1,0,0,1,20.5,12ZM16,14a1,1,0,0,0,2,0A1,1,0,0,0,16,14Zm6,4a1,1,0,0,0,2,0A1,1,0,0,0,22,18Z"
//           ></path>
//         </svg>
//       </label>
//       <div className='backdrop-blur-md rounded-md h-fit p-3 space-y-3 flex flex-col justify-center items-center'>
//         <div className='text-green-500 p-3  text-xl font-bold'>Sign Up</div>
//         <div className='flex flex-col space-y-1'>
//           <TextInput title={'Name'} placeHolder={'Enter your name..'} type={'text'}
//             theme={theme} value={name} setValue={setName}
//           />
//           <TextInput title={'Email'} placeHolder={'Enter your valid email..'} type={'email'}
//             theme={theme} value={email} setValue={setEmail}
//           />
//           <TextInput title={'Password'} placeHolder={'Enter your password...'} type={'password'}
//             theme={theme} value={password} setValue={setPassword} />
//           <TextInput title={'Confirm Password'} placeHolder={'Enter your password again...'} type={'password'}
//             theme={theme} value={confirmPassword} setValue={setConfirmPassword} />
//         </div>
//         {/* Sign Up button */}

//         <div className="flex items-center justify-center ">
//           <div className="relative group">
//             <button className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
//               onClick={(e) => {
//                 e.preventDefault()
//                 signup()
//               }}
//             >
//               <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
//               <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
//                 <div className="relative z-10 flex items-center space-x-2">
//                   <span className="transition-all duration-500 group-hover:translate-x-1">Let's get started</span>
//                   <svg className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1" data-slot="icon" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                     <path clipRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" fillRule="evenodd" />
//                   </svg>
//                 </div>
//               </span>
//             </button>
//           </div>
//         </div>

//         {/* google sign up button */}
//         <div className='m-2'>
//           <button
//             class="bg-[linear-gradient(#e9e9e9,#e9e9e9_50%,#fff)] group w-50 h-10 inline-flex transition-all duration-300 overflow-visible p-1 rounded-full group"
//           >
//             <div
//               class="w-half h-full bg-[linear-gradient(to_top,#ececec,#fff)] overflow-hidden shadow-[0_0_1px_rgba(0,0,0,0.07),0_0_1px_rgba(0,0,0,0.05),0_3px_3px_rgba(0,0,0,0.25),0_1px_3px_rgba(0,0,0,0.12)] p-1 rounded-full hover:shadow-none duration-300"
//             >
//               <div
//                 class="w-full h-full text-xl gap-x-0.5 gap-y-0.5 justify-center text-[#101010] bg-[linear-gradient(#f4f4f4,#fefefe)] group-hover:bg-[linear-gradient(#e2e2e2,#fefefe)] duration-200 items-center text-[18px] font-medium gap-4 inline-flex overflow-hidden px-4 py-2 rounded-full black group-hover:text-blue-600"
//               >
//                 <svg
//                   xmlns:xlink="http://www.w3.org/1999/xlink"
//                   xmlns="http://www.w3.org/2000/svg"
//                   version="1.1"
//                   viewBox="0 0 64 64"
//                   height="32px"
//                   width="24px"
//                 >
//                   <g fill-rule="evenodd" fill="none" stroke-width="1" stroke="none">
//                     <g fill-rule="nonzero" transform="translate(3.000000, 2.000000)">
//                       <path
//                         fill="#4285F4"
//                         d="M57.8123233,30.1515267 C57.8123233,27.7263183 57.6155321,25.9565533 57.1896408,24.1212666 L29.4960833,24.1212666 L29.4960833,35.0674653 L45.7515771,35.0674653 C45.4239683,37.7877475 43.6542033,41.8844383 39.7213169,44.6372555 L39.6661883,45.0037254 L48.4223791,51.7870338 L49.0290201,51.8475849 C54.6004021,46.7020943 57.8123233,39.1313952 57.8123233,30.1515267"
//                       ></path>
//                       <path
//                         fill="#34A853"
//                         d="M29.4960833,58.9921667 C37.4599129,58.9921667 44.1456164,56.3701671 49.0290201,51.8475849 L39.7213169,44.6372555 C37.2305867,46.3742596 33.887622,47.5868638 29.4960833,47.5868638 C21.6960582,47.5868638 15.0758763,42.4415991 12.7159637,35.3297782 L12.3700541,35.3591501 L3.26524241,42.4054492 L3.14617358,42.736447 C7.9965904,52.3717589 17.959737,58.9921667 29.4960833,58.9921667"
//                       ></path>
//                       <path
//                         fill="#FBBC05"
//                         d="M12.7159637,35.3297782 C12.0932812,33.4944915 11.7329116,31.5279353 11.7329116,29.4960833 C11.7329116,27.4640054 12.0932812,25.4976752 12.6832029,23.6623884 L12.6667095,23.2715173 L3.44779955,16.1120237 L3.14617358,16.2554937 C1.14708246,20.2539019 0,24.7439491 0,29.4960833 C0,34.2482175 1.14708246,38.7380388 3.14617358,42.736447 L12.7159637,35.3297782"
//                       ></path>
//                       <path
//                         fill="#EB4335"
//                         d="M29.4960833,11.4050769 C35.0347044,11.4050769 38.7707997,13.7975244 40.9011602,15.7968415 L49.2255853,7.66898166 C44.1130815,2.91684746 37.4599129,0 29.4960833,0 C17.959737,0 7.9965904,6.62018183 3.14617358,16.2554937 L12.6832029,23.6623884 C15.0758763,16.5505675 21.6960582,11.4050769 29.4960833,11.4050769"
//                       ></path>
//                     </g>
//                   </g>
//                 </svg>
//                 <span class="ml-2">Sign Up with Google</span>
//               </div>
//             </div>
//           </button>
//         </div>
//         <div className='m-1 flex gap-1 justify-start items-center'>
//           <h5 className={`${theme === 'light' ? 'text-black' : 'text-white'} text-xs`}>Already have an account?</h5>
//           <Link className={`${theme === 'light' ? 'text-black' : 'text-white'} text-sm hover:text-blue-600 underline`} to='/login'>Login</Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Signup

import React, { useState } from "react";
import TextInput from "../../shared/TextInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { backend_url } from "../../utils/Config";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

import lightBackground from "../../images/imgg.png";
import darkBackground from "../../images/img22.jpg";

const Signup = () => {
  const [theme, setTheme] = useState("light");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  // Cookie setup
  const [cookies, setCookie] = useCookies(["token"]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Handle signup
  const handleSignup = async () => {
    try {
      setIsLoading(true);

      if (password !== confirmPassword) {
        toast.warning("Passwords do not match");
        setIsLoading(false);
        return;
      }

      if (!name || !email || !password) {
        toast.warning("Please fill in all required fields");
        setIsLoading(false);
        return;
      }

      const userData = {
        user_Name: name,
        email: email,
        password: password,
        user_Role: "consumer",
      };

      const response = await axios.post(
        `${backend_url}/api/v1/users/auth/sign-up`,
        userData,
      );

      if (response && response?.data?.statusCode === 201) {
        const token = response?.data?.data?.token;
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setCookie("token", token, { path: "/", expires: date });

        toast.success("Account created successfully!");

        // Store user data
        const user = response.data.data.user;
        localStorage.setItem("user", JSON.stringify(user));

        // Update auth context
        await setAuth({
          user: user,
          token,
        });

        navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to create account. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center`}
      style={{
        backgroundImage:
          theme === "light"
            ? `url(${lightBackground})`
            : `url(${darkBackground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}>
      {/* Theme toggle */}
      <>
        <div className="absolute top-6 right-6">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 ${
              theme === "light"
                ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                : "bg-slate-700 text-yellow-300 hover:bg-slate-600"
            }`}>
            {theme === "light" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
          </button>
        </div>
        <div
          className={`w-full max-w-md p-8 rounded-2xl shadow-xl ${
            theme === "light" ? "bg-white" : "bg-gray-800"
          } backdrop-blur-lg transition-all duration-300`}>
          <div className="text-center mb-8">
            <h1
              className={`text-3xl font-bold ${
                theme === "light" ? "text-indigo-600" : "text-indigo-400"
              }`}>
              Create Account
            </h1>
            <p
              className={`mt-2 ${
                theme === "light" ? "text-gray-600" : "text-gray-300"
              }`}>
              Join our community today
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div
              className={`relative ${
                theme === "light" ? "text-gray-700" : "text-gray-200"
              }`}>
              <label htmlFor="name" className="text-sm font-medium block mb-1">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 opacity-60"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg ${
                    theme === "light"
                      ? "bg-gray-50 border border-gray-200"
                      : "bg-gray-700 border border-gray-600"
                  } focus:outline-none focus:ring-2 ${
                    theme === "light"
                      ? "focus:ring-indigo-500"
                      : "focus:ring-indigo-400"
                  } transition-all`}
                />
              </div>
            </div>

            <div
              className={`relative ${
                theme === "light" ? "text-gray-700" : "text-gray-200"
              }`}>
              <label htmlFor="email" className="text-sm font-medium block mb-1">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 opacity-60"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg ${
                    theme === "light"
                      ? "bg-gray-50 border border-gray-200"
                      : "bg-gray-700 border border-gray-600"
                  } focus:outline-none focus:ring-2 ${
                    theme === "light"
                      ? "focus:ring-indigo-500"
                      : "focus:ring-indigo-400"
                  } transition-all`}
                />
              </div>
            </div>

            <div
              className={`relative ${
                theme === "light" ? "text-gray-700" : "text-gray-200"
              }`}>
              <label
                htmlFor="password"
                className="text-sm font-medium block mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 opacity-60"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg ${
                    theme === "light"
                      ? "bg-gray-50 border border-gray-200"
                      : "bg-gray-700 border border-gray-600"
                  } focus:outline-none focus:ring-2 ${
                    theme === "light"
                      ? "focus:ring-indigo-500"
                      : "focus:ring-indigo-400"
                  } transition-all`}
                />
              </div>
            </div>

            <div
              className={`relative ${
                theme === "light" ? "text-gray-700" : "text-gray-200"
              }`}>
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium block mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 opacity-60"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg ${
                    theme === "light"
                      ? "bg-gray-50 border border-gray-200"
                      : "bg-gray-700 border border-gray-600"
                  } focus:outline-none focus:ring-2 ${
                    theme === "light"
                      ? "focus:ring-indigo-500"
                      : "focus:ring-indigo-400"
                  } transition-all`}
                />
              </div>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            onClick={handleSignup}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            } 
            ${
              theme === "light"
                ? "bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
            }`}>
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </button>

          {/* Social Login */}
          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div
                className={`w-full border-t ${
                  theme === "light" ? "border-gray-200" : "border-gray-700"
                }`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className={`px-2 ${
                  theme === "light"
                    ? "bg-white text-gray-500"
                    : "bg-gray-800 text-gray-400"
                }`}>
                Or continue with
              </span>
            </div>
          </div>

          <button
            className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 
            ${
              theme === "light"
                ? "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700"
                : "bg-gray-700 border border-gray-600 hover:bg-gray-600 text-white"
            }`}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
              />
            </svg>
            <span>Sign up with Google</span>
          </button>

          <div className="mt-6 text-center">
            <p
              className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
              Already have an account?{" "}
              <Link
                to="/login"
                className={`font-medium ${
                  theme === "light"
                    ? "text-indigo-600 hover:text-indigo-500"
                    : "text-indigo-400 hover:text-indigo-300"
                }`}>
                Log in
              </Link>
            </p>
          </div>
        </div>
      </>
    </div>
  );
};

export default Signup;
