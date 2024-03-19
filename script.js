// Tasks
const inputTask = document.querySelector('.input-task')
const addBtn = document.querySelector('.add-btn')
const activeTasks = document.querySelector('.active-list')
const completedTasks = document.querySelector('.completed-list')
const currentTask = document.querySelector('.current-task')

const finishAudio = new Audio('https://www.soundjay.com/misc/sounds/magic-chime-06.mp3')

const completedTaskAudio = new Audio ('https://www.soundjay.com/misc/sounds/dream-harp-02.mp3')

let taskList = []

function $(el, className) {
  const newElement = document.createElement(el)

  newElement.classList.add(className)

  return newElement
}

// create a new task
function createNewTask(value) {
  const task = {
    id:null,
    name: value,
    isCompleted: false
  }

  taskList.push(task)
}

function displayAllTasks() {
  activeTasks.innerHTML = ''
  completedTasks.innerHTML = ''

  taskList.forEach((task, id) => {
    task.id = id

    const li = $('li', id)
    const checkbox = $('div', 'checkbox')
    const taskName = $('span', task.id)
    const btnsContainer = $('div', 'btns-cont')
    const startTask = $('div', 'run-btn')
    const deleteBtn = $('div', 'delete-btn')
    
    taskName.innerHTML = task.name
    startTask.innerHTML = 'Run'
    deleteBtn.innerHTML = '🗑️'

    btnsContainer.appendChild(startTask)
    btnsContainer.appendChild(deleteBtn)
    li.appendChild(checkbox)
    li.appendChild(taskName)
    li.appendChild(btnsContainer)

    // checks to see if task is completed
    if(task.isCompleted) {
      btnsContainer.removeChild(startTask)
      completedTasks.appendChild(li)
    }else {
      
      activeTasks.appendChild(li)
    }
  })
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

// when user presses on enter key inside the input field
inputTask.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') {
    if (e.target.value === '') return;
    const inputValue = inputTask.value
    createNewTask(inputValue)
    inputTask.value = ''
    // call function to display the new task
    displayAllTasks()
  }

})

// handles the selected task on the list
window.addEventListener('click', e => {
  const className = e.target.className
  const updatedTaskList = []
  
  // handles checkboxes of task
  if (className === 'checkbox') {
    const taskCont = parseInt(e.target.parentNode.className)
    taskList.forEach(task=> {
      if (task.id === taskCont) {
        (task.isCompleted) ? task.isCompleted = false : task.isCompleted = true
      }
    })
  }

  // handles run btn 
  if (className === 'run-btn') {
    const taskCont = parseInt(e.target.parentNode.parentNode.className)
    completedTaskAudio.pause();
    completedTaskAudio.currentTime = 0;
    taskList.forEach(task => {
      if (task.id === taskCont) {
        currentTask.setAttribute('id', `${task.id}`)
        currentTask.innerHTML = task.name
      }
    })
  }

  // handles delete btn of task
  if (className === 'delete-btn') {
    const taskCont = parseInt(e.target.parentNode.parentNode.className)
    
    taskList.forEach(task => {
      if(task.id !== taskCont) {
        updatedTaskList.push(task)
      }
    })

    taskList.length = 0
    taskList = [...updatedTaskList]
  }

  displayAllTasks()

})


// Pomodoro

const timerDisplay = document.querySelector('.timerDisplay')
const pomodoroStatus = document.querySelector('.pomodoro')
const shortBreakStatus = document.querySelector('.short-break')
const longBreakStatus = document.querySelector('.long-break')
const currentCycle = document.querySelector('.current-cycle')
const cyclesTotal = document.querySelector('.total-cycles')
const startBtn = document.querySelector('.start-btn')
const pauseBtn = document.querySelector('.pause-btn')
const resetBtn = document.querySelector('.reset-btn')
const resetAllBtn = document.querySelector('.reset-all')
const progressBarChange = document.querySelector('.progess-bar')

