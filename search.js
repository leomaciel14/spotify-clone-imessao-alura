// SCRIPT PARA A BARRA DE PESQUISA //

// Declarando as variaveis que pegam os elementos do HTML
const searchInput = document.getElementById('search-input');
const resultsArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');
const oldContainer = document.getElementById('resultados-padrao');
const clearButton = document.getElementById('button_cancelar');

// Prepara a função para esconder os resultados da pesquisa
function hidePlaylists() {
    resultPlaylist.classList.add("hidden");
}

// Localiza a API e prepara para pegar os resultados da pesquisa
function requestApi(searchTerm) {
    fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
    .then((response) => response.json())
    .then((results) => displayResults(results));
}

// Organiza em variaveis os resultados recebidos pela API e joga para o HTML
function displayResults(results) {
    hidePlaylists();
    const artistImage = document.getElementById("artist-img");
    const artistName = document.getElementById("artist-name");
    const artistGenre = document.getElementById("artist-genre")

    // Se a pesquisa tem resultado, insere os dados no card.
    if (results.length > 0) {
        const firstArtist = results[0];
        artistImage.src = firstArtist.urlImg;
        artistName.innerText = firstArtist.name;
        artistGenre.innerText = firstArtist.genre;
    }
}

// Adiciona um observador na entrada de texto, quando algo é digitado e a API retorna algum resultado:...
document.addEventListener('input', function () {
    const searchTerm = searchInput.value.trim().toLowerCase();
    // Esconde os card base e mostra o card da pesquisa com o resultado
    if (searchTerm === "") {
        oldContainer.classList.remove("hidden");
        resultsArtist.classList.add("hidden");
    // Quando apaga reverte o estado e chama novamente a da API para pesquisa.
    } else {
        resultsArtist.classList.remove("hidden");
        oldContainer.classList.add("hidden");
        requestApi(searchTerm);
    }
});

// Variavel com a função de reiniciar o estado de exibição dos cards
const resetBase = function () {
    oldContainer.classList.remove("hidden");
    resultsArtist.classList.add("hidden");
    requestApi([]);
}

// Aqui é a função para que o botão de X funcione excluindo a pesquisa com um click
clearButton.addEventListener("click", function () {
    searchInput.value = "";
    resetBase([]);
});




// Adiciona um evento de clique ao botão de reprodução fora da função displayResults
document.getElementById("playButton").addEventListener("click", playMusic);

// Função para reproduzir música
function playMusic() {
    // Crie um elemento de áudio
    const audioPlayer = new Audio();

    // Define a URL da música
    const musicUrl = "./assets/Everlong.mp3"; // Substitua pela URL real da música

    // Define a origem da música
    audioPlayer.src = musicUrl;

    // Inicia a reprodução
    audioPlayer.play().catch(error => {
        console.error("Erro ao reproduzir a música:", error);
    });
}

