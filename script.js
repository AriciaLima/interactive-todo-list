//First, we get the element from the HTML using their IDs
const taskInput = document.getElementById('new-task')
const addButton = document.getElementById('add-task-button')
const todoList = document.getElementById('todo-list')
const completedList = document.getElementById('completed-list')

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

  // 4. Put them all together inside the list item
  listItem.appendChild(checkbox)
  listItem.appendChild(label)

  return listItem
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

  // Bind the evento for when the checkbox is clicked
  bindTaskEvents(listItem)

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
  }
}

// Event Listeners
addButton.addEventListener('click', addTask)
