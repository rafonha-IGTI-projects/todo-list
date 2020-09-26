window.addEventListener('load', start);

var globalTasks = ['Task1', 'Task2'];
var inputTask = null;
var currentIndex = null;
var isEditing = false;

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
        var hasText = !!event.target.value && event.target.value.trim() !== '';

        if (!hasText) {
            clearInput();
            return;
          }

        if (event.key === 'Enter') {
            if (isEditing) {
                editInput(event.target.value);
            } else {
                insertTask(event.target.value);
            }

            render();
            isEditing = false;
            clearInput();
        }
    }

    function handleClick() {
        var hasText = !!inputTask.value && inputTask.value.trim() !== '';

        if (!hasText) {
            clearInput();
            return;
          }

        var newTask = inputTask.value;
        if (isEditing) {
            editInput(newTask);
        } else {
            insertTask(newTask);
        }

        render();
        isEditing = false;
        clearInput();
    }

    addTaskButton.addEventListener('click', handleClick);

    inputTask.addEventListener('keyup', handleTyping);
    inputTask.focus();
}

function render() {
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

    function createEditButton(task,index) {
        function editTask() {
            inputTask.value = task;
            inputTask.focus();
            isEditing = true;
            currentIndex = index;
        }
        
        var button = document.createElement('button');
        button.classList.add('editButton');
        button.textContent =  'Edit';

        button.addEventListener('click', editTask);

        return button;
    }

    function createSpan(task, index) {
        function editTask() {
            inputTask.value = task;
            inputTask.focus();
            isEditing = true;
            currentIndex = index;
        }

        var span = document.createElement('span');
        span.classList.add('clickable');
        span.textContent = task;
        span.addEventListener('click', editTask);
        
        return span;
    }
    
    var listContainer = document.querySelector('#listContainer');
    listContainer.innerHTML = '';
    
    var ul = document.createElement('ul');

    for (var i = 0; i < globalTasks.length; i++) {
        var currentTask = globalTasks[i];
        
        var li = document.createElement('li');
        var editButton = createEditButton(currentTask, i);
        var deleteButton = createDeleteButton(i);
        var span = createSpan(currentTask, i);
        
        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        ul.appendChild(li);
    }

    listContainer.appendChild(ul);
    clearInput();
}

function clearInput() {
    inputTask.value = '';
    inputTask.focus();
}