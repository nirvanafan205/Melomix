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
import StarryNight from "./components/starryNight";
import axios from "axios";
import { Link } from "react-router-dom";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 5000); // Close the notification after 5 seconds
  };

  const handleRegistration = async () => {
    let errors = [];

    if (password.length < 6) {
      errors.push("Password is too short (min 6 characters)");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (!/\d/.test(username)) {
      errors.push("Username must contain at least one number");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Enter a valid email address");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    setPasswordError(errors.join("\n"));
    setModalOpen(errors.length > 0);

    if (errors.length === 0) {
      try {
        const response = await axios.post("http://localhost:3001/register", {
          username,
          password,
          email,
        });

        setUsername("");
        setPassword("");
        setEmail("");
        setModalOpen(false);
        setRegistrationError("");

        // Show success notification
        showNotification(response.data.message, "success");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // Show username exists notification
          showNotification("Username already exists", "error");
        } else {
          console.error("Error:", error);
        }
      }
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <StarryNight>
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
                  className="block w-full sm:w-72 py-2.5 px-0 text-sm text-indigo-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-grey-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-lg absolute text-indigo-800 top-3 left-64"
                />
                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                  className="text-lg absolute text-indigo-800 top-3 left-64"
                />
                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
        {registrationError && (
          <p className="text-red-500 text-center mb-4">{registrationError}</p>
        )}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-700 opacity-75"></div>
            <div className="z-10 bg-white p-8 rounded-md absolute w-80">
              {passwordError.split("\n").map((error, index) => (
                <p key={index} className="text-red-500 text-center">
                  {error}
                </p>
              ))}
              <button
                className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {notification.message && (
          <div
            className={`fixed inset-x-0 bottom-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end sm:inset-0`}
          >
            <div
              className={`max-w-sm w-full bg-${
                notification.type === "success" ? "green" : "red"
              }-600 shadow-lg rounded-lg pointer-events-auto`}
            >
              <div className="rounded-lg shadow-xs overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="text-sm leading-5 font-medium text-white">
                        {notification.message}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                      <button
                        className="inline-flex text-white focus:outline-none focus:text-white"
                        onClick={() =>
                          setNotification({ message: "", type: "" })
                        }
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </StarryNight>
  );
};

export default Registration;