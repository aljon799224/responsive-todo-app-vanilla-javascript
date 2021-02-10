const toDoInput = document.querySelector(".todo-input");
const toDoButton = document.querySelector(".todo-button");
const toDoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//eventlisteners
document.addEventListener("DOMContentLoaded", getTodos);
toDoButton.addEventListener("click", addToDo);
toDoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterToDo);

function addToDo(e) {
  e.preventDefault();

  const toDoDiv = document.createElement("div");
  toDoDiv.classList.add("todo");

  //create li
  const newToDo = document.createElement("li");
  newToDo.innerText = toDoInput.value;
  newToDo.classList.add("todo-item");
  toDoDiv.appendChild(newToDo);

  //add todo local storage
  saveLocalTodos(toDoInput.value);

  //create checked button
  const completedButton = document.createElement("button");
  completedButton.classList.add("complete-btn");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  toDoDiv.appendChild(completedButton);

  //create delete button

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
  toDoDiv.appendChild(deleteButton);

  toDoList.appendChild(toDoDiv);
  //clear
  toDoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  console.log(item.classList[0]);
  //delete
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalToDos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //check
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    // todo.classList.toggle("grow");
    todo.classList.toggle("completed");
  }
}

//filter
function filterToDo(e) {
  const todos = toDoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//save local storage
function saveLocalTodos(todo) {
  //check
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// load todos

function getTodos() {
  //check
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");

    //create li
    const newToDo = document.createElement("li");
    newToDo.innerText = todo;
    newToDo.classList.add("todo-item");
    toDoDiv.appendChild(newToDo);

    //create checked button
    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    toDoDiv.appendChild(completedButton);

    //create delete button

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
    toDoDiv.appendChild(deleteButton);

    toDoList.appendChild(toDoDiv);
  });
}

function removeLocalToDos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const toDoIndex = todo.children[0].innerText;
  //   todos.splice(todos.indexOf(toDoIndex), 1);
  todos.splice(todos.indexOf(toDoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
