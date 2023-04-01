'use strict'

var gBoard = []
var gCell;
var gLevel = {
    SIZE: 4,
    MINES: 2
};
//var gIsGameOver = false;
var gLivesCount = 3
var isFirstClick = true

const MINE = '💣'
const FLAG = '🚩'
var elTimer = document.querySelector('.timer')

var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function onInit() {
    gGame.isOn = true,
    gBoard = buildBoard();
    renderBoard(gBoard);
    elTimer.innerHTML = '0';
}

function buildBoard() {
    const board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            const cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            };
            board[i].push(cell)
        }

    }
    var mineSum = 0
    // Putting mines in random positions
    while (mineSum < gLevel.MINES) {
        var randMinePosRow = getRandomInt(0, gLevel.SIZE)
        var randMinePosCol = getRandomInt(0, gLevel.SIZE)
        if(board[randMinePosRow][randMinePosCol].isMine) continue
        board[randMinePosRow][randMinePosCol].isMine = true
        mineSum++
    }

    //setting two cells as mines
    //board[3][3].isMine = true
    //board[1][1].isMine = true
    setMinesNegsCount(board)

    return board
}

function setMinesNegsCount(board) {
    const rowCount = board.length;
    const colCount = board[0].length;
    //Nested loops: Checking in each cell if there's a mine in each of the surrounding cells
    for (var row = 0; row < rowCount; row++) {
        for (var col = 0; col < colCount; col++) {
            for (var i = Math.max(0, row - 1); i <= Math.min(row + 1, rowCount - 1); i++) {
                for (var j = Math.max(0, col - 1); j <= Math.min(col + 1, colCount - 1); j++) {
                    if (!(i === row && j === col)) {
                        if (board[i][j].isMine) {
                            board[row][col].minesAroundCount++
                        }
                    }
                }

            }

        }

    }
    return board
}

/*
function setMinesNegsCount(board, rowIdx, colIdx) {
    var minesAroundCount = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (i === rowIdx && j === colIdx) continue
            const currCell = board[i][j]
            if (currCell.isMine === true) minesAroundCount++
        }
    }
    return minesAroundCount
}
*/

function renderBoard(board) {
    var strHTML = '<tbody>'
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < gLevel.SIZE; j++) {
            var className = `cell cell-${i}-${j}`
            strHTML += `<td onclick="onCellClicked(this,${i},${j})" onContextMenu="onCellMarked(this,${i},${j});return false" class="${className}"></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody>'

    const elContainer = document.querySelector('table')
    elContainer.innerHTML = strHTML
}


function onCellClicked(elCell, i, j) {
    var elRes;
    var elBtn;
    var gameResult;
    if (!gGame.isOn) return
    //clearInterval(gInterval);
   // startTimer()
    if (gBoard[i][j].isMarked || gBoard[i][j].isShown) return
    gBoard[i][j].isShown = true
    //elCell.classList.add("shown")
    gGame.shownCount++
    gameResult = checkGameOver(gBoard)
    if (gBoard[i][j].isMine) {
        elCell.innerHTML = MINE
        gLivesCount--
        //        gameResult = checkGameOver(gBoard)
        if (gameResult === 'lose') {
            gGame.isOn = false;
            elRes = document.querySelector('.game-over-lose')
            elRes.classList.remove('hide')
            elBtn = document.querySelector('.start-over')
            elBtn.classList.remove('hide')
        }
    } else {
        elCell.innerText = gBoard[i][j].minesAroundCount;
        //   gameResult = checkGameOver(gBoard)
        if (gameResult === 'win') {
            elRes = document.querySelector('.game-over-win')
            elRes.classList.remove('hide')
            elBtn = document.querySelector('.start-over')
            elBtn.classList.remove('hide')
            console.log('win')
            expandShown(i, j)
        }
    }
}


function onCellMarked(elCell, i, j) {
    const cell = gBoard[i][j]
    if (cell.isShown) return
    if (!gGame.isOn) return
    if (!cell.isMarked) {
        gGame.markedCount++
        // elCell.classList.add('marked')
        cell.isMarked = true
        elCell.innerHTML = FLAG
    } else {
        gGame.markedCount--
        //elCell.classList.remove('marked')
        cell.isMarked = false
        elCell.innerHTML = ''
    }
    return false
}

function expandShown(i, j) {
    var cellI = i
    var cellJ = j
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gLevel.SIZE) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gLevel.SIZE) continue
            if (!gBoard[i][j].isShown && !gBoard[i][j].isMarked && !gBoard[i][j].isMine) {
                const neighbour = document.querySelector(`.cell-${i}-${j}`);
                onCellClicked(neighbour, i, j);
            }
        }
    }
}

function checkGameOver(board) {
    var countNotMine = 0;
    var gameResult;
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (board[i][j].isMine && board[i][j].isShown) {
                gameResult = 'lose'
                return gameResult
            }
            if (!(board[i][j].isMine) && board[i][j].isShown)
                countNotMine++
        }
    }
    console.log(countNotMine)
    if (countNotMine + gLevel.MINES === gLevel.SIZE ** 2) {
        gameResult = 'win'
        return gameResult

    }
    //gameResult = 'continue'
    //return gameResult
}

function changeLevel(level, mines) {
    gLevel.SIZE = level
    gLevel.MINES = mines
    onInit()
}

function restartGame() {
    const elBtn = document.querySelector('.start-over')
    elBtn.classList.add('hide')
    var gameRes = checkGameOver(gBoard)
    if (gameRes === 'lose') {
        const el = document.querySelector('.game-over-lose')
        el.classList.add('hide')
    } else {
        const el = document.querySelector('.game-over-win')
        el.classList.add('hide')
    }
    onInit()
}


