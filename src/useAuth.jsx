import { useState, useEffect } from "react";
import axios from "axios";

const useAuth = (code) => {
  // Using the useState hook to manage the state of
  // access token (accessToken)
  // refresh token (refreshToken)
  // and expiration time (expiresIn)

  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  /*
    useEffect is triggered when the code changes
    sends a POST request to the server (http://localhost:5174/search) with the authorization code
    successful response, it updates the state with the obtained access token, refresh token, and expiration time.
    manipulates the browser's history to remove the authorization code from the URL
  */

  useEffect(() => {
    axios
      .post("http://localhost:5174/search", {
        code,
      })
      .then((res) => {
        //console.log(res.data);
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");
      })
      .catch(() => {
        window.location = "/";
      });
  }, [code]);

  /*
    useEffect is triggered when either the refreshToken or expiresIn changes.
    checks if both refreshToken and expiresIn exist before proceeding.
    sets up an interval that sends a POST request to the server (http://localhost:5174/refresh) to refresh the access token.
    successful response, it updates the state with the new access token and expiration time.
    The interval is cleared when the component unmounts or when either refreshToken or expiresIn changes.
 */

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("http://localhost:5174/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  // The hook returns the current access token
  return accessToken;
};

export default useAuth;

/*
  this custom hook manages the authentication 
  exchanges the authorization code for an access token and refresh token and sets up a periodic refresh of the access token using the refresh token
  The hook continuously provides the latest access token
*/
