// DOM references
const taskInput = document.getElementById('new-task')
const addButton = document.getElementById('add-task-button')
const todoList = document.getElementById('todo-list')
const completedList = document.getElementById('completed-list')
const completedCounter = document.getElementById('completed-counter')
const uncompletedCounter = document.getElementById('uncompleted-counter')

// Create a task <li> element
function createTaskElement(text) {
  const li = document.createElement('li')

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'

  const label = document.createElement('label')
  label.innerText = text

  const deleteBtn = document.createElement('button')
  deleteBtn.innerText = 'Delete'
  deleteBtn.className = 'delete-btn'

  li.append(checkbox, label, deleteBtn)
  return li
}

// Update counters
function updateCounters() {
  completedCounter.innerText = completedList.children.length
  uncompletedCounter.innerText = todoList.children.length
}

// Add new task
function addTask() {
  const text = taskInput.value.trim()
  if (text === '') {
    alert('Please enter a task!')
    return
  }

  const taskItem = createTaskElement(text)

  todoList.appendChild(taskItem)
  bindTaskToggle(taskItem)
  bindTaskDelete(taskItem)

  updateCounters()
  taskInput.value = ''
}

// Handle checking / unchecking
function bindTaskToggle(li) {
  const checkbox = li.querySelector('input[type="checkbox"]')

  checkbox.onchange = () => {
    if (checkbox.checked) {
      completedList.appendChild(li)
    } else {
      todoList.appendChild(li)
    }
    updateCounters()
  }
}

// Handle deletion
function bindTaskDelete(li) {
  const deleteBtn = li.querySelector('.delete-btn')

  deleteBtn.onclick = () => {
    li.remove()
    updateCounters()
  }
}

// Listeners
addButton.addEventListener('click', addTask)

taskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addTask()
})
