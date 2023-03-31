'use strict'

var gBoard = []
var gCell;
var gLevel = {
    SIZE: 4,
    MINES: 2
};
var gIsGameOver = false;

const MINE = '💣'
const FLAG = '🚩'

var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function onInit() {
    gBoard = buildBoard();
    renderBoard(gBoard);
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
    //setting two cells as mines
    //board[3][3].isMine = true
    board[1][1].isMine = true
    setMinesNegsCount(board)

    return board
}

function setMinesNegsCount(board) {
    const rowCount = board.length;
    const colCount = board[0].length;
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
    /*
        var strHTML = '<table><tbody>'
        for (var i = 0; i < gLevel.SIZE; i++) {
            strHTML += '<tr>';
            for (var j = 0; j < gLevel.SIZE; j++) {
                //var cell = gBoard[i][j]
                var className = `cell cell-${i}-${j}`
                strHTML += `<td class="${className}" onclick="select(event)">${''}</td>`
            }
            strHTML += '</tr>'
        }
        strHTML += '</tbody></table>'
        const elContainer = document.querySelector('.board-container')
        elContainer.innerHTML = strHTML
        */
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
    if (!gGame.isOn) return
    if (gBoard[i][j].isMarked || gBoard[i][j].isShown) return
    gBoard[i][j].isShown = true
    elCell.classList.add("shown")
    gGame.shownCount++
    if (gBoard[i][j].isMine) {
        elCell.innerHTML = MINE
        gameOver()
    } else {
        elCell.innerText = gBoard[i][j].minesAroundCount;
        checkGameOver();
        expandShown(i, j)
    }
}


function onCellMarked(elCell, i, j) {
    const cell = gBoard[i][j]
    if (cell.isShown) return
    if (!gGame.isOn) return
    if (!cell.isMarked) {
        gGame.markedCount++
        elCell.classList.add('marked')
        cell.isMarked = true
        elCell.innerHTML = FLAG
    } else {
        gGame.markedCount--
        elCell.classList.remove('marked')
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
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (board[i][j].isMine && board[i][j].isShown)
                return 'lose'
            if (!(board[i][j].isMine) && board[i][j].isShown)
                countNotMine++
        }
    }
    if (countNotMine + gLevel.MINES === gLevel.SIZE ** 2) return 'win'
    return 'continue'
}

