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
  totalCycles: 1,
  currentStatus : 'pomodoro'
}

const timerInSeconds = defaultTimerSettings.timer * 60
const shortBreakInSec = defaultTimerSettings.shortBreak * 60
const longBreakInSec = defaultTimerSettings.longBreak * 60
let totalCycles = defaultTimerSettings.totalCycles
let currentStatus = defaultTimerSettings.currentStatus
let initialCycle = 1
let minutes, seconds
let isPaused, isReset = false
let timer = currentTimer()

function defaultTimerDisplay() {
  totalCycles = defaultTimerSettings.totalCycles
  countdownDisplay(timer)
  currentCycle.innerHTML = initialCycle
  cyclesTotal.innerHTML = totalCycles
}

defaultTimerDisplay()

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
    //! NOTE: check to see if this can be added to a function
    let userHasCompletedTask = prompt('Did you finish your task?')
    if(userHasCompletedTask === 'no') {
      let increaseTotalCyclesBy = prompt('How many more cycle would you like to add?')
      currentStatus = 'long'
      totalCycles += parseInt(increaseTotalCyclesBy)
      timer = currentTimer()
      startTimer()
    }else {
      initialCycle = 1
      defaultTimerDisplay()
    }

  } else {
    currentCycle.innerHTML = initialCycle
    cyclesTotal.innerHTML = totalCycles
    
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

        if(currentStatus === 'pomodoro') {
          currentStatus = 'short'
          timer = currentTimer()
          startTimer()
        } else if (currentStatus === 'short') {
          currentStatus = 'pomodoro'
          timer = currentTimer()
          initialCycle++
          startTimer()
        } else if (currentStatus === 'long') {
          currentStatus = 'pomodoro'
          timer = currentTimer()
          startTimer()
        }
      }
    }, 50)

  }
}



function resetTimer() {
  timer = currentTimer()
  countdownDisplay(timer)
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


