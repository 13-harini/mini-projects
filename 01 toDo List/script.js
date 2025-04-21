const form = document.querySelector("form");
const input = document.querySelector("#input");
const todos = document.querySelector(".todo-list");
const clear = document.querySelector(".clear");
const clearBox = document.querySelector(".clear-box");
const exits = document.querySelector(".exist");
let todoList = [];
window.onload = () => {
  todoList = JSON.parse(localStorage.getItem("todoList")) || [];
  todoList.forEach((v) => {
    adding(v);
  });
};
function createtodo(value) {
  localStorage.setItem("todoList", JSON.stringify(todoList));
  const todo = document.createElement("div");
  const tEl = document.createElement("span");
  tEl.innerText = value[0].toUpperCase() + value.slice(1);
  todo.appendChild(tEl);
  todo.classList.add("todo");
  const cross = document.createElement("span");
  cross.innerHTML = "&times;";
  cross.classList.add("delete");
  cross.addEventListener("click", () => {
    const index = todoList.findIndex(
      (item) => item.toLowerCase() === value.toLowerCase()
    );
    if (index > -1) {
      todoList.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }

    localStorage.setItem("todoList", JSON.stringify(todoList));

    todos.removeChild(todo);
    if (todos.children.length === 0) {
      clearBox.classList.remove("block");
    }
  });
  todo.appendChild(cross);
  return todo;
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let value = input.value.trim();
  if (!value) {
    return;
  } // Prevent empty input
  let t = todoList.some((v) => v.toLowerCase() === value.toLowerCase());
  if (t) {
    exits.style.transform = `translateX(0%)`;
    exits.style.opacity = 100;
    setTimeout(() => {
      exits.style.transform = `translateX(100%)`;
      exits.style.opacity = 0;
    }, 2000);
    input.value = "";
    return;
  }
  todoList.push(value);
  adding(value);
  input.value = "";
});

clear.addEventListener("click", () => {
  todos.innerHTML = ``;
  todoList.length = 0;
  localStorage.setItem("todoList", JSON.stringify([]));

  clearBox.classList.remove("block");
});
function adding(value) {
  if (!value.trim()) return;
  todos.appendChild(createtodo(value));
  if (todos.children.length > 0 && !clearBox.classList.contains("block")) {
    clearBox.classList.add("block");
  }
}
