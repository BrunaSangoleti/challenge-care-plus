// 1. Inicializar o mapa focado em SP (Av. Paulista)
const map = L.map('map').setView([-23.561, -46.655], 15);

// 2. Carregar as "telhas" (o desenho do mapa) do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 3. Criar o marcador (Pin) inicial
let marker = L.marker([-23.561, -46.655]).addTo(map)
    .bindPopup('Unidade Paulista CarePlus')
    .openPopup();

// 4. Objeto com as coordenadas das suas unidades CarePlus
// 1. Banco de dados de coordenadas (Exemplos reais de SP)
const locaisUnidades = {
    "paulista": {
        coords: [-23.5614, -46.6559],
        nome: "Unidade Paulista CarePlus"
    },
    "faria_lima": {
        coords: [-23.5891, -46.6822],
        nome: "Unidade Faria Lima CarePlus"
    },
    "itaim": {
        coords: [-23.5837, -46.6775],
        nome: "Unidade Itaim CarePlus"
    }
};

// 2. Referência ao Select
const selectUnidade = document.getElementById('select-unidade');

// 3. Escutador de Eventos (Listener)
selectUnidade.addEventListener('change', function () {
    const chaveUnidade = this.value; // Pega o valor selecionado (ex: "itaim")
    const unidadeEncontrada = locaisUnidades[chaveUnidade];

    if (unidadeEncontrada) {
        const novaPosicao = unidadeEncontrada.coords;

        // Move o foco do mapa com animação suave
        map.flyTo(novaPosicao, 16);

        // Move o Pin (marcador) para a nova coordenada
        marker.setLatLng(novaPosicao)
            .setPopupContent(`<strong>${unidadeEncontrada.nome}</strong><br>Pronta para te atender!`)
            .openPopup();
    }
});