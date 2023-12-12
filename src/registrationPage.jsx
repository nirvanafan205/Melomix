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
import { useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const { setUser } = useContext(UserContext);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const showNotification = (message, type) => {
    let textColor, bgColor;

    // Set colors based on notification type
    if (type === "success") {
      textColor = "tw-text-white";
      bgColor = "tw-bg-green-600";
    } else if (type === "error") {
      textColor = "tw-text-white";
      bgColor = "tw-bg-red-600";
    }

    setNotification({ message, type, textColor, bgColor });

    setTimeout(() => {
      setNotification({ message: "", type: "", textColor: "", bgColor: "" });
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
        const response = await axios.post("http://137.184.4.135:3001/register", {
          username,
          password,
          email,
        });
        // Set user in context
        setUser({ username });

        setUsername("");
        setPassword("");
        setEmail("");
        setModalOpen(false);
        setRegistrationError("");

        // Show success notification
        showNotification(response.data.message, "success");
        // Delay the navigation by 5 seconds
        setTimeout(() => {
          // Use navigate instead of history.push
          navigate("/");
        }, 5000);
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
      <div className="tw-w-full tw-min-h-screen tw-flex tw-justify-center tw-items-center tw-bg-gray-900">
        <div className="tw-relative tw-w-80 tw-h-96 tw-bg-gray-800 tw-rounded-lg tw-overflow-hidden">
          <div className="tw-absolute tw-w-80 tw-h-96 tw-bg-gradient-to-r tw-from-fuchsia-500 tw-via-fuchsia-800 tw-to-transparent tw--top-1/2 tw--left-1/2 tw-animate-spin-slow tw-origin-bottom-right tw-bg-gradient-spin"></div>
          <div className="tw-absolute tw-w-80 tw-h-96 tw-bg-gradient-to-r tw-from-fuchsia-500 tw-via-fuchsia-800 tw-to-transparent tw--top-1/2 tw--left-1/2 tw-animate-spin-slow tw-origin-bottom-right tw-bg-gradient-spin"></div>
          <div className="tw-absolute tw-inset-1 tw-bg-gray-950 tw-rounded-lg tw-z-10 tw-p-5">
            <h1 className="tw-text-4xl tw-text-center tw-mb-6 tw-animate-rainbow">
              Registration
            </h1>
            <form action="">
              <div className="tw-relative tw-my-4">
                <input
                  type="email"
                  style={{ outline: "none" }}
                  className="tw-block tw-w-full sm:tw-w-72 tw-py-2.5 tw-px-0 tw-text-sm tw-text-indigo-800 tw-bg-transparent tw-border-0 tw-border-b-2 tw-border-gray-300 tw-appearance-none tw-focus:border-none tw-dark:text-white tw-dark:border-grey-600 tw-dark:focus:border-blue-500 tw-focus:outline-none tw-focus:ring-0 tw-focus:text-white tw-focus:border-blue-600 tw-peer"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="tw-text-lg tw-absolute tw-text-indigo-800 tw-top-3 tw-left-64"
                />
                <label
                  htmlFor=""
                  className="tw-absolute tw-text-sm tw-text-white tw-duration-300 tw-transform tw--translate-y-6 tw-scale-75 tw-top-3 tw-z-[-10] tw-peer-focus:left-0 tw-peer-focus:text-blue-600 tw-peer-focus:dark:text-blue-500 tw-peer-placeholder-shown:scale-100 tw-peer-placeholder-shown:translate-y-0 tw-peer-focus:scale-75 tw-peer-focus:translate-y-[-6]"
                >
                  Email
                </label>
              </div>
              <div className="tw-relative tw-my-4">
                <input
                  type="text"
                  style={{ outline: "none" }}
                  className={`tw-block tw-w-full sm:tw-w-72 tw-py-2.5 tw-px-0 tw-text-lg tw-text-purple-800 tw-text-sm tw-text-indigo-800 tw-bg-transparent tw-border-0 tw-border-b-2 tw-border-gray-300 tw-appearance-none tw-focus:border-none tw-dark:text-white tw-dark:border-grey-600 tw-dark:focus:border-blue-500 tw-focus:outline-none tw-focus:ring-0 tw-focus:text-white tw-focus:border-Blue-600 tw-peer`}
                  placeholder=""
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={faUser}
                  className="tw-text-lg tw-absolute tw-text-indigo-800 tw-top-3 tw-left-64"
                />
                <label
                  htmlFor=""
                  className="tw-absolute tw-text-sm tw-text-white tw-duration-300 tw-transform tw--translate-y-6 tw-scale-75 tw-top-3 tw-z-[-10] tw-peer-focus:left-0 tw-peer-focus:text-blue-600 tw-peer-focus:dark:text-blue-500 tw-peer-placeholder-shown:scale-100 tw-peer-placeholder-shown:translate-y-0 tw-peer-focus:scale-75 tw-peer-focus:translate-y-[-6]"
                >
                  Username
                </label>
              </div>
              <div className="tw-relative">
                <FontAwesomeIcon
                  icon={showPassword ? faUnlock : faLock}
                  className={`tw-absolute tw-text-lg ${
                    showPassword ? "tw-text-pink-500" : "tw-text-purple-800"
                  } tw-left-64 tw-top-2 tw-cursor-pointer`}
                  onClick={togglePasswordVisibility}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  className={`tw-block tw-w-full sm:tw-w-72 tw-py-2.5 tw-px-0 tw-text-lg ${
                    showPassword ? "tw-text-pink-500" : "tw-text-purple-800"
                  } tw-text-sm tw-text-indigo-800 tw-bg-transparent tw-border-0 tw-border-b-2 tw-border-gray-300 tw-appearance-none tw-focus:border-none tw-dark:text-white tw-dark:border-grey-600 tw-dark:focus:border-blue-500 tw-focus:outline-none tw-focus:ring-0 tw-focus:text-white tw-focus:border-Blue-600 tw-peer`}
                  style={{ outline: "none" }}
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  htmlFor=""
                  className="tw-absolute tw-text-sm tw-text-white tw-duration-300 tw-transform tw--translate-y-6 tw-scale-75 tw-top-3 tw-z-[-10] tw-peer-focus:left-0 tw-peer-focus:text-blue-600 tw-peer-focus:dark:text-blue-500 tw-peer-placeholder-shown:scale-100 tw-peer-placeholder-shown:translate-y-0 tw-peer-focus:scale-75 tw-peer-focus:translate-y-[-6]"
                >
                  Password
                </label>
                <div className="tw-mt-12 tw-flex tw-items-center tw-justify-center">
                  <Link to="/login">
                    <FontAwesomeIcon
                      icon={faArrowRotateLeft}
                      className="tw-text-3xl tw-text-teal-200 tw-hover:text-violet-700 tw-mr-16"
                    />
                  </Link>
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className="tw-text-3xl tw-text-indigo-800 tw-hover:text-blue-600"
                    onClick={handleRegistration}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        {registrationError && (
          <p className="tw-text-red-500 tw-text-center tw-mb-4">
            {registrationError}
          </p>
        )}
        {modalOpen && (
          <div className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center">
            <div className="tw-absolute tw-inset-0 tw-bg-gray-700 tw-opacity-75"></div>
            <div className="tw-z-10 tw-bg-white tw-p-8 tw-rounded-md tw-absolute tw-w-80">
              {passwordError.split("\n").map((error, index) => (
                <p key={index} className="tw-text-red-500 tw-text-center">
                  {error}
                </p>
              ))}
              <button
                className="tw-mt-4 tw-bg-indigo-500 tw-text-white tw-py-2 tw-px-4 tw-rounded-md"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {notification.message && (
          <div
            className={`tw-fixed tw-inset-x-0 tw-bottom-0 tw-flex tw-items-end tw-justify-center tw-px-4 tw-py-6 tw-pointer-events-none tw-sm:p-6 tw-items-start tw-justify-end tw-inset-0`}
          >
            <div
              className={`tw-max-w-sm tw-w-full ${notification.bgColor} tw-shadow-lg tw-rounded-lg tw-pointer-events-auto`}
            >
              <div className="tw-rounded-lg tw-shadow-xs tw-overflow-hidden">
                <div className="tw-p-4">
                  <div className="tw-flex tw-items-start">
                    <div
                      className={`tw-ml-3 tw-w-0 tw-flex-1 tw-pt-0.5 ${notification.textColor}`}
                    >
                      <p className="tw-text-sm tw-leading-5 tw-font-medium">
                        {notification.message}
                      </p>
                    </div>
                    <div className="tw-ml-4 tw-flex-shrink-0 tw-flex">
                      <button
                        className={`tw-inline-flex ${notification.textColor} tw-focus:outline-none tw-focus:text-white`}
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
