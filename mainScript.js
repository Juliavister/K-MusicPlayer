
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// audio element for the player
let curr_track = document.createElement('audio');

//list of tracks that have to be played
let track_list = [
    {
        name: "Reason",
        artist: "KAI",
        image: "/TrackART/ReasonArt.png",
        path: "/Songs/Reason.mp3"
    },
    {
        name: "BTBT",
        artist: "B.I",
        image: "/TrackART/BTBT.png",
        path: "/Songs/BT.mp3"
    },
    {
        name: "Kiss of fire",
        artist: "WOODZ",
        image: "/TrackART/KissofFire.png",
        path: "/Songs/KissFire.mp3",
    },
    {
        name: "Black Rose",
        artist: "TAEMIN",
        image: "/TrackART/BlackRose.png",
        path: "/Songs/BlackRose.mp3",
    },
    {
        name: "Crush",
        artist: "Seventeen",
        image: "/TrackART/Crush.png",
        path: "/Songs/Crush.mp3",
    },
    {
        name: "Rover",
        artist: "KAI",
        image: "/TrackART/Rover.png",
        path: "/Songs/Rover.mp3",
    },
    {
        name: "Movie Star",
        artist: "CIX",
        image: "/TrackART/MovieStar.png",
        path: "/Songs/MovieStar.mp3",
    },
    {
        name: "BUCK",
        artist: "WOODZ",
        image: "/TrackART/BUCK.png",
        path: "/Songs/BUCK.mp3",
    },
    {
        name: "New World",
        artist: "VICTON",
        image: "/TrackART/NewWorld.png",
        path: "/Songs/NewWorld.mp3",
    },
    {
        name: "Deja Vu",
        artist: "ATEEZ",
        image: "/TrackART/DejaVu.png",
        path: "/Songs/DejaVu.mp3",
    },
];

function loadTrack(track_index) {
// Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();

//new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();

// update details
    track_art.style.backgroundImage =
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
        "PLAYING " + (track_index + 1) + " OF " + track_list.length;

    updateTimer = setInterval(seekUpdate, 1000);
    curr_track.addEventListener("ended", nextTrack);

    random_bg_color();
}

const colorPalette = [
    "gradient-animation",
    "linear-gradient(to right, #FFC2C2 , #FFD7A8)",
    "linear-gradient(to right, #EB4174 , #FFE3E3)",
    "linear-gradient(to right, #3378FF , #9442FE)",
    //"linear-gradient(to right, #1AA37A , #9DFFB3)",
    "linear-gradient(to right, #8A2EFF , #CCE0FF)",
    //"linear-gradient(to right, #A0BEF8 , #B5F0F0)",
    "linear-gradient(to right, #E53935 , #E35D5B)",
    "linear-gradient(to right, #FF6C87 , #FC7246)",
    "linear-gradient(to right, #FDC639 , #FF7C60)",
    "linear-gradient(to right, #C0392B , #8E44AD)",
    "linear-gradient(to right, #20002C , #CBB4D4)",
    "linear-gradient(to right, #200122 , #GF0000)",
    "linear-gradient(to right, #4568DC , #B06AB3)",
    "linear-gradient(to right, #43C6AC , #191654)",
    "linear-gradient(to right, #42275A , #734B6D)",
    "linear-gradient(to right, #4b79a1 , #283e51)",
];

function random_bg_color() {
    //let red = Math.floor(Math.random() * 256) + 64;
    //let green = Math.floor(Math.random() * 256) + 64;
   // let blue = Math.floor(Math.random() * 256) + 64;
    //let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    const randomIndex = Math.floor(Math.random() * colorPalette.length);
    const bgColor = colorPalette[randomIndex];
    document.body.style.background = bgColor;

    if (bgColor === "gradient-animation") {
        document.body.classList.add("gradient-animation");
    } else {
        document.body.style.background = bgColor;
        document.body.classList.remove("gradient-animation"); // Remove animation class if applied previously
    }
}




function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
// Play
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
// Pause
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
// Go back to the first track if the
// current one is the last in the track list
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;

// Load and play the new track
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
// Go back to the last track if the
// current one is the first in the track list
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length - 1;

    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

loadTrack(track_index);




