const timerDisplay = document.querySelector('.timerDisplay')
const currentCycle = document.querySelector('.current-cycle')
const cyclesTotal = document.querySelector('.total-cycles')
const startBtn = document.querySelector('.start-btn')
const pauseBtn = document.querySelector('.pause-btn')
const resetBtn = document.querySelector('.reset-btn')


// POMODORO
const defaultTimerSettings = {
  timer : 1,
  shortBreak : 2,
  longBreak : 3,
  totalCycles: 2,
  currentStatus : 'pomodoro'
}

let timerInSeconds = defaultTimerSettings.timer * 60
let shortBreakInSec = defaultTimerSettings.shortBreak * 60
let longBreakInSec = defaultTimerSettings.longBreak * 60
let totalCycles = defaultTimerSettings.totalCycles
let currentStatus = defaultTimerSettings.currentStatus
let initialCycle = 1
let minutes, seconds
let isPaused, isReset = false
let timer = currentTimer()




countdownDisplay(timer)
currentCycle.innerHTML = initialCycle
cyclesTotal.innerHTML = totalCycles

function currentTimer() {
  if (currentStatus === 'pomodoro') {
    return timerInSeconds
  }else if (currentStatus === 'short') {
    return shortBreakInSec
  }else if (currentStatus === 'long') {
    return longBreakInSec
  }
}

function startTimer() {

  if (initialCycle > totalCycles) {
    initialCycle = 1
    console.log('Youre done with all your cycles')
    alert('All Cycles are done!')
  } else {
    currentCycle.innerHTML = initialCycle
    const interval = setInterval(() => {
      if(isPaused) {
        clearInterval(interval)
      }
      
      if(isReset) {
        clearInterval(interval)
        resetTimer()
      }
  
      countdownDisplay(timer)
      timer--
      
      
      if (timer < 0) {
        isPaused = true
        clearInterval(interval)
        disableStartBtn(false)

        // can create a new function changeStatus
        if(currentStatus === 'pomodoro') {
          currentStatus = 'short'
          timer = currentTimer()
          startTimer()
        } else if (currentStatus === 'short') {
          currentStatus = 'long'
          timer = currentTimer()
          startTimer()
        } else if (currentStatus === 'long') {
          currentStatus = 'pomodoro'
          timer = currentTimer()
          initialCycle++
          startTimer()
        }
      }
    }, 100)

  }

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


