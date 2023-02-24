const data = [
    {
        id: "1",
        name: "Lofi Study",
        artist: "FASSounds",
        cover: "23-51-43-941_200x200.jpg",
        file: "lofi-study-112191.mp3",
        genre: "hip hop",
        favorite: false
    },
    {
        id: "2",
        name: "Empty Mind",
        artist: "Lofi hour",
        cover: "21-42-13-13_200x200.jpg",
        file: "empty-mind-118973.mp3",
        genre: "lo-fi",
        favorite: false
    },
    {
        id: "3",
        name: "Aesthetics",
        artist: "SoulProdMusic",
        cover: "23-39-22-228_200x200.webp",
        file: "aesthetics-138637.mp3",
        genre: "lo-fi",
        favorite: true
    },
    {
        id: "4",
        name: "Sleep cat",
        artist: "Lofi hour",
        cover: "21-41-57-430_200x200.webp",
        file: "sleepy-cat-118974.mp3",
        genre: "folk",
        favorite: false
    },
    {
        id: "5",
        name: "SloMo",
        artist: "SoulProdMusic",
        cover: "00-37-49-501_200x200.jpg",
        file: "slomo-135807.mp3",
        genre: "lo-fi",
        favorite: true
    },
    {
        id: "6",
        name: "Untitled",
        artist: "Lofi hour",
        cover: "07-58-25-941_200x200.webp",
        file: "untitled-123636.mp3",
        genre: "lo-fi",
        favorite: false
    },
    {
        id: "7",
        name: "Sweet Love",
        artist: "DayFox",
        cover: "06-29-09-949_200x200.jpg",
        file: "sweet-love-121561.mp3",
        genre: "lo-fi",
        favorite: false
    },
    {
        id: "8",
        name: "Jazzy Hip Hop Boom Bap",
        artist: "Music Unlimited",
        cover: "16-09-57-489_200x200.webp",
        file: "jazzy-hip-hop-boom-bap-111861.mp3",
        genre: "lo-fi",
        favorite: false
    }
]

let current = 0

const audioPlayer = document.getElementById("audio-player")
const playlist = document.querySelector(".playlist")
const btnPlayPause = document.getElementById("player-play")


const setItemActive = (index) => {
    let items = document.querySelectorAll(".playlist-item")
    items.forEach( element => element.classList.remove("js-active"))
    items[index].classList.add("js-active")
}

const setPlayerItem = (index) => {
    let audio = data[index]
    document.querySelector(".player-title").innerHTML = `${audio.name}<small>${audio.artist}</small`
    document.querySelector(".player-cover").src = `./cover/${audio.cover}`
    audioPlayer.src = `./music/${audio.file}`
    setItemActive(index)
}

const playItem = (index) => {
    let audio = data[index]
    document.querySelector(".player-title").innerHTML = `${audio.name}<small>${audio.artist}</small`
    document.querySelector(".player-cover").src = `./cover/${audio.cover}`
    audioPlayer.src = `./music/${audio.file}`
    audioPlayer.play()
    btnPlayPause.classList.add("js-playing")
    setItemActive(index)
    current = index
}

const playPause = () => {
    if (audioPlayer.paused) {
        audioPlayer.play()
    } else {
        audioPlayer.pause()
    }
    btnPlayPause.classList.toggle("js-playing")
}

audioPlayer.addEventListener("ended", () => {
    playNext()
})

const playNext = () => {
    if (current < (data.length - 1)) {
        current++
    } else {
        current = 0
    } 
    playItem(current)
    setItemActive(current)
}

const playPrev = () => {
    if (current > 0) {
        current--
    } else {
        current = data.length - 1
    } 
    playItem(current)
    setItemActive(current)
}

const renderItem = (audio, index) => {
    let item = `<li class="playlist-item">
                    <span class="playlist-index">${index + 1}</span>
                    <button class="favorite ${audio.favorite && "mark"}" onclick="setFavorite(${index})"></button>
                    <img src="./cover/${audio.cover}" class="playlist-cover">
                    <span class="playlist-title">
                        ${audio.name}
                        <small>${audio.artist}</small>
                    </span>
                    <div class="playlist-genre">${audio.genre}</div>
                    <button class="control sm js-item-play" onclick="playItem(${index})">
                        <i class="fa-solid fa-play" style="translate: 1px;"></i>
                    </button>
                </li>`
    return item
}

const setFavorite = (index) => {
    data[index].favorite = !data[index].favorite
    renderList(data)
}

const renderList = (data) => {
    playlist.innerHTML = ""
    data.map( (audio, index) => {
        playlist.innerHTML += renderItem(audio, index)
    })
}

const getAudioProgress = () => {
    let total = audioPlayer.duration
    let current = audioPlayer.currentTime
    return Math.floor((100 * current) / total) + "%"
}

const getAudioTime = () => {
    let total = audioPlayer.duration
    let totalInMinutes = `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(Math.floor(total % 60)).padStart(2, '0')}`

    let current = audioPlayer.currentTime
    let currentInMinutes = `${String(Math.floor(current / 60)).padStart(2, '0')}:${String(Math.floor(current % 60)).padStart(2, '0')}`
    return `${currentInMinutes} - ${totalInMinutes}`
}

let audioInterval = setInterval( () => {
    document.querySelector(".player-time").textContent = getAudioTime()
    document.querySelector(".player-progress").style.setProperty('--progress', getAudioProgress())
}, 1000)


document.addEventListener("DOMContentLoaded", () => {
    renderList(data)
    setPlayerItem(current)
})