let startTime;
let updatedTime;
let difference;
let tInterval;
let lapInterval;
let running = false;
let lapCounter = 1;

function startTimer() {
    if (!running) {
        running = true;
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 10); // Update interval to 10ms for more accuracy
        lapInterval = setInterval(addLap, 30000); // Set interval for 30 seconds
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((difference / (1000 * 60)) % 60);
    let seconds = Math.floor((difference / 1000) % 60);
    let milliseconds = Math.floor((difference % 1000) / 10); // Getting the first two digits of milliseconds
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;
    document.getElementById('time').innerHTML = hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

function pauseTimer() {
    clearInterval(tInterval);
    clearInterval(lapInterval);
    running = false;
}

function resetTimer() {
    clearInterval(tInterval);
    clearInterval(lapInterval);
    running = false;
    document.getElementById('time').innerHTML = "00:00:00.000";
    lapCounter = 1;
    document.getElementById('lap-list').innerHTML = "";
}

function addLap() {
    if (running) {
        const lapTime = document.getElementById('time').innerHTML;
        const lapList = document.getElementById('lap-list');
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `<span class="lap-number">Lap ${lapCounter}:</span> <span class="lap-time">${lapTime}</span>`;
        lapList.appendChild(lapItem);
        lapCounter++;
    }
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
