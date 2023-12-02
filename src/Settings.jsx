import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import StarryNight from "./components/starryNight";

const LoginPage = () => {
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
            <div className="tw-flex tw-justify-center tw-mt-4">
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
        </div>
      </div>
    </StarryNight>
  );
};

export default LoginPage;
