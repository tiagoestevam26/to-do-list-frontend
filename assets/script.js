let task;
let tasks = [];
let categories = [];


document.getElementById("addTaskBtn").addEventListener("click", function() {
    const name = document.getElementById("taskName").value;
    const description = document.getElementById("taskDescription").value;
    const deadline = document.getElementById("taskDeadline").value;
    const priority = document.getElementById("taskPriority").value;
    const category = document.getElementById("taskCategoryInput").value;
    const status = document.getElementById("taskStatus").value;

    if (!name || !description || !deadline || !priority || !category || !status) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if(categories.indexOf(category) === -1){
        categories.push(category);
    }

    task = {
        name,
        description,
        deadline,
        priority,
        category,
        status
    };


    tasks.push(task);
    updateTaskList();

    console.log(tasks);
    console.log("Categorias: " + categories);

    document.getElementById("taskName").value ="";
    document.getElementById("taskDescription").value="";
    document.getElementById("taskDeadline").value="";
    document.getElementById("taskPriority").value="";
    document.getElementById("taskCategoryInput").value="";
    document.getElementById("taskStatus").value="";

});

document.getElementById("taskCategoryInput").addEventListener("input", function() {
    updateCategorySuggestions();
});

function updateCategorySuggestions() {
    const input = document.getElementById("taskCategoryInput").value.toLowerCase();
    const datalist = document.getElementById("categorySuggestions");
    datalist.innerHTML = "";

    categories.forEach(category => {
        if (category.toLowerCase().includes(input)) {
            const option = document.createElement("option");
            option.value = category;
            datalist.appendChild(option);
        }
    });   
}
function updateTaskList() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.style.border = "1px solid #ccc";
        taskElement.style.padding = "10px";
        taskElement.style.margin = "10px 0";
        taskElement.style.borderRadius = "5px";
        taskElement.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
        taskElement.style.backgroundColor = "#f9f9f9";

        taskElement.innerHTML = `
            <h2 style="margin: 0 0 10px; color: #333;">${task.name}</h2>
            <p style="margin: 0 0 5px; color: #666;">${task.description}</p>
            <p style="margin: 0 0 5px; color: #999;">Prazo: ${task.deadline} | Prioridade: ${task.priority}</p>
            <p style="margin: 0 0 5px; color: #999;">Categoria: ${task.category}</p>
            <p style="margin: 0; color: ${task.status === 'done' ? 'green' : 'red'};">Status: ${task.status}</p>
            <br>
            <a href="#" class="editTask" data-index="${index}" style="color: blue; text-decoration: underline; cursor: pointer;">Editar</a>
            <a href="#" style="color: blue;">|</a>
            <a href="#" class="deleteTask" data-index="${index}" style="color: blue; text-decoration: underline; cursor: pointer;">Excluir</a>  
        `;
        taskList.appendChild(taskElement);
    });

    document.querySelectorAll(".editTask").forEach(button => {
        button.addEventListener("click", function() {
            const index = this.getAttribute("data-index");
            editTask(index);
        });
    });

    document.querySelectorAll(".deleteTask").forEach(button => {
        button.addEventListener("click", function() {
            const index = this.getAttribute("data-index");
            deleteTask(index);
        });
    });
}
function editTask(index) {
    const task = tasks[index];

    document.getElementById("taskName").value = task.name;
    document.getElementById("taskDescription").value = task.description;
    document.getElementById("taskDeadline").value = task.deadline;
    document.getElementById("taskPriority").value = task.priority;
    document.getElementById("taskCategoryInput").value = task.category;
    document.getElementById("taskStatus").value = task.status;

    document.getElementById("addTaskBtn").style.display = "none";
    const saveBtn = document.createElement("button");
    saveBtn.id = "saveTaskBtn";
    saveBtn.innerText = "Salvar";
    document.getElementById("taskForm").appendChild(saveBtn);

    saveBtn.addEventListener("click", function() {
        task.name = document.getElementById("taskName").value;
        task.description = document.getElementById("taskDescription").value;
        task.deadline = document.getElementById("taskDeadline").value;
        task.priority = document.getElementById("taskPriority").value;
        task.category = document.getElementById("taskCategoryInput").value;
        task.status = document.getElementById("taskStatus").value;

        updateTaskList();
        document.getElementById("taskForm").removeChild(saveBtn);
        document.getElementById("addTaskBtn").style.display = "inline-block";

        document.getElementById("taskName").value ="";
        document.getElementById("taskDescription").value="";
        document.getElementById("taskDeadline").value="";
        document.getElementById("taskPriority").value="";
        document.getElementById("taskCategoryInput").value="";
        document.getElementById("taskStatus").value="";
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
}
