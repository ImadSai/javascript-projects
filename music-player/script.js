const songImg = document.getElementById('songImg');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const previousBtn = document.getElementById('previous');
const forwardBtn = document.getElementById('forward');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const duration = document.getElementById('duration');

// Songs list
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design / Tiesto'
    },
    {
        name: 'jacinto-3',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design / David Guetta'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric / Jacinto Design'
    }
]

// Audio State
let isPlaying = false;
let songsIndex = 0;

// Play
function playSong() {
    isPlaying = true;
    audio.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
}

// Pause
function pauseSong() {
    isPlaying = false;
    audio.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}

// Previous
function previousSong() {
    progress.style.width = '0%';
    if (songsIndex === 0) {
        return;
    }
    songsIndex--;
    loadSong(songs[songsIndex]);
}

// Forward
function forwardSong() {
    progress.style.width = '0%';
    songsIndex = ((songsIndex + 1) === songs.length) ? 0 : songsIndex + 1;
    loadSong(songs[songsIndex]);
}

// Update Progress Bar
function updateProgressBar(event) {
    if (isPlaying) {
        const { duration, currentTime } = event.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        currentTimeEl.textContent = formatDurationToTime(currentTime);
    }
}

// Load Song
function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = `music/${song.name}.mp3`;
    songImg.src = `img/${song.name}.jpg`;

    if (isPlaying) {
        audio.play();
    } else {
        audio.pause();
    }
}

// Format Duration To Time
function formatDurationToTime(duration) {

    // Minutes
    let durationMinutes = Math.floor(duration / 60);
    if (durationMinutes < 10) {
        durationMinutes = `0${durationMinutes}`;
    }

    // Seconds
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }

    return `${durationMinutes}:${durationSeconds}`;
}

// Set audio current Time
function setAudioCurrentTime(event) {
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const { duration } = audio;
    audio.currentTime = (clickX * duration) / width;
    currentTimeEl.textContent = formatDurationToTime(audio.currentTime);
    progress.style.width = `${(clickX * 100) / width}%`;
}

// Handle Play Pause Song
const handlePlayPauseSong = () => (isPlaying ? pauseSong() : playSong());

// Init 
loadSong(songs[songsIndex]);

// Interactive Events
playBtn.addEventListener('click', handlePlayPauseSong);
previousBtn.addEventListener('click', previousSong);
forwardBtn.addEventListener('click', forwardSong);
progressContainer.addEventListener('click', setAudioCurrentTime);

// Audio Events
audio.addEventListener('timeupdate', updateProgressBar);
audio.addEventListener('ended', forwardSong);
audio.onloadedmetadata = function () {
    duration.textContent = formatDurationToTime(audio.duration);
};