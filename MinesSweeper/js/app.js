'use strict'

var gBoard = []
var gCell = {
    minesAroundCount: 0,
    isShown: false,
    isMine: false,
    isMarked: true
}
var gLevel = {
    SIZE: 4,
    MINES: 2
};
var gIsGameOver = false;

const MINE_IMG = '<img src="img/mine.png">'
const FLAG_IMG = '<img src="img/flag.png">'

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function onInit() {
    gBoard = buildBoard();
}

function buildBoard() {
    var board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = gCell
        }

    }
    gBoard[3][3].isMine = true
    gBoard[1][0].isMine = true

    return board
}

function setMinesNegsCount() {

}

function renderBoard() {

    var strHTML = '<table><tbody>'
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gLevel.SIZE; j++) {
            var className = 'cell'
        }
        strHTML += '</tr>'
    }
        strHTML += '</tbody></table>'
    }

