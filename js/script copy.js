window.addEventListener('load', start);

var globalTasks = ['Task1', 'Task2'];
var isEditing = false;
var currentItem = null;
var inputTask = null;
var addTaskButton = document.querySelector('#addTaskButton');

function start() {
    inputTask = document.querySelector('#inputTask');
    
    preventFormSubmit();
    activateInput();
    render()
}

function preventFormSubmit() {
    function handleFormSubmit(event) {
        event.preventDefault();
    }

    var form = document.querySelector('form');

    form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
    function insertTask (newTask) {
        globalTasks.push(newTask);
    }

    function editInput(newTask) {
        globalTasks[currentIndex] = newTask;
    }

    function handleTyping(event) {
        if (event.key === 'Enter') {
            if (isEditing) {
                editInput(event.target.value);
            } else {
                insertTask(event.target.value);
            }

            isEditing = false;
            clearInput();
        }
    }

    function handleClick() {
        var newTask = inputTask.value;
        if (isEditing) {
            editInput(newTask);
        } else {
            insertTask(newTask);
        }

        isEditing = false;
        clearInput();
    }

    addTaskButton.addEventListener('click', handleClick);

    inputTask.addEventListener('keyup', handleTyping);
    inputTask.focus();
}

function render() {
    function createSpan(task, index) {
        var span = document.createElement('span');
        span.classList.add('clickable');
        span.textContent = task;

        span.addEventListener('click', editTask);

        return span;
    }

    function createDeleteButton(index) {
        function deleteTask() {
            globalTasks.splice(index, 1);
            render();
        }

        var button = document.createElement('button');
        button.classList.add('deleteButton');
        button.textContent =  'x';

        button.addEventListener('click', deleteTask);

        return button;
    }

    function createEditButton(index) {
        var button = document.createElement('button');
        button.classList.add('editButton');
        button.textContent =  'Edit';

        button.addEventListener('click', editTask);

        return button;
    }

    function editTask() {
        inputTask.value = currentTask;
        inputTask.focus();
        isEditing = true;
        currentIndex = index;
    }

    var listContainer = document.querySelector('#listContainer');
    listContainer.innerHTML = '';
    
    var ul = document.createElement('ul');

    for (var i = 0; i < globalTasks.length; i++) {
        var currentTask = globalTasks[i];
        
        var deleteButton = createDeleteButton(i);
        var editButton = createEditButton(i);
        var span = createSpan(currentTask, i);
        
        var li = document.createElement('li');
        li.appendChild(span);
        li.appendChild(deleteButton);
        li.appendChild(editButton);

        ul.appendChild(li);
    }

    listContainer.appendChild(ul);
    clearInput();
}

function clearInput() {
    inputTask.value = '';
    inputTask.focus();
}