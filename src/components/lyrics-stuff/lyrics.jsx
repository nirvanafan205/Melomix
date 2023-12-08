const Genius = require("genius-lyrics");
const Client = new Genius.Client("WQYU8B3IPk8PXyXVGNCc4HyyD9PM_Uu_BigiEbjN368PMbMaHJicYG6hg08gpSk6"); 

async function getLyrics() {
    //so i guess this is artist and song name is fine?
    const searches = await Client.songs.search("bladee rain check");

    // Pick the first song
    const firstSong = searches[0];
    console.log("About the Song:\n", firstSong, "\n");

    // Get the lyrics
    const lyrics = await firstSong.lyrics();
    console.log("Lyrics of the Song:\n", lyrics, "\n");
}

getLyrics().catch(console.error);