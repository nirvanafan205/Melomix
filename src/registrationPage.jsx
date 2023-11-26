import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faUnlock,
  faEnvelope,
  faArrowRotateLeft,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import StarryNight from "./components/starryNight";
import axios from "axios";
import { Link } from "react-router-dom";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegistration = async () => {
    try {
      // Validate other fields as needed

      const response = await axios.post("http://localhost:3001/register", {
        username,
        password,
        email,
      });

      // Reset form fields on successful registration
      setUsername("");
      setPassword("");
      setEmail("");

      // Reset registration error
      setRegistrationError("");

      // You can handle the server response as needed
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { data } = error.response;
        setRegistrationError(
          data.error || "Registration failed: Username Taken"
        );
      } else if (error.request) {
        // The request was made but no response was received
        setRegistrationError("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        setRegistrationError("Error setting up the request");
      }
    }
  };

  const handleUsernameChange = () => {
    // Reset registration error when the username changes
    setRegistrationError("");
  };

  return (
    <StarryNight>
      <div className="w-full min-h-screen flex justify-center items-center bg-gray-900">
        <div className="relative w-80 h-96 bg-gray-800 rounded-lg overflow-hidden">
          <div className="absolute inset-1 bg-gray-950 rounded-lg z-10 p-5">
            <h1 className="text-4xl text-center mb-6 animate-rainbow">
              Registration
            </h1>

            {/* Display registration error message */}
            {registrationError && (
              <p className="text-red-500 text-center mb-4">
                {registrationError}
              </p>
            )}

            <form action="">
              <div className="relative my-4">
                <input
                  type="email"
                  className="block w-full sm:w-72 py-2.5 px-0 text-sm text-indigo-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-grey-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <FontAwesomeIcon
                  icon={faEnvelope}
                  className=" text-lg absolute text-indigo-800 top-3 left-64"
                />

                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6  "
                >
                  Email
                </label>
              </div>

              <div className="relative my-4">
                <input
                  type="text"
                  className={`block w-full sm:w-72 py-2.5 px-0 text-lg text-purple-800 text-sm text-indigo-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-grey-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-Blue-600 peer`}
                  placeholder=""
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <FontAwesomeIcon
                  icon={faUser}
                  className=" text-lg absolute text-indigo-800 top-3 left-64"
                />

                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6  "
                >
                  Username
                </label>
              </div>

              <div className="relative">
                <FontAwesomeIcon
                  icon={showPassword ? faUnlock : faLock}
                  className={`absolute text-lg ${
                    showPassword ? "text-pink-500" : "text-purple-800"
                  }  left-64 top-2 cursor-pointer`}
                  onClick={togglePasswordVisibility}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  className={`block w-full sm:w-72 py-2.5 px-0 text-lg ${
                    showPassword ? "text-pink-500" : "text-purple-800"
                  } text-sm text-indigo-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-grey-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-Blue-600 peer`}
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                >
                  Password
                </label>

                <div className="mt-12 flex items-center justify-center">
                  <Link to="/login">
                    <FontAwesomeIcon
                      icon={faArrowRotateLeft}
                      className="text-3xl text-teal-200 hover:text-violet-700 mr-16"
                    />
                  </Link>

                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className="text-3xl text-indigo-800 hover:text-blue-600"
                    onClick={handleRegistration}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </StarryNight>
  );
};

export default Registration;