// settings display
const settingsBtn = document.querySelector('.settings')
const settingsDisplay = document.querySelector('.settings-display')
const exitSettingsBtn = document.querySelector('.exit-settings-btn')
const saveBtn = document.querySelector('.save')
const pomodoroInput = document.querySelector('.pomodoro-input')
const shortInput = document.querySelector('.short-input')
const longInput = document.querySelector('.long-input')
const cyclesInput = document.querySelector('.cycles-input')

// end of cycles display
const completedCyclesDisplay = document.querySelector('.completed-task-display')
const yesBtn = document.querySelector('.yes-btn')
const noBtn = document.querySelector('.no-btn')
const uncompletedTask = document.querySelector('.uncompleted-task')
const addCycles = document.querySelector('.add-cycles')
const continueWorkBtn = document.querySelector('.cont-work-btn')


// default values
const defaultPomodoroTimer = pomodoroInput.value
const defaultShortTimer = shortInput.value
const defaultLongTmer = longInput.value
const defaultTotalCycles = cyclesInput.value


const defaultTimerSettings = {
  timer : defaultPomodoroTimer,
  shortBreak : defaultShortTimer,
  longBreak : defaultLongTmer,
  totalCycles: defaultTotalCycles,
  currentStatus : 'pomodoro'
}

let timerInSeconds, shortBreakInSec, longBreakInSec, totalCycles, currentStatus
let initialCycle, initialTime
let minutes, seconds
let isPaused, isReset = false
let timer


// displays default settings timer
function defaultTimerDisplay() {
  timerInSeconds = defaultTimerSettings.timer * 60
  shortBreakInSec = defaultTimerSettings.shortBreak * 60
  longBreakInSec = defaultTimerSettings.longBreak * 60
  totalCycles = parseInt(defaultTimerSettings.totalCycles) 
  currentStatus = defaultTimerSettings.currentStatus
  initialCycle = 1,
  timer = currentTimer()
  countdownDisplay(timer)
  currentTask.innerHTML =''
  currentCycle.innerHTML = initialCycle
  cyclesTotal.innerHTML = totalCycles
  
}

defaultTimerDisplay()

// finds the current time base on status 
function currentTimer() {
  if (currentStatus === 'pomodoro') {
    initialTime = timerInSeconds
    return timerInSeconds
  }else if (currentStatus === 'short') {
    initialTime = shortBreakInSec
    return shortBreakInSec
  }else if (currentStatus === 'long') {
    initialTime = longBreakInSec
    return longBreakInSec
  }
}


// Timer starts the countdown
function startTimer() {
  
  cyclesTotal.innerHTML = totalCycles
  statusDisplay(currentStatus)

  if (initialCycle > totalCycles) {
    completedCyclesDisplay.style.display = 'flex'

  } else {

    const interval = setInterval(() => {
      currentCycle.innerHTML = initialCycle
      if(isPaused) {
        clearInterval(interval)
      }
      
      if(isReset) {
        clearInterval(interval)
        resetTimer()
      }
  
      countdownDisplay(timer)
      timer--
      
      progressBar(initialTime, timer)

      if (timer < 0) {
        isPaused = true
        clearInterval(interval)
        disableBtns(false)

        if(currentStatus === 'pomodoro') {
          currentStatus = 'short'
        } else if (currentStatus === 'short') {
          currentStatus = 'pomodoro'
          initialCycle++
        } else if (currentStatus === 'long') {
          currentStatus = 'pomodoro'
        }

        finishAudio.currentTime = 0
        finishAudio.play()
        timer = currentTimer()
        startTimer()
      }
    }, 1000)

  }
}

