const tileDisplay = document.querySelector('.tiles-container');
const keyBoard = document.querySelector('.key-container');
const messageDisplay = document.querySelector('.msg-container')

const wordle = "SATYAM"

const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '<<',
]

const guessRows = [
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
]

let currentRow = 0;
let currentTile = 0;
isGameOver = false;


guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElm = document.createElement('div');
    rowElm.setAttribute("id", "guessRow-" + guessRowIndex);
    guessRow.forEach((guess, guessIndex) => {
        const tileElm = document.createElement('div');
        tileElm.setAttribute("id", "guessRow" + guessRowIndex + "tile-" + guessIndex);
        rowElm.append(tileElm)
    })
    tileDisplay.append(rowElm)
})


keys.forEach(key => {
    const btnElm = document.createElement('button')
    btnElm.textContent =  key
    btnElm.setAttribute('id', key)
    btnElm.addEventListener('click',() => handleClick(key))
    keyBoard.append(btnElm);
})



const handleClick = (key) => {
    console.log('clicked', key)

    if(key === '<<') {
        console.log("delete")
        deleteBtn();
        console.log('guessRows', guessRows)

        return
    }
    if(key === 'ENTER') {
        checkRow();
        console.log('guessRows', guessRows)
        return
    }
    addLetter(key)
    console.log('guessRows', guessRows)

};

const addLetter = (letter) => {
    if (currentTile < 6 && currentRow < 6) {

        const tile = document.getElementById('guessRow'+ currentRow + "tile-" + currentTile);
        tile.innerText = letter;
        guessRows[currentRow][currentTile] = letter;
        tile.setAttribute('data', letter)
        currentTile++;
    }
}

const deleteBtn = () => {
    if(currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow'+ currentRow + "tile-" + currentTile);
        tile.innerText = "";
        guessRows[currentRow][currentTile] = ""
        tile.setAttribute('data', "");

    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')

    if(currentTile > 5) {
        console.log("guess is " + guess, "wordle is-" + wordle)
        flipTile();
        if(wordle === guess) {
            showMessage('Correct Answer !');
            isGameOver = true
            return
        } else if(currentRow >=6 ) {
            isGameOver = false;
            showMessage('Game Over')
            return
        }
        if(currentRow < 6) {
            currentRow++;
            currentTile = 0;
        }
    }
}

const showMessage = (message) => {
    const messageElm = document.createElement('p')
    messageElm.textContent = message
    messageDisplay.append(messageElm)
    setTimeout(() => messageDisplay.removeChild(messageElm), 4000)
}

const flipTile = () => {

    setTimeout(() => {
        const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
        rowTiles.forEach((tile, index) => {
            const dataLetter = tile.getAttribute('data')
            if(dataLetter == wordle[index]) {
                tile.classList.add('blue-overlay')
            } else if(wordle.includes(dataLetter)) {
                tile.classList.add('yellow-overlay')
            } else {
                tile.classList.add('red-overlay')
            }
        })

    }, 500)
}