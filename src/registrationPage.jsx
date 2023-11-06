import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faUnlock,
  faHouse,
  faGears,
  faArrowRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              />

              <FontAwesomeIcon
                icon={faUser}
                className=" text-lg absolute text-indigo-800 top-3 left-64"
              />

              <label
                htmlFor=""
                className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6  "
              >
                Your Email
              </label>
            </div>
            <div className="relative my-4">
              <FontAwesomeIcon
                icon={showPassword ? faUnlock : faLock}
                className={`absolute text-lg ${
                  showPassword ? "text-pink-500" : "text-purple-800"
                } top-3 left-64 pt-8 cursor-pointer`}
                onClick={togglePasswordVisibility}
              />

              <input
                type={showPassword ? "text" : "password"}
                className={`block w-72 py-2.5 px-0 text-lg ${
                  showPassword ? "text-pink-500" : "text-purple-800"
                } bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer pt-10`}
                placeholder=""
              />

              <label
                htmlFor=""
                className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-10 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Your Password
              </label>

              {/* Takes you to registration page */}
              <div className="mt-24 flex justify-center items-center">
                <Link to="/login">
                  <span className="text-xs text-pink-500 hover:text-cyan-300">
                    <FontAwesomeIcon
                      icon={faArrowRotateLeft}
                      className="text-3xl text-teal-200 hover:text-violet-700"
                    />
                  </span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
