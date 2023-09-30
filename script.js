function allowDrop(event) {
    event.preventDefault();
}

document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const inProgressList = document.getElementById('in-progress-list');
    const closedList = document.getElementById('closed-list');
      const todoCountElement = document.getElementById('todo-count');
    const inProgressCountElement = document.getElementById('in-progress-count');
    const closedCountElement = document.getElementById('closed-count');
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
      updateTodoCounts();
    }

    function onTouchStart(event) {
        draggedItem = event.target;
        event.preventDefault();
        event.target.addEventListener('touchmove', onTouchMove, { passive: false });
        event.target.addEventListener('touchend', onTouchEnd);
    }

    function onTouchMove(event) {
        event.preventDefault();
        const touch = event.touches[0];
        draggedItem.style.left = touch.clientX + 'px';
        draggedItem.style.top = touch.clientY + 'px';
    }

    function onTouchEnd() {
        event.preventDefault();
        draggedItem.style.left = '';
        draggedItem.style.top = '';
        draggedItem.removeEventListener('touchmove', onTouchMove);
        draggedItem.removeEventListener('touchend', onTouchEnd);
    }

    todoList.addEventListener('touchstart', onTouchStart);
    inProgressList.addEventListener('touchstart', onTouchStart);
    closedList.addEventListener('touchstart', onTouchStart);

    
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
      updateTodoCounts();
        closeModalFunc();
        todoInput.value = '';
    }

    function deleteTodo(event) {
        if (event.target.className === 'todo-item') {
            event.target.remove();
        }
      updateTodoCounts();
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
  function updateTodoCounts() {
        const todoCount = todoList.children.length;
        const inProgressCount = inProgressList.children.length;
        const closedCount = closedList.children.length;
        todoCountElement.textContent = todoCount;
        inProgressCountElement.textContent = inProgressCount;
        closedCountElement.textContent = closedCount;
    }
});
