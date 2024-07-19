const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");  // == documnet.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
    
    const li = document.createElement("li");
    li.id = newTodo.id;

    const item = document.createElement("div");

    const check = document.createElement("input");
    check.type = 'checkbox';
    check.value = li.id;
    if(newTodo.checked === 'checked') check.checked = true;
    
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    if(newTodo.checked === 'checked') span.style.textDecoration='line-through'

    const button = document.createElement("span");
    button.innerText = "❌";
    button.className = "toDo__button";
    button.addEventListener("click", deleteToDo);
    
    item.appendChild(check);
    item.appendChild(span);
    item.appendChild(button);
    li.appendChild(item);
    toDoList.appendChild(li);

    check.addEventListener('change', (event) =>{ 
        let isCheck = event.currentTarget.checked ? "checked" : "";
        let checkTodo = toDos.filter((toDo) => toDo.id === parseInt(event.currentTarget.value));
        checkTodo[0].checked = isCheck;
        saveToDos();

        if (event.currentTarget.checked)
        {
            span.style.textDecoration='line-through'
        }
        else {
            span.style.textDecoration='none'
        }
    });

}

function handleToDoSubmit(event) {
  event.preventDefault();
  
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
    checked: ""
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}