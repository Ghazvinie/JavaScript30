let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endDisplay = document.querySelector('.display__end-time');
const timerButtons = document.querySelectorAll('.timer__button');
const timerInput = document.querySelector('[name="customForm"]');
const pauseButton = document.querySelector('.pause__button');

timerButtons.forEach(element => element.addEventListener('click', buttonFunc));
timerInput.addEventListener('submit', timerInputFunc);
pauseButton.addEventListener('click', pauseTimerFunc);

function timer (seconds) {
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
    const displayTime = `${hrs < 10 ? '0' : ''}${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    timerDisplay.textContent = displayTime;
    document.title = displayTime;
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
