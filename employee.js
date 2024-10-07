document.addEventListener('DOMContentLoaded', () => {
    // Retrieve existing tasks from localStorage
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Example data for employee
    const employeeData = {
        name: 'John Doe',
        performance: [80, 90, 85] // Performance percentages for chart
    };

    // Update employee info
    document.getElementById('employeeName').textContent = employeeData.name;

    // Populate task list
    const taskList = document.getElementById('taskList');
    function populateTaskList() {
        taskList.innerHTML = ''; // Clear current task list
        storedTasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                <strong>${task.description}</strong>
                <button class="btn ${task.completed ? 'btn-success' : 'btn-warning'} btn-sm" onclick="toggleTask(${index})">
                    ${task.completed ? 'Completed' : 'Mark as Completed'}
                </button>
            `;
            taskList.appendChild(listItem);
        });
    }

    // Call to populate the task list
    populateTaskList();

    // Performance Chart using Chart.js
    const ctx = document.getElementById('employeePerformanceChart').getContext('2d');
    const performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Task 1', 'Task 2', 'Task 3'],
            datasets: [{
                label: 'Performance (%)',
                data: employeeData.performance,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Add new task
    document.getElementById('addTaskBtn').addEventListener('click', () => {
        const taskInput = document.getElementById('newTaskInput');
        const newTaskDescription = taskInput.value.trim();
        if (newTaskDescription) {
            const newTask = { description: newTaskDescription, completed: false };
            storedTasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
            taskInput.value = ''; // Clear the input
            populateTaskList(); // Refresh task list
        }
    });

    // Toggle task completion
    window.toggleTask = function(index) {
        storedTasks[index].completed = !storedTasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
        populateTaskList(); // Refresh task list
    };

    // Add functionality for logout button
    document.getElementById('logoutBtn').addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirect to login page
    });
});
