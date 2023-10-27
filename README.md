# Melomix

Welcome to our Melomix project, an advanced web application designed as part of our group project in Advanced Web Engineering. This application is inspired by Spotify and aims to mimic some of its functionalities using the Spotify Web API. 

## Technologies Used

- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Frontend**: React, Tailwind CSS, Bootstrap
- **Testing**: Mocha, Chai, Puppeteer
- **External API**: Spotify Web API

## Features

- Browse and search for songs, artists, and albums
- Play and manage songs
- Create and manage playlists
- User authentication and profile management

## Installation and Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/spotify-clone.git
    cd spotify-clone
    ```

2. **Install the dependencies:**

    ```bash
    npm install
    ```

3. **Setup MongoDB:**
    - Ensure that MongoDB is installed and running on your machine
    - Configure the connection string in the application’s configuration file 

4. **Setup Spotify Web API:**
    - Visit [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications)
    - Create a new application and get the `Client ID` and `Client Secret`
    - Configure these credentials in the application’s configuration file

5. **Start the application:**

    ```bash
    npm start
    ```

## Testing

To run the tests, execute the following command:

```bash
npm test
