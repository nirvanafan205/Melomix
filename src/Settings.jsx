import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faArrowRotateLeft,
  faUser,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import StarryNight from "./components/starryNight";
import { UserContext } from "./UserContext";

const Settings = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle logout
  const handleLogout = () => {
    setUser(null); // Clears the user context
    navigate("/"); // Redirects to the home page
  };

  // username stuff
  const [isChangeUsernameModalOpen, setChangeUsernameModalOpen] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  // password change related states
  const [isChangePasswordModalOpen, setChangePasswordModalOpen] =
    useState(false);
  const [usernameForPasswordChange, setUsernameForPasswordChange] =
    useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  // delete account stuff
  // State for delete account modal visibility
  const [isDeleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState("");
  const [deleteUsername, setDeleteUsername] = useState("");
  const [deletePassword, setDeletePassword] = useState("");

  const openChangeUsernameModal = () => {
    setChangeUsernameModalOpen(true);
  };

  // Function to open the password change modal
  const openChangePasswordModal = () => {
    setChangePasswordModalOpen(true);
  };

  const closeChangeUsernameModal = () => {
    setChangeUsernameModalOpen(false);
    setNewUsername("");
    setPassword("");
  };

  // Function to open the delete account modal
  const openDeleteAccountModal = () => {
    setDeleteAccountModalOpen(true);
  };

  // Function to close the delete account modal
  const closeDeleteAccountModal = () => {
    setDeleteAccountModalOpen(false);
  };

  // Function to close the password change modal
  const closeChangePasswordModal = () => {
    setChangePasswordModalOpen(false);
    setOldPassword("");
    setNewPassword("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to toggle visibility of new password
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleSaveChanges = () => {
    updateUsername();
    closeChangeUsernameModal();
  };

  const updateUsername = async () => {
    // Basic validation
    const usernameRegex = /\d/;

    if (!newUsername || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (!usernameRegex.test(newUsername)) {
      alert("New username must contain at least one number.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include authorization token if required
        },
        body: JSON.stringify({
          currentUsername: user.username,
          newUsername,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update username");
      }

      const data = await response.json();
      alert(data.message);

      // Update the username in your UserContext
      setUser({ ...user, username: data.newUsername }); // Assuming the response contains the new username

      closeChangeUsernameModal();
    } catch (error) {
      console.error("Error updating username:", error);
      alert(error.message);
    }
  };

  const handleChangePassword = async () => {
    if (!usernameForPasswordChange || !newPassword) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameForPasswordChange,
          newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to change password");
      }

      const data = await response.json();
      alert(data.message);
      setUsernameForPasswordChange("");
      setNewPassword("");
      setChangePasswordModalOpen(false);
    } catch (error) {
      console.error("Error changing password:", error);
      alert(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("http://localhost:3001/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include authorization token if required
        },
        body: JSON.stringify({
          deleteAccount: true,
          email: deleteEmail,
          username: deleteUsername,
          password: deletePassword,
        }),
      });

      if (response.ok) {
        alert("Account deleted successfully.");
        handleLogout(); // Log out the user after account deletion
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while trying to delete the account.");
    }
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
            <div
              className="tw-flex tw-justify-center tw-mt-4"
              onClick={openChangePasswordModal}
            >
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
            <div
              className="tw-flex tw-justify-center tw-mt-4"
              onClick={openDeleteAccountModal}
            >
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

          {/* Change Password Modal */}
          {isChangePasswordModalOpen && (
            <div className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center">
              <div className="tw-absolute tw-inset-0 tw-bg-gray-700 tw-opacity-75"></div>
              <div className="tw-z-10 tw-bg-white tw-p-8 tw-rounded-md tw-absolute tw-w-80 tw-flex tw-flex-col tw-items-center">
                <h2 className="tw-text-2xl tw-mb-4 tw-text-center">
                  Change Password
                </h2>

                {/* Username Input */}
                <div className="tw-relative tw-my-4">
                  <input
                    type="text"
                    style={{ outline: "none" }}
                    className="tw-block tw-w-72 tw-py-2.5 tw-px-0 tw-text-sm tw-text-indigo-800 tw-bg-transparent tw-border-0 tw-border-b-2 tw-border-gray-300 tw-appearance-none tw-dark:text-white tw-dark:border-grey-600 tw-dark:focus:border-blue-500 tw-focus:outline-none tw-focus:ring-0 tw-focus:text-white tw-focus:border-blue-600 tw-peer"
                    value={usernameForPasswordChange}
                    onChange={(e) =>
                      setUsernameForPasswordChange(e.target.value)
                    }
                    placeholder="Username"
                  />
                  <FontAwesomeIcon
                    icon={faUser}
                    className="tw-text-lg tw-absolute tw-text-indigo-800 tw-top-3 tw-left-64"
                  />
                </div>

                {/* New Password Input */}
                <div className="tw-relative tw-my-4">
                  <input
                    style={{ outline: "none" }}
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="tw-block tw-w-72 tw-py-2.5 tw-px-0 tw-text-sm tw-text-indigo-800 tw-bg-transparent tw-border-0 tw-border-b-2 tw-border-gray-300 tw-appearance-none tw-dark:text-white tw-dark:border-grey-600 tw-dark:focus:border-blue-500 tw-focus:outline-none tw-focus:ring-0 tw-focus:text-white tw-focus:border-blue-600 tw-peer"
                    placeholder="New Password"
                  />
                  <FontAwesomeIcon
                    icon={showNewPassword ? faUnlock : faLock}
                    className="tw-text-lg tw-absolute tw-text-indigo-800 tw-top-3 tw-left-64 tw-cursor-pointer"
                    onClick={toggleNewPasswordVisibility}
                  />
                </div>

                {/* Buttons inside Change Password Modal */}
                <div className="tw-flex tw-justify-between tw-mt-4">
                  <button
                    className="tw-bg-indigo-500 tw-text-white tw-py-2 tw-px-4 tw-rounded-md"
                    onClick={handleChangePassword}
                  >
                    Save Changes
                  </button>
                  <button
                    className="tw-bg-indigo-500 tw-text-white tw-py-2 tw-px-4 tw-rounded-md tw-ml-4"
                    onClick={closeChangePasswordModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Delete Account Modal */}
        {isDeleteAccountModalOpen && (
          <div className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center">
            <div className="tw-absolute tw-inset-0 tw-bg-gray-700 tw-opacity-75"></div>
            <div className="tw-z-10 tw-bg-white tw-p-8 tw-rounded-md tw-absolute tw-w-80 tw-flex tw-flex-col tw-items-center">
              <h2 className="tw-text-2xl tw-mb-4 tw-text-center">
                Delete Account
              </h2>
              <p>
                Are you sure you want to delete your account? Please confirm
                your email, username, and password.
              </p>

              {/* Email Input */}
              <input
                type="email"
                style={{ outline: "none" }}
                className="tw-block tw-w-72 tw-py-2.5 tw-px-0 tw-text-sm tw-text-indigo-800 tw-bg-transparent tw-border-0 tw-border-b-2 tw-border-gray-300 tw-appearance-none tw-dark:text-white tw-dark:border-grey-600 tw-dark:focus:border-blue-500 tw-focus:outline-none tw-focus:ring-0 tw-focus:text-white tw-focus:border-blue-600 tw-peer tw-mb-4"
                placeholder="Email"
                value={deleteEmail}
                onChange={(e) => setDeleteEmail(e.target.value)}
              />

              {/* Username Input */}
              <input
                type="text"
                style={{ outline: "none" }}
                className="tw-block tw-w-72 tw-py-2.5 tw-px-0 tw-text-sm tw-text-indigo-800 tw-bg-transparent tw-border-0 tw-border-b-2 tw-border-gray-300 tw-appearance-none tw-dark:text-white tw-dark:border-grey-600 tw-dark:focus:border-blue-500 tw-focus:outline-none tw-focus:ring-0 tw-focus:text-white tw-focus:border-blue-600 tw-peer tw-mb-4"
                placeholder="Username"
                value={deleteUsername}
                onChange={(e) => setDeleteUsername(e.target.value)}
              />

              {/* Password Input */}
              <input
                type="password"
                style={{ outline: "none" }}
                className="tw-block tw-w-72 tw-py-2.5 tw-px-0 tw-text-sm tw-text-indigo-800 tw-bg-transparent tw-border-0 tw-border-b-2 tw-border-gray-300 tw-appearance-none tw-dark:text-white tw-dark:border-grey-600 tw-dark:focus:border-blue-500 tw-focus:outline-none tw-focus:ring-0 tw-focus:text-white tw-focus:border-blue-600 tw-peer tw-mb-4"
                placeholder="Password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
              />

              {/* Buttons */}
              <div className="tw-flex tw-justify-around tw-mt-4">
                <button
                  className="tw-bg-green-500 tw-text-white tw-py-2 tw-px-4 tw-rounded-md tw-mr-2"
                  onClick={handleDeleteAccount}
                >
                  Confirm Delete
                </button>

                <button
                  className="tw-bg-red-500 tw-text-white tw-py-2 tw-px-4 tw-rounded-md tw-ml-2"
                  onClick={closeDeleteAccountModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </StarryNight>
  );
};

export default Settings;
