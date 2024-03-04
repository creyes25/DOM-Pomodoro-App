// Tasks
const inputTask = document.querySelector('.input-task')
const addBtn = document.querySelector('.add-btn')

const taskList = []


function createNewTask(value) {
  const task = {
    value: value,
    isCompleted: false
  }

  taskList.push(task)
}

function displayAllTasks() {
  
}

// add a new task into a list
addBtn.addEventListener('click', () => {
  const inputValue = inputTask.value

  if(inputValue === '') return

  createNewTask(inputValue)

  inputTask.value = ''

  // call function to display the new task
  displayAllTasks()
})

























const timerDisplay = document.querySelector('.timerDisplay')
const pomodoroStatus = document.querySelector('.inital-status')
const shortBreakStatus = document.querySelector('.short-status')
const longBreakStatus = document.querySelector('.long-status')
const currentCycle = document.querySelector('.current-cycle')
const cyclesTotal = document.querySelector('.total-cycles')
const startBtn = document.querySelector('.start-btn')
const pauseBtn = document.querySelector('.pause-btn')
const resetBtn = document.querySelector('.reset-btn')
const currentTask = document.querySelector('.current-task')


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

// displays default settings timer
function defaultTimerDisplay() {
  totalCycles = defaultTimerSettings.totalCycles
  countdownDisplay(timer)
  currentCycle.innerHTML = initialCycle
  cyclesTotal.innerHTML = totalCycles
}

defaultTimerDisplay()

// finds the current time base on status 
function currentTimer() {
  if (currentStatus === 'pomodoro') {
    return timerInSeconds
  }else if (currentStatus === 'short') {
    return shortBreakInSec
  }else if (currentStatus === 'long') {
    return longBreakInSec
  }
}

// Timer starts the countdown
function startTimer() {
  currentCycle.innerHTML = initialCycle
  cyclesTotal.innerHTML = totalCycles
  statusDisplay(currentStatus)

  if (initialCycle > totalCycles) {
    finishOrContinueWorking()

  } else {

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
        } else if (currentStatus === 'short') {
          currentStatus = 'pomodoro'
          initialCycle++
        } else if (currentStatus === 'long') {
          currentStatus = 'pomodoro'
        }

        timer = currentTimer()
        startTimer()
      }
    }, 50)

  }
}

// user decides whether to continue working on task or finish
function finishOrContinueWorking() {
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
}

// resets the current status timer
function resetTimer() {
  timer = currentTimer()
  countdownDisplay(timer)
  isPaused, isReset = false
}

// displays timer in min and seconds
function countdownDisplay(timer) {
  minutes = Math.floor(timer / 60)
  seconds = timer % 60

  if (minutes < 10) minutes = '0' + minutes
  if (seconds < 10 && seconds >= 0) seconds = '0' + seconds
    
  return timerDisplay.innerHTML = `${minutes}:${seconds}`
}

// disables start btn when timer is running
function disableStartBtn(hasStarted) {
  if (hasStarted) {
    startBtn.disabled = true
  }else {
    startBtn.disabled = false
  }
}

// displays the current status
function statusDisplay(currentStatus) {
  switch (currentStatus) {
    case 'pomodoro':
      statusStyling(pomodoroStatus)
      removeStatusStyling(shortBreakStatus, longBreakStatus)
      break;
    case 'short': 
      statusStyling(shortBreakStatus)
      removeStatusStyling(pomodoroStatus, longBreakStatus)
      break;

    case 'long':
      statusStyling(longBreakStatus)
      removeStatusStyling(shortBreakStatus, pomodoroStatus)
      break;
    default:
      break;
  }
}

// styles the status element to be displayed
function statusStyling(currentStatus) {
  currentStatus.style.textDecoration = 'underline'
}

// removes styling on status that is not current
function removeStatusStyling(...statuses) {
  statuses.forEach(status => {
    status.style.removeProperty('text-decoration')
  })
}


// POMODORO Event Listeners
startBtn.addEventListener('click', (e) => {
  if(e && currentTask.innerHTML.length > 0) {
    disableStartBtn(true)
    startTimer()
    isPaused = false
  }else {
    alert('Please select a task you want to work on')
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
    resetTimer()
  }
})


