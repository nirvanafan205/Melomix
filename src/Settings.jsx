import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faArrowRotateLeft,
  faUser,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import StarryNight from "./components/starryNight";

const LoginPage = () => {
  const [isChangeUsernameModalOpen, setChangeUsernameModalOpen] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");

  const openChangeUsernameModal = () => {
    setChangeUsernameModalOpen(true);
  };

  const closeChangeUsernameModal = () => {
    setChangeUsernameModalOpen(false);
    // Reset input fields when closing the modal
    setNewUsername("");
    setPassword("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSaveChanges = () => {
    // Add logic to save changes (update username) here
    // ...
    // Close the modal after saving changes
    closeChangeUsernameModal();
  };

  return (
    <StarryNight>
      <div className="tw-w-full tw-min-h-screen tw-flex tw-justify-center tw-items-center tw-bg-gray-900">
        <div className="tw-relative tw-w-80 tw-h-96 tw-bg-gray-800 tw-rounded-lg tw-overflow-hidden">
          <div className="tw-absolute tw-w-80 tw-h-96 tw-bg-gradient-to-r tw-from-fuchsia-500 tw-via-fuchsia-800 tw-to-transparent tw-top-[-50%] tw-left-[-50%] tw-animate-spin-slow tw-origin-bottom-right tw-bg-gradient-spin"></div>

          <div className="tw-absolute tw-w-80 tw-h-96 tw-bg-gradient-to-r tw-from-fuchsia-500 tw-via-fuchsia-800 tw-to-transparent tw-top-[-50%] tw-left-[-50%] tw-animate-spin-slow tw-origin-bottom-right tw-bg-gradient-spin"></div>

          <div className="tw-absolute tw-inset-1 tw-bg-gray-950 tw-rounded-lg tw-z-10 tw-p-5">
            <h1 className="tw-text-4xl tw-text-center tw-mb-6 tw-animate-rainbow">
              Settings
            </h1>

            {/* Change Password */}
            <div className="tw-flex tw-justify-center tw-mt-4">
              <div className="tw-rounded-full tw-bg-blue-800 tw-h-14 tw-w-64 tw-flex tw-items-center tw-justify-center tw-mr-4">
                <span className="tw-text-rose-200 tw-font-bold tw-text-xl">
                  Change Password
                </span>
              </div>
            </div>

            {/* Change Username */}
            <div
              className="tw-flex tw-justify-center tw-mt-4"
              onClick={openChangeUsernameModal}
            >
              <div className="tw-rounded-full tw-bg-indigo-500 tw-h-14 tw-w-64 tw-flex tw-items-center tw-justify-center tw-mr-4">
                <span className="tw-text-teal-200 tw-font-bold tw-text-xl">
                  Change Username
                </span>
              </div>
            </div>

            {/* Delete Account */}
            <div className="tw-flex tw-justify-center tw-mt-4">
              <div className="tw-rounded-full tw-bg-fuchsia-300 tw-h-14 tw-w-64 tw-flex tw-items-center tw-justify-center tw-mr-4">
                <span className="tw-text-teal-300 tw-font-bold tw-text-xl">
                  Delete Account
                </span>
              </div>
            </div>

            <div className="tw-flex tw-justify-center tw-mt-12 tw-text-xs">
              <Link to="/">
                <FontAwesomeIcon
                  icon={faHouse}
                  className="tw-text-3xl tw-text-teal-200 tw-hover:text-violet-700"
                />
              </Link>

              <Link to="/login">
                <FontAwesomeIcon
                  icon={faArrowRotateLeft}
                  className="tw-text-3xl tw-text-emerald-300 tw-ml-12 tw-hover:text-cyan-400"
                />
              </Link>
            </div>
          </div>

          {/* Change Username Modal */}
          {isChangeUsernameModalOpen && (
            <div className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center">
              <div className="tw-absolute tw-inset-0 tw-bg-gray-700 tw-opacity-75"></div>
              <div className="tw-z-10 tw-bg-white tw-p-8 tw-rounded-md tw-absolute tw-w-80 tw-flex tw-flex-col tw-items-center">
                <h2 className="tw-text-2xl tw-mb-4 tw-text-center">
                  Change Username
                </h2>
                <div className="tw-relative tw-my-4">
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    style={{ outline: "none" }}
                    className="tw-block tw-w-72 tw-py-2.5 tw-px-0 tw-text-sm tw-text-indigo-800 tw-bg-transparent tw-border-0 tw-border-b-2 tw-border-gray-300 tw-appearance-none tw-dark:text-white tw-dark:border-grey-600 tw-dark:focus:border-blue-500 tw-focus:outline-none tw-focus:ring-0 tw-focus:text-white tw-focus:border-blue-600 tw-peer"
                    placeholder="New Username"
                  />
                  <FontAwesomeIcon
                    icon={faUser}
                    className="tw-text-lg tw-absolute tw-text-indigo-800 tw-top-3 tw-left-64"
                  />
                  <label
                    htmlFor=""
                    className="tw-absolute tw-text-sm tw-text-white tw-duration-300 tw-transform tw--translate-y-6 tw-scale-75 tw-top-3 tw-z-[-10] tw-origin-[0] tw-peer-focus:left-0 tw-peer-focus:text-blue-600 tw-peer-focus:dark:text-blue-500 tw-peer-placeholder-shown:scale-100 tw-peer-placeholder-shown:translate-y-0 tw-peer-focus:scale-75 tw-peer-focus:translate-y-[-6]  "
                  >
                    New Username
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`tw-block tw-w-72 tw-py-2.5 tw-px-0 tw-text-lg ${
                      showPassword ? "tw-text-pink-500" : "tw-text-purple-800"
                    } tw-bg-transparent tw-border-0 tw-border-b-2 tw-border-gray-300 tw-appearance-none tw-dark:text-white tw-dark:border-gray-600 tw-dark:focus:border-blue-500 tw-focus:outline-none tw-focus:ring-0 tw-focus:text-white tw-focus:border-blue-600 tw-peer tw-pt-10`}
                    style={{ outline: "none" }}
                    placeholder="Your Password"
                  />
                  <label
                    htmlFor=""
                    className="tw-absolute tw-text-sm tw-text-white tw-duration-300 tw-transform tw--translate-y-6 tw-scale-75 tw-top-10 tw-z-[-10] tw-origin-[0] tw-peer-focus:left-0 tw-peer-focus:text-blue-600 tw-peer-focus:dark:text-blue-500 tw-peer-placeholder-shown:scale-100 tw-peer-placeholder-shown:translate-y-0 tw-peer-focus:scale-75 tw-peer-focus:translate-y-[-6]"
                  >
                    Your Password
                  </label>
                </div>
                <div className="tw-flex tw-justify-between tw-mt-4">
                  <button
                    className="tw-bg-indigo-500 tw-text-white tw-py-2 tw-px-4 tw-rounded-md"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>

                  <button
                    className="tw-bg-indigo-500 tw-text-white tw-py-2 tw-px-4 tw-rounded-md tw-ml-4"
                    onClick={closeChangeUsernameModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </StarryNight>
  );
};

export default LoginPage;
