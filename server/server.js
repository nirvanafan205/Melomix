/*
  Importing necessary modules:
    express for the web server
    cors for handling Cross-Origin Resource Sharing
    body-parser for parsing JSON in request bodies and spotify-web-api-node for working with the Spotify API

  Creating an Express application (app)

  Applying middleware:
    cors() for enabling CORS 
    bodyParser.json() for parsing JSON in request bodies
*/

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Token Refresh Endpoint (/refresh)
app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:5173/search",
    clientId: "5eb084a46a0a4ff9a4c885b1bdd130da",
    clientSecret: "27188872cb704575b8a954349a48c27f",
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });

  /*
    Handling POST requests to "/refresh."
    Extracting the refresh token from the request body
    Create a new instance of SpotifyWebApi with the client ID, client secret, redirect URI, and refresh token.
    Using the refreshAccessToken method to obtain a new access token
    Sending a JSON response with the new access token and its expiration time
    Handling errors by logging them and sending a 400 status code in case of failure
  */
});

// Authorization Code Grant Endpoint (/search)
app.post("/search", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:5173/search",
    clientId: "5eb084a46a0a4ff9a4c885b1bdd130da",
    clientSecret: "27188872cb704575b8a954349a48c27f",
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch(() => {
      res.sendStatus(400);
    });

  /*
    Handling POST requests to "/search."
    Extracts authorization code from the request body
    Creates new instance of SpotifyWebApi with the client ID, client secret, and redirect URI
    Uses authorizationCodeGrant method to exchange the code for access and refresh tokens
    Sends a JSON response with the obtained tokens and their expiration time
    Handling errors by sending a 400 status code in case of failure
  */
});

// Make the server listen on port 5174
app.listen(5174);
