
// Select elements
const audio = document.querySelector("audio");
const playPauseBtn = document.querySelector(".play-pause span");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const repeatBtn = document.getElementById("repeat");
const shuffleBtn = document.getElementById("shuffle");
const progressBar = document.querySelector(".progress-bar");
const progressContainer = document.querySelector(".progress-details");
const currentTimeEl = document.querySelector(".time .current:first-child");
const durationTimeEl = document.querySelector(".time .current:last-child");
const musicImage = document.querySelector(".music-image img");
const musicName = document.querySelector(".music-titles .name");
const musicArtist = document.querySelector(".music-titles .artist");

// Playlist (Add your songs here)
const songs = [
  {
    name: "6 Shots - NEFFEX",
    artist: "NEFFEX",
    src: "music1.mp3",
    img: "img1.jpg"
  },
  {
    name: "Song 2",
    artist: "Artist 2",
    src: "music2.mp3",
    img: "img2.jpg"
  },
  {
    name: "Song 3",
    artist: "Artist 3",
    src: "music3.mp3",
    img: "img3.jpg"
  }
  
  
];

let songIndex = 0;
let isPlaying = false;
let isRepeat = false;
let isShuffle = false;

// Load song
function loadSong(index) {
  const song = songs[index];
  musicName.textContent = song.name;
  musicArtist.textContent = song.artist;
  musicImage.src = song.img;
  audio.src = song.src;
}

// Play song
function playSong() {
  isPlaying = true;
  audio.play();
  playPauseBtn.textContent = "pause";
}

// Pause song
function pauseSong() {
  isPlaying = false;
  audio.pause();
  playPauseBtn.textContent = "play_arrow";
}

// Next song
function nextSong() {
  if (isShuffle) {
    songIndex = Math.floor(Math.random() * songs.length);
  } else {
    songIndex = (songIndex + 1) % songs.length;
  }
  loadSong(songIndex);
  playSong();
}

// Previous song
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
}

// Repeat toggle
repeatBtn.addEventListener("click", () => {
  isRepeat = !isRepeat;
  repeatBtn.style.color = isRepeat ? "#0987f6" : "#4d4d4d";
});

// Shuffle toggle
shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.style.color = isShuffle ? "#0987f6" : "#4d4d4d";
});

// Event Listeners
playPauseBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Update progress bar
audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;

  // Update times
  currentTimeEl.textContent = formatTime(currentTime);
  durationTimeEl.textContent = duration ? formatTime(duration) : "0:00";
});

// Seek song
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

// When song ends
audio.addEventListener("ended", () => {
  if (isRepeat) {
    playSong();
  } else {
    nextSong();
  }
});

// Helper to format time
function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Initial load
loadSong(songIndex);
