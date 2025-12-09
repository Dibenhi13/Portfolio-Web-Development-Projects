/*MUSIC TRACKS JSON*/
const tracks = [
        {
        title: "Hedwig's Theme",
        artist: "John Williams",
        file: "assets/music/Lumos_Hedwig's_Theme.mp3",
        cover: "assets/music/PortadaAlbum3.jpg"
        },
        {
        title: "Secrets of the Castle",
        artist: "John Williams",
        file: "assets/music/secrets_of_the_castle.mp3",
        cover: "assets/music/PortadaAlbum3.jpg"
        },
        {
        title: "Snape to Malfoy Manor",
        artist: "Alexandre Desplat",
        file: "assets/music/Snape_to_Malfoy_Manor.mp3",
        cover: "assets/music/PortadaAlbum7.jpg"
        },
        {
        title: "Journey to the Cave",
        artist: "Nicholas Hooper",
        file: "assets/music/Journey_to_the_Cave.mp3",
        cover: "assets/music/PortadaAlbum6.jpg"
        },
        {
        title: "The Chamber of Secrets",
        artist: "John Williams",
        file: "assets/music/The_Chamber_of_Secrets.mp3",
        cover: "assets/music/PortadaAlbum2.jpg"
        }
];

//CODIGO JS ARA QUE SIRVA LA MUSICA
//SE QUEDA EN BUCLE DESPUES DE ACABAR EL TRACK Y NO CONTINUA A LA SIGUIENTE CANCION, OH WELL...
var currentTrack = 0;
const audio = document.querySelector("#bgMusic");
const cover = document.querySelector("#albumCover");
const title = document.querySelector("#trackTitle");
const artist = document.querySelector("#trackArtist");
const playPauseBtn = document.querySelector("#playPauseBtn");


function loadTrack(i) {
    const track = tracks[i];
    audio.src = track.file;
    cover.src = track.cover;
    title.innerHTML = track.title;
    artist.innerHTML = track.artist;
}


document.querySelector("#nextBtn").addEventListener("click", () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    audio.play();
});

document.querySelector("#prevBtn").addEventListener("click", () => {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
    audio.play();
});

playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});
loadTrack(currentTrack);
