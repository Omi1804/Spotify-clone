console.log('Hello')

//Initialise the Variables
let songIndex = 0;
let masterSongName = document.getElementById('masterSongName');
let audioElement = new Audio('songs/1.mp3')
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'))
let songs = [
    { songName: 'Hey Baby', filePath: 'songs/1.mp3', coverPath: 'covers/1.jpg' },
    { songName: 'Kaho na Pyar hai', filePath: 'songs/2.mp3', coverPath: 'covers/2.jpg' },
    { songName: 'Papi', filePath: 'songs/3.mp3', coverPath: 'covers/3.jpg' },
    { songName: 'Jeena hai', filePath: 'songs/4.mp3', coverPath: 'covers/4.jpg' },
    { songName: 'Dil diya hai', filePath: 'songs/5.mp3', coverPath: 'covers/5.jpg' },
    { songName: 'Pagal kr diya', filePath: 'songs/6.mp3', coverPath: 'covers/6.jpg' },
    { songName: 'Di ke Bhos', filePath: 'songs/7.mp3', coverPath: 'covers/7.jpg' },
    { songName: 'Jaane meri Jaane Mann', filePath: 'songs/8.mp3', coverPath: 'covers/8.jpg' },
    { songName: 'Papa khte hai', filePath: 'songs/9.mp3', coverPath: 'covers/9.jpg' }
]
songItem.forEach((element, i) => {
    element.getElementsByClassName('songName')[0].innerHTML = songs[i].songName
    element.getElementsByTagName('img')[0].src = songs[i].coverPath
})

//audioElement.play()

//Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play')
        masterPlay.classList.add('fa-pause')
        gif.style.opacity = 1
    }
    else if (audioElement.play) {

        gif.style.opacity = 0
        masterPlay.classList.remove('fa-pause')
        masterPlay.classList.add('fa-play')
        audioElement.pause();
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate')
    //update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100
})

const makeAllPlays = () => {

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-play')
        element.classList.remove('fa-pause')
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id)
        if (audioElement.paused) {
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            audioElement.src = `songs/${songIndex + 1}.mp3`
            audioElement.currentTime = 0;
            audioElement.play();
        }
        else if(audioElement.play)
        {
            e.target.classList.add('fa-play');
            e.target.classList.remove('fa-pause');
            audioElement.src = `songs/${songIndex + 1}.mp3`
            audioElement.currentTime = 0;
            audioElement.pause();
        }
        masterPlay.classList.remove('fa-play')
        masterPlay.classList.add('fa-pause')
        masterSongName.innerText = songs[songIndex].songName;
        gif.style.opacity = 1
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play')
    masterPlay.classList.add('fa-pause')
    masterSongName.innerText = songs[songIndex].songName;
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play')
    masterPlay.classList.add('fa-pause')
    masterSongName.innerText = songs[songIndex].songName;
})
