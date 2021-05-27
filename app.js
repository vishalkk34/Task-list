//define the ui variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load the event listeners
loadEventListeners();

//load all event listeners
function loadEventListeners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //add task event
  form.addEventListener('submit', addTask);
  //remove task event
  taskList.addEventListener('click', removeTask);
  //clear task event
  clearBtn.addEventListener('click', removeTasks);
  //filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

//add task
function addTask(e) {
   if(taskInput.value === '') {
      alert('Add a task');
   }

   //create li element
   const li = document.createElement('li');
   //add class
   li.className = 'collection-item';
   //create a text node and append to li
   li.appendChild(document.createTextNode(taskInput.value));  
   
   //create new link element
   const link = document.createElement('a');
   //add class
   link.className = 'delete-item secondary-content';
   //add icon 
   link.innerHTML = '<i class="fa fa-remove"></i>';
   //append the link to li
   li.appendChild(link);
   
   //append li to ul
   taskList.appendChild(li);

   //store in LS
   storeTaskInLocalStorage(taskInput.value);

   //clear the input
   taskInput.value ='';

  e.preventDefault();
}

//store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks',JSON.stringify(tasks));
}


//remove task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
     e.target.parentElement.parentElement.remove();

     // Remove from LS
     removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


//clear tasks
function removeTasks() {
  //METHOD ONE WHICH IS SLOW
  // taskList.innerHTML = '';
  
  //second method faster
  if(confirm('Are you sure to clear all tasks?')){
    while(taskList.firstChild) {
     taskList.removeChild(taskList.firstChild);

     //remove from ls
     clearTasksFromLocalStorage();
    }
  }
}

//clear tasks from ls
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

//filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach
  (function(task){
    const item=task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display='block';
    } else {
      task.style.display='none';
    }
  });
}

