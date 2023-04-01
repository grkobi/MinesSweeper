function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
/*
function startTimer() {
        gStartTimer = Date.now();
        gGameIntreval = setInterval(function () {
            gGame.secsPassed = +((Date.now() - gStartTimer) / 1000).toFixed(2);
            gElTimer.innerText = gGame.secsPassed;
        }, 300);
    }
*/

function startTime(){
    var startTime = Date.now()
    var elTimer = document.querySelector('.timer')
    gTimerInterval = setInterval(() => {
        const diff = Date.now() - startTime
        elTimer.innerText = (diff / 1000).toFixed(3)
    }, 10)
}