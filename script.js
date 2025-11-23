// First, we get the element from the HTML using their IDs
const taskInput = document.getElementById('new-task')
const addButton = document.getElementById('add-task-button')
const todoList = document.getElementById('todo-list')
const completedList = document.getElementById('completed-list')
const completedCounter = document.getElementById('completed-counter')
const uncompletedCounter = document.getElementById('uncompleted-counter')

// Function to create a new task
function createNewTaskElement(taskString) {
  // 1. Create list item
  const listItem = document.createElement('li')

  // 2. Create checkbox
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox' // Make it a checkbox

  // 3. Create label for the task text
  const label = document.createElement('label')
  label.innerText = taskString

  // 4. Create delete button
  const deleteBtn = document.createElement('button')
  deleteBtn.innerText = 'Delete'
  deleteBtn.className = 'delete-btn'

  // 5. Put them all together inside the list item
  listItem.appendChild(checkbox)
  listItem.appendChild(label)
  listItem.appendChild(deleteBtn)

  return listItem
}

// Function to update counters
function updateCounters() {
  completedCounter.innerText = completedList.children.length
  uncompletedCounter.innerText = todoList.children.length
}

// Function to add a new task to the to-do list
function addTask() {
  const taskText = taskInput.value.trim()
  if (taskText === '') {
    alert('Please enter a task!')
    return
  }

  // Create the full task item (li with checkbox and label)
  const listItem = createNewTaskElement(taskText)

  // Add it to the "To-Do" list
  todoList.appendChild(listItem)

  // Bind the event for when the checkbox is clicked
  bindTaskEvents(listItem)

  // Bind the delete event
  bindDeleteEvents(listItem)

  // Update counters
  updateCounters()

  // Clear the input
  taskInput.value = ''
}

// Function to move tasks between lists
function bindTaskEvents(taskListItem) {
  const checkbox = taskListItem.querySelector('input[type="checkbox"]')

  checkbox.onchange = function () {
    if (this.checked) {
      //If checked, move from 'todoList' to 'completedList'
      completedList.appendChild(taskListItem)
    } else {
      //If unchecked, move back from 'completedList' to 'todoList'
      todoList.appendChild(taskListItem)
    }
    // Update counters after moving
    updateCounters()
  }
}

// Function to bind delete events
function bindDeleteEvents(taskListItem) {
  const deleteBtn = taskListItem.querySelector('.delete-btn')

  deleteBtn.onclick = function () {
    taskListItem.remove()
    updateCounters()
  }
}

// Event Listeners
addButton.addEventListener('click', addTask)
taskInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    addTask()
  }
})
