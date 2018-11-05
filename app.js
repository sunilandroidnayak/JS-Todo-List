//Define UI Vars 
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');
const filterInput = document.querySelector('#filter');

//Load all EVent Listeners
loadEventListeners();

function loadEventListeners(){

    //DOM Load Events at Stratup
    document.addEventListener('DOMContentLoaded', loadTasks);
    //Add the task to the tasks list
    form.addEventListener('submit', addTask);
    //Remove the task from the task list using Event Delegation
    taskList.addEventListener('click', removeTask);
    //Clear Tasks
    clearBtn.addEventListener('click', clearTasks);
    //Filter Tasks
    filterInput.addEventListener('keyup', filterTasks);
}

//Add tasks
function addTask(e){    
    //if no task is entered
    if (taskInput.value === '') 
    {
        alert("You Need to Enter a Task!");
    }

    //if Task is entered add it to the List
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.className = 'collection-item';    
    li.appendChild(document.createTextNode(taskInput.value));
    li.appendChild(link);

    taskList.appendChild(li);

    //Store Task in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';
    e.preventDefault();
}

//Remove Task using Event Delegation
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item'))
    {   
        e.target.parentElement.parentElement.remove();
        removeTaskFromLocalStorage(e.target.parentElement.parentElement.textContent);
    }
}

//Clear Tasks 
function clearTasks(e){
    // if(confirm('Clear All Tasks ?'))        
    //     taskList.innerHTML = ''; 

    //Faster method against InnerHTMl method
    while(taskList.firstChild)
        taskList.removeChild(taskList.firstChild);

    localStorage.clear();
}

//Filter Tasks
function filterTasks(e){
    const filterText =  e.target.value;
    
    document.querySelectorAll('.collection-item').forEach(
        function(task)
        {
            const item = task.firstChild.textContent;
            
            if(item.indexOf(filterText) == -1)
                task.style.display = 'none';
            else
                task.style.display = 'block';
        }
    );
}

function  storeTaskInLocalStorage(task) {
    let tasks;

    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks()
{
    let tasks;

    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(
        function(task)
        {
            //if Task is entered add it to the List
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class="fa fa-remove"></i>';

            li.className = 'collection-item';
            li.appendChild(document.createTextNode(taskInput.value));
            li.appendChild(link);

            taskList.appendChild(li);
         }
    );
}

function removeTaskFromLocalStorage(taskName)
{
    console.log(taskName);
    localStorageTasks = JSON.parse(localStorage.getItem('tasks'));

    localStorageTasks.forEach(
        function (task, index) 
        {
            if(taskName === task)
                localStorageTasks.splice(index,1);
        });

    localStorage.setItem('tasks',JSON.stringify(localStorageTasks));
}