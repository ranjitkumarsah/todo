function allowDrop(event) {
    event.preventDefault();
}

document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const inProgressList = document.getElementById('in-progress-list');
    const closedList = document.getElementById('closed-list');
    const addTodoButton = document.getElementById('add-todo');
    const modal = document.getElementById('myModal');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoInput = document.getElementById('todoInput');
    const closeModal = document.getElementsByClassName('close')[0];

    let draggedItem;

    function drag(event) {
        draggedItem = event.target;
    }

    function drop(event, section) {
        event.preventDefault();
        const list = document.getElementById(`${section}-list`);
        list.appendChild(draggedItem);
    }

    function openModal() {
        modal.style.display = 'block';
    }

    function closeModalFunc() {
        modal.style.display = 'none';
    }

    function createTodo() {
        const todoText = todoInput.value;
        if (todoText) {
            const todoItem = document.createElement('div');
            todoItem.className = 'todo-item';
            todoItem.textContent = todoText;
            todoItem.draggable = true;
            todoItem.addEventListener('dragstart', drag);
            todoList.appendChild(todoItem);
        }
        closeModalFunc();
        todoInput.value = '';
    }

    function deleteTodo(event) {
        if (event.target.className === 'todo-item') {
            event.target.remove();
        }
    }

    addTodoButton.addEventListener('click', openModal);
    addTodoBtn.addEventListener('click', createTodo);
    closeModal.addEventListener('click', closeModalFunc);

    todoList.addEventListener('click', deleteTodo);
    inProgressList.addEventListener('click', deleteTodo);
    closedList.addEventListener('click', deleteTodo);

    todoList.addEventListener('drop', (event) => drop(event, 'todo'));
    inProgressList.addEventListener('drop', (event) => drop(event, 'in-progress'));
    closedList.addEventListener('drop', (event) => drop(event, 'closed'));

    todoList.addEventListener('dragover', allowDrop);
    inProgressList.addEventListener('dragover', allowDrop);
    closedList.addEventListener('dragover', allowDrop);
  
});
