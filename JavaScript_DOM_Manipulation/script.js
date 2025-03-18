
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const todoList = document.getElementById('todoList');
const clearCompletedBtn = document.getElementById('clearCompleted');
const clearAllBtn = document.getElementById('clearAll');


let todos = [];


function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    todos.push({ text: taskText, completed: false });
    taskInput.value = '';
    renderTodos();
  }
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
    renderTodos();
  }
}

loadTodos();

addTaskBtn.addEventListener('click', addTask);

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    if (todo.completed) {
      li.classList.add('completed');
    }
    
    li.innerHTML = `
      <span>${todo.text}</span>
      <div class="task-actions">
        <button class="toggle" data-index="${index}">${todo.completed ? '↩️' : '✓'}</button>
        <button class="delete" data-index="${index}">🗑️</button>
      </div>
    `;
    
    todoList.appendChild(li);
  });
  
  saveTodos();
}


clearCompletedBtn.addEventListener('click', () => {
  todos = todos.filter(todo => !todo.completed);
  renderTodos();
});


clearAllBtn.addEventListener('click', () => {
  todos = [];
  renderTodos();
});

todoList.addEventListener('click', (e) => {
  const index = e.target.dataset.index;
  if (e.target.classList.contains('toggle')) {
    // สลับสถานะเสร็จ/ไม่เสร็จ
    todos[index].completed = !todos[index].completed;
    renderTodos();
  } else if (e.target.classList.contains('delete')) {
    // ลบรายการ
    todos.splice(index, 1);
    renderTodos();
  }
});
