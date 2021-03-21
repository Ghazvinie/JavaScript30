let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endDisplay = document.querySelector('.display__end-time');
const timerButtons = document.querySelectorAll('.timer__button');
const timerInput = document.querySelector('[name="customForm"]');
const pauseButton = document.querySelector('.pause__button');
const resumeButton = document.querySelector('.resume__button');
const resetButton = document.querySelector('.reset__button');

timerButtons.forEach(element => element.addEventListener('click', buttonFunc));
timerInput.addEventListener('submit', timerInputFunc);
pauseButton.addEventListener('click', pauseTimerFunc);
resumeButton.addEventListener('click', resumeTimerFunc);
resetButton.addEventListener('click', resetTimerFunc);

let timeLeftObject = {};

function timer (seconds) {
    if (isNaN(seconds))return;
    if(endDisplay.textContent === 'Timer Reset') return;
    clearInterval(countDown);

    const now = Date.now();
    const then = now + seconds * 1000;
    
    displayTimeLeft(seconds);
    displayEndTime(then);

    
    countDown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft < 0){
            clearInterval(countDown);
            return;
        }
        displayTimeLeft(secondsLeft);

    },1000);
}

function displayTimeLeft (seconds) {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor(seconds / 60 % 60);
    let secs = seconds % 60;
    timeLeftObject = {hrs, mins, secs};

    const displayTime = `${hrs < 10 ? '0' : ''}${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    timerDisplay.textContent = displayTime;
    // document.title = displayTime;
}

function displayEndTime (timeStamp) {
    const end = new Date(timeStamp);
    endDisplay.textContent = `End Time - ${end.getHours().toLocaleString('en-US',{minimumIntegerDigits: 2})}:${end.getMinutes().toLocaleString('en-US',{minimumIntegerDigits: 2})}`;
}

function buttonFunc (){
    timer(parseInt(this.dataset.time));
}

function timerInputFunc (event) {
    event.preventDefault();
    if (isNaN(this.minutes.value)){
        alert('You must enter a valid number');
        this.reset();
        return;
    }
    if (this.minutes.value < 1){
        alert('You must enter a value greater than 1');
        this.reset();
        return;
    }
    timer(this.minutes.value * 60);
    this.reset();
}

function pauseTimerFunc (event) {
    event.preventDefault();
    clearInterval(countDown);
    endDisplay.textContent = 'TIMER PAUSED';
}

function resumeTimerFunc (event) {
    event.preventDefault();
    const secondsLeft = (timeLeftObject.hrs * 3600) + (timeLeftObject.mins * 60) + timeLeftObject.secs;
    timer(secondsLeft);
}

function resetTimerFunc (event) {
    event.preventDefault();
    clearInterval(countDown);
    timer(0);
    endDisplay.textContent = 'Timer Reset';
    setTimeout(() => endDisplay.textContent = '00:00', 2000);
}

function countUp () {
    // if (isNaN(seconds))return;
    if(endDisplay.textContent === 'Timer Reset') return;
    clearInterval(countDown);


    endDisplay.textContent = `Stop Watch Mode`;
    let time = 0;
    let seconds = 0;
    let hours = 0;
    let minutes = 0;

    countDown = setInterval(() => {
        if (time > 3600000) return;
        time ++;
        seconds ++;
        minutes = Math.floor(time / 60 % 60);
        hours = Math.floor(seconds / 3600);
        if (seconds > 60){
            seconds = 0;
        }
        timerDisplay.textContent = `${hours < 1 ? '0' : 0}${hours}:${minutes < 60 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds % 60}`

    },1000);
}