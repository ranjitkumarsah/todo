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

        let startX, startY;

    function onTouchStart(event) {
        draggedItem = event.target;
        const touch = event.touches[0];
        startX = touch.clientX - draggedItem.getBoundingClientRect().left;
        startY = touch.clientY - draggedItem.getBoundingClientRect().top;
    }

    function onTouchMove(event) {
        event.preventDefault();
        const touch = event.touches[0];
        const offsetX = touch.clientX - startX;
        const offsetY = touch.clientY - startY;
        draggedItem.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }

    function onTouchEnd() {
        draggedItem.style.transform = '';
    }

    todoList.addEventListener('touchstart', onTouchStart);
    inProgressList.addEventListener('touchstart', onTouchStart);
    closedList.addEventListener('touchstart', onTouchStart);

    todoList.addEventListener('touchmove', onTouchMove);
    inProgressList.addEventListener('touchmove', onTouchMove);
    closedList.addEventListener('touchmove', onTouchMove);

    todoList.addEventListener('touchend', onTouchEnd);
    inProgressList.addEventListener('touchend', onTouchEnd);
    closedList.addEventListener('touchend', onTouchEnd);

    
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
