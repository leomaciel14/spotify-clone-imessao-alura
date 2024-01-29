// SCRIPT PARA A BARRA DE PESQUISA //

// Declarando as variáveis que pegam os elementos do HTML
const searchInput = document.getElementById('search-input');
const resultsArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');
const oldContainer = document.getElementById('resultados-padrao');
const clearButton = document.getElementById('button_cancelar');
const progresso = document.getElementById("progresso");
const audioPlayer = new Audio();

let results;

// Variáveis globais para armazenar os dados do player
let currentPlayerData = {
    coverImg: "",
    title: "",
    artist: "",
    musicUrl: ""
};

// Prepara a função para esconder os resultados da pesquisa
function hidePlaylists() {
    resultPlaylist.classList.add("hidden");
}

// Localiza a API e prepara para pegar os resultados da pesquisa
function requestApi(searchTerm) {
    fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
    .then((response) => response.json())
    .then((apiResults) => {
    results = apiResults;
    displayResults(results);
    });
}

// Organiza em variáveis os resultados recebidos pela API e joga para o HTML
function displayResults(results) {
    hidePlaylists();

  // Se a pesquisa tem resultado, insere os dados no player.
    if (Array.isArray(results) && results.length > 0 && "music" in results[0]) {
    const firstArtist = results[0];

    // Atualiza os dados do player globalmente
    currentPlayerData = {
    coverImg: firstArtist.coverImg,
    title: firstArtist.title,
    artist: firstArtist.name,
    musicUrl: firstArtist.music
    };

    // Preenche os dados no card de pesquisa
    const artistImage = document.getElementById("artist-img");
    const artistName = document.getElementById("artist-name");
    const artistGenre = document.getElementById("artist-genre");

    artistImage.src = firstArtist.urlImg;
    artistName.innerText = firstArtist.name;
    artistGenre.innerText = firstArtist.genre;
    }
}

// Adiciona um observador na entrada de texto, quando algo é digitado e a API retorna algum resultado...
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

// Variável com a função de reiniciar o estado de exibição dos cards
const resetBase = function () {
    oldContainer.classList.remove("hidden");
    resultsArtist.classList.add("hidden");
    requestApi([]);
}

// Aqui é a função para que o botão de X funcione excluindo a pesquisa com um clique
clearButton.addEventListener("click", function () {
    searchInput.value = "";
    resetBase([]);
    // Remove a classe 'loading' após um atraso
    setTimeout(function () {
        progresso.classList.remove("loading");

        // Adiciona a classe 'loading' após
        setTimeout(function () {
            progresso.classList.add("loading");
        }, 50);

    }, 50);
});



// Adiciona um evento de clique ao botão de reprodução fora da função displayResults
document.getElementById("playButton").addEventListener("click", function () {
    var mediaPlayer = document.getElementById("Media-Player");
    mediaPlayer.classList.add("show");

    // Verifica se há resultados e se o primeiro resultado tem a tag "music"
    if (Array.isArray(results) && results.length > 0 && "music" in results[0]) {
        // Cria uma nova instância de áudio para cada reprodução
        const audioPlayer = new Audio();
        const musicUrl = currentPlayerData.musicUrl;

        // Define a origem da música
        audioPlayer.src = musicUrl;

        // Inicia a reprodução
        audioPlayer.play().catch(error => {
            console.error("Erro ao reproduzir a música:", error);

            progresso.classList.remove("loading");
            progresso.classList.add("loading");
        });

        // Atualiza os elementos do player com os dados armazenados
        const currentCover = document.getElementById("current-cover");
        const currentTitle = document.getElementById("current-title");
        const currentArtist = document.getElementById("current-artist");

        currentCover.src = currentPlayerData.coverImg;
        currentTitle.innerText = currentPlayerData.title;
        currentArtist.innerText = currentPlayerData.artist;

        // Encontre o botão de pausa pelo ID
        const pauseButton = document.getElementById("pauseButton");

        // Verifica se o botão de pausa foi encontrado antes de adicionar o evento de clique
        if (pauseButton) {
            // Adiciona um evento de clique ao botão de pausa
            pauseButton.addEventListener("click", function () {
                // Pausa a reprodução se estiver tocando, ou retoma se estiver pausado
                if (audioPlayer.paused) {
                    audioPlayer.play().catch(error => {
                        console.error("Erro ao retomar a música:", error);
                    });
                } else {
                    audioPlayer.pause();
                }
            });
        } else {
            console.error("Botão de pausa não encontrado.");
        }

        // Lógica para adicionar a classe 'loading' à barra de progresso
        const bar2Element = document.getElementById("progresso");
        bar2Element.classList.add("loading");

        // Lógica para atualizar a barra de status conforme necessário
        // ...
    } else {
        console.error("Nenhum resultado válido encontrado para reprodução.");
    }
});