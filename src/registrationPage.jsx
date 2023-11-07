import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faUnlock,
  faEnvelope,
  faArrowRotateLeft,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

// function to validate password
function isPasswordValid(password) {
  // Define password requirements
  const minLength = 6;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const digitRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

  // Check if all requirements are met
  return (
    password.length >= minLength &&
    uppercaseRegex.test(password) &&
    lowercaseRegex.test(password) &&
    digitRegex.test(password) &&
    specialCharRegex.test(password)
  );
}

const Registration = () => {
  // input box stuff
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState(""); // Add state for password
  const [passwordError, setPasswordError] = useState(""); // Add state for password error message
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // Add state for modal visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Close the password error modal
  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-900">
      <div className="relative w-80 h-96 bg-gray-800 rounded-lg overflow-hidden">
        <div className="absolute w-80 h-96 bg-gradient-to-r from-fuchsia-500 via-fuchsia-800 to-transparent -top-1/2 -left-1/2 animate-spin-slow origin-bottom-right bg-gradient-spin"></div>

        <div className="absolute w-80 h-96 bg-gradient-to-r from-fuchsia-500 via-fuchsia-800 to-transparent -top-1/2 -left-1/2 animate-spin-slow origin-bottom-right bg-gradient-spin"></div>

        <div className="absolute inset-1 bg-gray-950 rounded-lg z-10 p-5">
          <h1 className="text-4xl text-center mb-6 animate-rainbow">
            Registration
          </h1>

          <form action="">
            <div className="relative my-4">
              <input
                type="email"
                className="block w-72 py-2.5 px-0 text-sm text-indigo-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-grey-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                placeholder=""
                value={email}
                onChange={handleEmailChange}
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
                className="block w-72 py-2.5 px-0 text-sm text-indigo-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-grey-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                placeholder=""
                value={username}
                onChange={handleUsernameChange}
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
                className={`block w-72 py-2.5 px-0 text-lg ${
                  showPassword ? "text-pink-500" : "text-purple-800"
                } block w-72 py-2.5 px-0 text-sm text-indigo-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-grey-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-Blue-600 peer`}
                placeholder=""
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
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
