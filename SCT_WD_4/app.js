document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
  
    // State
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let currentCategory = 'focus';
  
    // DOM Elements
    const todoForm = document.getElementById('todoForm');
    const newTodoInput = document.getElementById('newTodo');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const activeTasksContainer = document.getElementById('activeTasks');
    const completedTasksContainer = document.getElementById('completedTasks');
    const completedToggle = document.getElementById('completedToggle');
  
    // Save todos to localStorage
    const saveTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
    };
  
    // Get category style
    const getCategoryStyle = (category) => {
      switch (category) {
        case 'focus': return 'from-violet-500 to-purple-500';
        case 'quick': return 'from-blue-500 to-cyan-500';
        case 'goal': return 'from-amber-500 to-orange-500';
        default: return 'from-violet-500 to-purple-500';
      }
    };
  
    // Get category icon
    const getCategoryIcon = (category) => {
      switch (category) {
        case 'focus': return 'target';
        case 'quick': return 'zap';
        case 'goal': return 'crown';
        default: return 'target';
      }
    };
  
    // Create task element
    const createTaskElement = (todo) => {
      const taskElement = document.createElement('div');
      taskElement.className = 'task-item slide-in';
      taskElement.innerHTML = `
        <div class="task-content">
          <button class="task-toggle">
            <i data-lucide="${todo.completed ? 'check-circle-2' : 'circle'}"></i>
          </button>
          <div class="task-text">
            <i data-lucide="${getCategoryIcon(todo.category)}"></i>
            <span${todo.completed ? ' style="text-decoration: line-through; color: #9ca3af;"' : ''}>${todo.text}</span>
          </div>
          <button class="task-delete">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      `;
  
      // Add event listeners
      const toggleBtn = taskElement.querySelector('.task-toggle');
      toggleBtn.addEventListener('click', () => toggleTodo(todo.id));
  
      const deleteBtn = taskElement.querySelector('.task-delete');
      deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
  
      return taskElement;
    };
  
    // Render todos
    const renderTodos = () => {
      const activeTodos = todos.filter(todo => !todo.completed);
      const completedTodos = todos.filter(todo => todo.completed);
  
      // Render active todos
      activeTasksContainer.innerHTML = '';
      activeTodos.forEach(todo => {
        activeTasksContainer.appendChild(createTaskElement(todo));
      });
  
      // Render completed todos
      completedTasksContainer.innerHTML = '';
      completedTodos.forEach(todo => {
        completedTasksContainer.appendChild(createTaskElement(todo));
      });
  
      // Update completed toggle
      if (completedTodos.length > 0) {
        completedToggle.classList.remove('hidden');
        completedToggle.querySelector('span').textContent = `${completedTodos.length} completed tasks`;
      } else {
        completedToggle.classList.add('hidden');
      }
  
      // Reinitialize Lucide icons for new elements
      lucide.createIcons();
    };
  
    // Add todo
    const addTodo = (e) => {
      e.preventDefault();
      const text = newTodoInput.value.trim();
      if (!text) return;
  
      const newTodo = {
        id: Date.now(),
        text,
        completed: false,
        category: currentCategory,
        createdAt: Date.now()
      };
  
      todos.push(newTodo);
      saveTodos();
      renderTodos();
      newTodoInput.value = '';
    };
  
    // Toggle todo
    const toggleTodo = (id) => {
      todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      saveTodos();
      renderTodos();
    };
  
    // Delete todo
    const deleteTodo = (id) => {
      todos = todos.filter(todo => todo.id !== id);
      saveTodos();
      renderTodos();
    };
  
    // Event Listeners
    todoForm.addEventListener('submit', addTodo);
  
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentCategory = button.dataset.category;
      });
    });
  
    completedToggle.addEventListener('click', () => {
      completedToggle.classList.toggle('active');
      completedTasksContainer.classList.toggle('hidden');
    });
  
    // Initial render
    renderTodos();
  });