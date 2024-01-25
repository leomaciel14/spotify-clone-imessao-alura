const searchInput = document.getElementById('search-input');
const resultsArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');
const playlistContainer = document.getElementById('playlist-container');

function requestApi(searchTerm) {
    fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
    .then((response) => response.json())
    .then((results) => displayResults(results));
}

function displayResults(results) {
    hidePlaylists();
    const artistImage = document.getElementById("artist-img");
    const artistName = document.getElementById("artist-name");

    if (results.length > 0) {
        const firstArtist = results[0];
        artistImage.src = firstArtist.urlImg;
        artistName.innerText = firstArtist.name;
        // Corrija a linha abaixo
        document.getElementById("result-artist").classList.remove("hidden");
    } else {
        // Corrija a linha abaixo
        document.getElementById("result-artist").classList.add("hidden");
    }
}


function hidePlaylists() {
    playlistContainer.classList.add("hidden");
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.trim().toLowerCase();  // Remover espaços extras e tornar minúsculo
    if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    } else {
    requestApi(searchTerm);
    }
});