// resets the current status timer
function resetTimer() {
  defaultTimerDisplay()
  statusDisplay(currentStatus)
  removeStatusStyling(pomodoroStatus,shortBreakStatus, longBreakStatus)
  progressBarChange.style.width = `0%`
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
function disableBtns(hasStarted) {
  if (hasStarted) {
    startBtn.disabled = true
    settingsBtn.style.pointerEvents = 'none'
  }else {
    startBtn.disabled = false
    settingsBtn.style.pointerEvents = 'auto'
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
      finishAudio.play()
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
  currentStatus.style.borderRadius = '15px'
  currentStatus.style.padding = '8px 12px'
  currentStatus.style.backgroundColor = 'rgba(85, 84, 151, 0.975)'
}

// removes styling on status that is not current
function removeStatusStyling(...statuses) {
  statuses.forEach(status => {
    status.style.removeProperty('text-decoration')
    status.style.removeProperty('border')
    status.style.removeProperty('border-radius')
    status.style.removeProperty('padding')
    status.style.removeProperty('background-color')
  })
}

// progress bar
function progressBar(initialTime, currentTime) {
  const percentage = ((initialTime - currentTime)/ initialTime) * 100

  progressBarChange.style.width = `${percentage}%`
}


// POMODORO Event Listeners
startBtn.addEventListener('click', (e) => {
  if(e && currentTask.innerHTML.length > 0) {
    disableBtns(true)
    startTimer()
    isPaused = false
    
  }else {
    alert('Please select a task you want to work on')
  }
})

pauseBtn.addEventListener('click', () => {
  disableBtns(false)
  isPaused = true
})

resetBtn.addEventListener('click', ()=> {
  isReset = true
  disableBtns(false)
  if(isPaused) {
    resetTimer()
  }
})

// clears all tasks and sets to default timer
resetAllBtn.addEventListener('click', () => {
  taskList.length = 0
  displayAllTasks()
  defaultTimerSettings.timer = defaultPomodoroTimer
  defaultTimerSettings.longBreak = defaultLongTmer
  defaultTimerSettings.shortBreak = defaultShortTimer
  defaultTimerSettings.totalCycles = defaultTotalCycles

  // set default timer in settings display
  pomodoroInput.value = defaultPomodoroTimer
  shortInput.value = defaultShortTimer
  longInput.value = defaultLongTmer
  cyclesInput.value = defaultTotalCycles

  progressBarChange.style.width = `0%`

  isReset = true
  disableBtns(false)

  if(isPaused) resetTimer()
  resetTimer()
  
})


settingsBtn.addEventListener('click', () => {
  settingsDisplay.style.display = 'block'
})


exitSettingsBtn.addEventListener('click', () => {
  settingsDisplay.style.display = 'none'
})

// save button in the settings 
saveBtn.addEventListener('click', () => {
  settingsDisplay.style.display = 'none'
  
  const pomodoroSettings = pomodoroInput.value
  const shortSettings = shortInput.value
  const longSettings = longInput.value
  const cyclesSettings = cyclesInput.value
  
  defaultTimerSettings.timer = pomodoroSettings
  defaultTimerSettings.shortBreak = shortSettings
  defaultTimerSettings.longBreak = longSettings
  defaultTimerSettings.totalCycles = cyclesSettings

  defaultTimerDisplay()
})

// handles completion of a task
yesBtn.addEventListener('click', () => {
  taskList.forEach(task => {
    if(task.id === parseInt(currentTask.id)) {
      completedTaskAudio.play()
      task.isCompleted = true
      displayAllTasks()
      defaultTimerDisplay()
      completedCyclesDisplay.style.display = 'none'
    }
  })
})

// handles no btn (when task is not completed after tasks)
noBtn.addEventListener('click', () => {
  uncompletedTask.style.display = 'block'
})

// handles the continuation of unfinished task
continueWorkBtn.addEventListener('click', ()=> {
  const cyclesToAdd = parseInt(addCycles.value)
  currentStatus = 'long'
  totalCycles += cyclesToAdd
  timer = currentTimer()
  startTimer()
  completedCyclesDisplay.style.display = 'none'
  uncompletedTask.style.display = 'none'
})