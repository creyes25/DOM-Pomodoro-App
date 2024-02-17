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

let timerInSeconds = defaultTimerSettings.timer * 60
let shortBreakInSec = defaultTimerSettings.shortBreak * 60
let longBreakInSec = defaultTimerSettings.longBreakBreak * 60

let minutes, seconds
let isPaused, isReset = false


countdownDisplay(timerInSeconds)

function startTimer() {
  const interval = setInterval(() => {
    
    if(isPaused) {
      clearInterval(interval)
    }
    
    if(isReset) {
      clearInterval(interval)
      resetTimer()
    }

    countdownDisplay(timerInSeconds)
    timerInSeconds--
    
    if (timerInSeconds < 0) {
      timerInSeconds = 0
      clearInterval(interval)
      disableStartBtn(false)
    }
    
    
    
  }, 1000)
}

function resetTimer() {
  timerInSeconds = defaultTimerSettings.timer * 60
  countdownDisplay(timerInSeconds)
  isPaused, isReset = false

}

function countdownDisplay(timer) {
  minutes = Math.floor(timer / 60)
  seconds = timer % 60

  if (minutes < 10) minutes = '0' + minutes
  if (seconds < 10 && seconds >= 0) seconds = '0' + seconds
    
  return timerDisplay.innerHTML = `${minutes}:${seconds}`
}

function disableStartBtn(hasStarted) {
  if (hasStarted) {
    startBtn.disabled = true
  }else {
    startBtn.disabled = false
  }
}




// POMODORO Event Listeners
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

resetBtn.addEventListener('click', ()=> {
  isReset = true
  disableStartBtn(false)
  if(isPaused) {
    console.log(isPaused)
    resetTimer()
  }
})


