document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <input type="checkbox" class="complete-checkbox" ${task.completed ? 'checked' : ''} onclick="toggleComplete(${index})">
                <span class="task-text">${task.text}</span>
                <div>
                    <button class="edit" onclick="startEditTask(${index})">Edit</button>
                    <button class="delete" onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    };

    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    };

    window.startEditTask = (index) => {
        const li = taskList.children[index];
        const taskTextElement = li.querySelector('.task-text');
        const originalText = tasks[index].text;

        taskTextElement.innerHTML = `
            <input type="text" value="${originalText}" class="edit-input">
            <button onclick="saveEditTask(${index})">Save</button>
            <button onclick="cancelEditTask(${index})">Cancel</button>
        `;
    };

    window.saveEditTask = (index) => {
        const li = taskList.children[index];
        const editInput = li.querySelector('.edit-input');
        const newText = editInput.value.trim();

        if (newText) {
            tasks[index].text = newText;
            saveTasks();
            renderTasks();
        } else {
            alert('Task text cannot be empty.');
        }
    };

    window.cancelEditTask = (index) => {
        renderTasks();
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    window.toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();
});
