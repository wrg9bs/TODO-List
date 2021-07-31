//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);




//Functions
function addTodo(event) {
    // prevent default form submission
    event.preventDefault();
// Create a todo Div for the li wand the buttons for delete and checked.
    const todoDiv = document.createElement('div'); //adding classList to the div.
    todoDiv.classList.add('todo');
    // creating the Li
    const newTodo = document. createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    //appending newTodo to the todoDiv
    todoDiv.appendChild(newTodo);
    // Add todo to local storage
    saveLocalTodos(todoInput.value);
    // check mark buttons
    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add('complete-btn');
    todoDiv.appendChild(completedBtn);
    // make delete or trash button 
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);
// attaching the todoDiv to the ul with class of todo-list
todoList.appendChild(todoDiv);
//clear todo input upon typing
todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
// Delete todo
if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;  //this ensures deleting the parent element(text) not the trash icon
    todo.classList.add('fall');  //animation
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function() {
        todo.remove(); //this enables the remove to be executed once the transition is completed
    });
    
}

// Check Mark on todo
if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
}
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
               break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}
//save app to local storage
function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
    todos = [];
    } else {
    todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
    todos = [];
    } else {
    todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const newTodo = document. createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
    
        // check mark button
        const completedBtn = document.createElement('button');
        completedBtn.innerHTML = '<i class="fas fa-check"></i>';
        completedBtn.classList.add('complete-btn');
        todoDiv.appendChild(completedBtn);
        // make delete or trash button 
        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashBtn.classList.add('trash-btn');
        todoDiv.appendChild(trashBtn);
    
    todoList.appendChild(todoDiv);  

    });
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
    todos = [];
    } else {
    todos = JSON.parse(localStorage.getItem('todos'));
    }
     const todoIndex = todo.children[0].innerText;
     todos.splice(todos.indexOf(todoIndex), 1);
     localStorage.setItem("todos", JSON.stringify(todos));
}
