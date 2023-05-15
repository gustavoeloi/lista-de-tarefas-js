const btnTask = document.querySelector('.btn-add-task');
const taskList = document.querySelector('.task-list');
const inputTask = document.querySelector('.new-task');

function createTask(task){
  const li = createLi(task);
  taskList.appendChild(li);
  createButton(li);
  cleanInput();
  saveTask();
}

function createLi(task){
  const li = document.createElement('li');
  li.textContent = task;
  return li;
}

function createButton(li){
  const button = document.createElement('button');
  button.textContent = 'Delete';
  button.setAttribute('class', 'apagar');
  li.appendChild(button);
}

function cleanInput(){
  inputTask.value = '';
  inputTask.focus();
}

function saveTask(){
  const liTask = taskList.querySelectorAll('li');
  const taskOfLists = [];

  for (let task of liTask){
    let taskText = task.innerText;
    taskText = taskText.replace('Delete', '').trim();
    taskOfLists.push(taskText);
  }
  
  const taskJSON = JSON.stringify(taskOfLists);
  localStorage.setItem('SavedTasks', taskJSON);
}

function loadSaveTasks(){
  const tasks = localStorage.getItem('SavedTasks');
  const listOfTasks = JSON.parse(tasks);
  
  for(let tasks of listOfTasks){
    createTask(tasks);
  }
}

inputTask.addEventListener('keypress',  (e) => {
  if(e.keyCode === 13){
    if (!inputTask.value){
      alert('Não deixe o campo em branco!');
      return;
    };
    createTask(inputTask.value);
    
  }
});

btnTask.addEventListener('click', () => {
  if (!inputTask.value){
    alert('Não deixe o campo em branco!');
    return;
  };
  createTask(inputTask.value);
});

document.addEventListener('click', (e) =>{
  const el = e.target;
  if(el.classList.contains('apagar')){
    el.parentElement.remove();
    saveTask();
  }
});

loadSaveTasks();





