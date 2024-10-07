document.addEventListener('DOMContentLoaded', () => {
    // Example data for manager
    const managerData = {
        name: 'John Davidson',
        leaves: 10,
        daysAttended: 20,
        messages: 'No new messages',
        employees: [
            { 
                name: 'Employee 1', 
                age: 30, 
                department: 'Development', 
                position: 'Developer', 
                leavesTaken: 3, 
                daysAttended: 15, 
                imgSrc: 'employee1.jpg',
                tasks: ["Fix bugs", "Update dashboard"],
                performance: [75, 80, 85]
            },
            { 
                name: 'Employee 2', 
                age: 28, 
                department: 'Design', 
                position: 'Designer', 
                leavesTaken: 2, 
                daysAttended: 16, 
                imgSrc: 'employee2.jpg',
                tasks: ["Design new icons", "Revise layout"],
                performance: [70, 75, 78]
            }
        ]
    };

    // Update manager info
    document.getElementById('managerName').textContent = managerData.name;
    document.getElementById('managerLeaves').textContent = managerData.leaves;
    document.getElementById('managerDaysAttended').textContent = managerData.daysAttended;
    document.getElementById('managerMessages').textContent = managerData.messages;

    // Populate employee list with more details
    const employeeList = document.getElementById('employeeList');
    managerData.employees.forEach(emp => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex align-items-center';
        listItem.innerHTML = `
            <img src="${emp.imgSrc}" alt="${emp.name}" class="rounded-circle border border-primary mr-3" style="width: 60px; height: 60px; object-fit: cover;">
            <div>
                <h5 class="mb-1">${emp.name}</h5>
                <p class="mb-1">Age: ${emp.age}</p>
                <p class="mb-1">Department: ${emp.department}</p>
                <p class="mb-1">Position: ${emp.position}</p>
                <p class="mb-1">Leaves Taken: ${emp.leavesTaken}</p>
                <p class="mb-1">Days Attended: ${emp.daysAttended}</p>
            </div>
            <button class="btn btn-info btn-sm ml-auto">View Details</button>
        `;
        employeeList.appendChild(listItem);
    });

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToDisplay(task.employee, task.description);
        });
    };

    const addTaskToDisplay = (employee, description) => {
        const taskList = document.createElement('li');
        taskList.className = 'list-group-item';
        taskList.textContent = `Task: "${description}" assigned to ${employee}`;
        document.getElementById('employeeList').appendChild(taskList);
    };

    // Task assignment functionality
    const taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedEmployee = document.getElementById('taskEmployee').value;
        const taskDescription = document.getElementById('taskDescription').value;

        // Store the task in local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ employee: selectedEmployee, description: taskDescription });
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Display the new task
        addTaskToDisplay(selectedEmployee, taskDescription);
        taskForm.reset();
    });

   // Performance Chart using Chart.js with Brown-Themed Colors
const ctx = document.getElementById('performanceChart').getContext('2d');

// Define brown-themed colors
const brownColors = [
    'rgba(210, 105, 30, 0.8)',   // Chocolate Brown
    'rgba(139, 69, 19, 0.8)',    // Saddle Brown
    'rgba(205, 133, 63, 0.8)',   // Peru
    'rgba(188, 143, 143, 0.8)',  // Rosy Brown
    'rgba(210, 180, 140, 0.8)',  // Tan
    'rgba(222, 184, 135, 0.8)'   // Burly Wood
];

const borderColors = brownColors.map(color => color.replace('0.8', '1')); // Fully opaque borders

const performanceChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: managerData.employees.map(emp => emp.name), // Dynamic labels
        datasets: [{
            label: 'Days Attended',
            data: managerData.employees.map(emp => emp.daysAttended),
            backgroundColor: brownColors.slice(0, managerData.employees.length), // Assign colors
            borderColor: borderColors.slice(0, managerData.employees.length),
            borderWidth: 1
        }, {
            label: 'Leaves Taken',
            data: managerData.employees.map(emp => emp.leavesTaken),
            backgroundColor: brownColors.slice(0, managerData.employees.length).map(color => color.replace('0.8', '0.6')), // Slightly transparent
            borderColor: borderColors.slice(0, managerData.employees.length),
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#5D4037' // Dark Brown Y-axis labels
                }
            },
            x: {
                ticks: {
                    color: '#5D4037' // Dark Brown X-axis labels
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#5D4037' // Dark Brown Legend Text
                }
            }
        }
    }
});

    // Add functionality for logout button
    document.getElementById('logoutBtn').addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirect to login page
    });

    // Load existing tasks on page load
    loadTasks();
});
