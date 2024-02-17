const timerDisplay = document.querySelector('.timerDisplay')
const totalCycles = document.querySelector('.total-cycles')
const startBtn = document.querySelector('.start-btn')
const pauseBtn = document.querySelector('.pause-btn')
const resetBtn = document.querySelector('.reset-btn')


// POMODORO



const defaultTimerSettings = {
  timer : 1,
  shortBreak : 5,
  longBreak : 60,
  totalCycles: 4,
  currentStatus : 'pomodoro'
}

let durationInSeconds = defaultTimerSettings.timer * 60
let minutes, seconds
let isPaused = false


minutes = defaultTimerSettings.timer 
seconds = (defaultTimerSettings.timer * 60) % 60

countdownDisplay(minutes, seconds)

function startTimer() {
  
  const interval = setInterval(() => {
    minutes = Math.floor(durationInSeconds / 60)
    seconds = durationInSeconds % 60
    
    if(isPaused) {
      clearInterval(interval)
    }

    countdownDisplay(minutes, seconds)
    durationInSeconds--
    
    
    if (durationInSeconds < 0) {
      durationInSeconds = 0
      clearInterval(interval)
      disableStartBtn(false)
    }
    
    
  }, 100)
}

function countdownDisplay(min, sec) {
  if (min < 10) min = '0' + minutes
  if (sec < 10 && seconds >= 0) sec = '0' + sec
    
  return timerDisplay.innerHTML = `${min}:${sec}`
}

function disableStartBtn(hasStarted) {
  if (hasStarted) {
    startBtn.disabled = true
  }else {
    startBtn.disabled = false
  }
}

startBtn.addEventListener('click', (e) => {
  if(e) {
    disableStartBtn(true)
    startTimer()
    isPaused = false
  }
})

pauseBtn.addEventListener('click', () => {
  disableStartBtn(false)
  isPaused = true
})


