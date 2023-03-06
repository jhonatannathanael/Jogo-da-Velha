// Initial Data ================
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let player = '';
let  warning = '';
let playing = false;

 reset()

// Events ================
// Botão de reset
document.querySelector('.reset').addEventListener('click', reset);
// Pecorrendo todos os itens e adicionando um e adicionando um evento de clik.
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
})

// Functions ================
// Verificando qual elemento foi clicado
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if(playing && square[item] === '') {
        square[item] = player;
        renderSquare();
        togglePlayer();
    }
}

// Função para limpar tudo
function reset() {
// Limpar avisos
    warning = '';
// Escolher quem joga
    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'x' : 'o';
// OU 
// if (random === 0) {
    //     player = "x";
// } else {
    //     player = "o";
// }

// Limpar o quadro
    for(let i in square) {
        square[i] = '';
    }

    playing = true;

    renderSquare();
    renderInfo();

}

// Percorre o quadro e põe lá no HTML, caso não tenha nada, não põe nada 
function renderSquare() {
    for(let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }

    checkGame();
}

// Responsavel por pegar duas variaveis (player e warning) e colocar no HTML
function renderInfo() { 
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

// Função para alternar de quem é a vez, O ou X
function togglePlayer() {
    player = (player === 'x') ? 'o' : 'x';
    renderInfo(); 
}

// Verificando quem foi que ganhou
function checkGame() {
    if(checkWinnerFor('x')) {
        warning = 'O "x" venceu';
        playing = false;
    } else if(checkWinnerFor('o')) {
        warning = 'O "o" venceu';
        playing =false; 
    } else if(isFull()) {
        warning = 'Deu empate';
        playing = false;
    }
}

// Array com todas posibilidade de vitoria
function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1',
    ];

    for(let w in pos) {
        let pArray = pos[w].split(','); // a1, a2, a3
        let hasion =pArray.every(opition => square[opition] === player);
        if(hasion) {
            return true;
        }
    }

    return false;
}

// Verificando se todos estão vazio
function isFull() {
    for(let i in square) {
        if(square[i] === '') {
            return false;
        }
    }

    return true;
}