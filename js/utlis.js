function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function startTimer() {
    gInterval = setInterval(function () {
        gGame.secsPassed = gGame.secsPassed + 11;
        elTimer.innerHTML = Math.floor(gGame.secsPassed / 1000);
    }, 10)
}