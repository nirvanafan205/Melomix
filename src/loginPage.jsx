import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faUnlock,
  faHouse,
  faGears,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import StarryNight from "./components/starryNight";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://137.184.4.135:3001/login", {
        username: username,
        password: password,
      });

      setUser({ username });

      // If login is successful, navigate to "/"
      navigate("/");
    } catch (error) {
      // If login fails, show an error modal
      console.error("Error logging in:", error);
      setError("Error logging in. Please try again."); // Set the error message
    }
  };

  const closeErrorModal = () => {
    setError(null);
  };

  return (
    <StarryNight>
      <div className="tw-w-full tw-min-h-screen tw-flex tw-justify-center tw-items-center tw-bg-gray-900">
        <div className="tw-relative tw-w-80 tw-h-96 tw-bg-gray-800 tw-rounded-lg tw-overflow-hidden">
          <div className="tw-absolute tw-w-80 tw-h-96 tw-bg-gradient-to-r tw-from-fuchsia-500 tw-via-fuchsia-800 tw-to-transparent tw-top-[-50%] tw-left-[-50%] tw-animate-spin-slow tw-origin-bottom-right tw-bg-gradient-spin"></div>

          <div className="tw-absolute tw-w-80 tw-h-96 tw-bg-gradient-to-r tw-from-fuchsia-500 tw-via-fuchsia-800 tw-to-transparent tw-top-[-50%] tw-left-[-50%] tw-animate-spin-slow tw-origin-bottom-right tw-bg-gradient-spin"></div>

          <div className="tw-absolute tw-inset-1 tw-bg-gray-950 tw-rounded-lg tw-z-10 tw-p-5">
            <h1 className="tw-text-4xl tw-text-center tw-mb-6 tw-animate-rainbow">
              Login
            </h1>

            <form onSubmit={handleLogin}>
              <div className="tw-relative tw-my-4">
                <input
                  type="text"
                  style={{ outline: "none" }}
                  className="tw-block tw-w-72 tw-py-2.5 tw-px-0 tw-text-sm tw-text-indigo-800 tw-bg-transparent tw-border-0 tw-border-b-2 tw-border-gray-300 tw-appearance-none tw-dark:text-white tw-dark:border-grey-600 tw-dark:focus:border-blue-500 tw-focus:outline-none tw-focus:ring-0 tw-focus:text-white tw-focus:border-blue-600 tw-peer"
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
                  className="tw-absolute tw-text-sm tw-text-white tw-duration-300 tw-transform tw--translate-y-6 tw-scale-75 tw-top-3 tw-z-[-10] tw-origin-[0] tw-peer-focus:left-0 tw-peer-focus:text-blue-600 tw-peer-focus:dark:text-blue-500 tw-peer-placeholder-shown:scale-100 tw-peer-placeholder-shown:translate-y-0 tw-peer-focus:scale-75 tw-peer-focus:translate-y-[-6]  "
                >
                  Your Username
                </label>
              </div>
              <div className="tw-relative tw-my-4">
                <FontAwesomeIcon
                  icon={showPassword ? faUnlock : faLock}
                  className={`tw-absolute tw-text-lg ${
                    showPassword ? "tw-text-pink-500" : "tw-text-purple-800"
                  } tw-top-3 tw-left-64 tw-pt-8 tw-cursor-pointer`}
                  onClick={togglePasswordVisibility}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  className={`tw-block tw-w-72 tw-py-2.5 tw-px-0 tw-text-lg ${
                    showPassword ? "tw-text-pink-500" : "tw-text-purple-800"
                  } tw-bg-transparent tw-border-0 tw-border-b-2 tw-border-gray-300 tw-appearance-none tw-dark:text-white tw-dark:border-gray-600 tw-dark:focus:border-blue-500 tw-focus:outline-none tw-focus:ring-0 tw-focus:text-white tw-focus:border-blue-600 tw-peer tw-pt-10`}
                  style={{ outline: "none" }}
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <label
                  htmlFor=""
                  className="tw-absolute tw-text-sm tw-text-white tw-duration-300 tw-transform tw--translate-y-6 tw-scale-75 tw-top-10 tw-z-[-10] tw-origin-[0] tw-peer-focus:left-0 tw-peer-focus:text-blue-600 tw-peer-focus:dark:text-blue-500 tw-peer-placeholder-shown:scale-100 tw-peer-placeholder-shown:translate-y-0 tw-peer-focus:scale-75 tw-peer-focus:translate-y-[-6]"
                >
                  Your Password
                </label>

                {/* Takes you to registration page */}
                <div className="tw-mt-4">
                  <Link to="/registration">
                    <span className="tw-text-xs tw-text-pink-500 tw-hover:text-cyan-300">
                      New Here? Create an Account!
                    </span>
                  </Link>
                </div>
              </div>

              {/* Takes you to home page */}
              <div className="tw-flex tw-justify-center tw-mt-16 tw-text-xs">
                <Link to="/">
                  <FontAwesomeIcon
                    icon={faHouse}
                    className="tw-text-3xl tw-text-teal-200 tw-hover:text-violet-700"
                  />
                </Link>

                <FontAwesomeIcon
                  icon={faArrowRightToBracket}
                  className="tw-text-3xl tw-text-emerald-300 tw-ml-16 tw-hover:text-cyan-400"
                  onClick={handleLogin}
                />

                <Link to="/settings">
                  <FontAwesomeIcon
                    icon={faGears}
                    className="tw-text-3xl tw-text-emerald-300 tw-ml-16 tw-hover:text-cyan-400"
                  />
                </Link>
              </div>

              {error && (
                <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center">
                  <div
                    className="tw-bg-black tw-bg-opacity-50 tw-fixed tw-inset-0"
                    onClick={closeErrorModal}
                  ></div>
                  <div className="tw-bg-white tw-rounded tw-p-4 tw-max-w-md tw-w-full tw-z-50">
                    <p className="tw-text-red-500">{error}</p>
                    <button
                      className="tw-mt-4 tw-bg-red-500 tw-text-white tw-py-2 tw-px-4 tw-rounded"
                      onClick={closeErrorModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </StarryNight>
  );
};

export default LoginPage;
