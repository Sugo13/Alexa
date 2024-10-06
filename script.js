function checkCheckBox(value) {
  let counter = 0;
  for (let i = 1; i <= value; i++)
  {
    const checkbox = document.getElementById(i.toString());
    if (checkbox.checked)
      continue;
    else
      counter++;
  }
  return counter;
}

function checkTodo() {
  const items = document.querySelectorAll('.list-group-item');

  for (let i = 1; i <= items.length; i++)
  {
    const checkbox = document.getElementById(i.toString());

    checkbox.addEventListener("change", function() {
      setUncheckedCountElement(items.length);
      let todos = setData(items.length);

      render(todos);
    });
  }
}

function setItemCountElement(value)
{
  const itemCountElement = document.getElementById('item-count');
  itemCountElement.textContent = value;
}
function setUncheckedCountElement(value)
{
  const uncheckedCountElement = document.getElementById('unchecked-count');
  uncheckedCountElement.textContent = checkCheckBox(value);
}
function updateCounter(num)
{
  setItemCountElement(num);
  setUncheckedCountElement(num);
}
function setData(value) {
  let data = new Set();

  let counter = 0;

  for (let i = 1; i <= value; i++)
  {
    const checkbox = document.getElementById(i.toString());

    let todo_ = new Map();

    if (checkbox.checked)
      todo_.set('ischeck', true);
    else
      todo_.set('ischeck', false);

    let spans = document.getElementsByTagName("span");

    todo_.set('text', spans[counter + 4].textContent);

    data.add(todo_);

    counter++;
  }

  return data;
}

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

const items = document.querySelectorAll('.list-group-item');

let data = setData(items.length);

checkTodo();
updateCounter(items.length);

function render(todos)
{
  let renderedTodos = new Set();
  let content = '';
  let counter = 1;

  todos.forEach(function(value) {
    if (value.get('ischeck') === false) {
      renderedTodos.add('<li class="list-group-item">\n<input type="checkbox" class="form-check-input me-2" id="'+ counter + '" />\n<label for="'+ counter + '"><span class="  ">' + value.get('text') + '</span></label>\n<button class="btn btn-danger btn-sm float-end" onClick="deleteTodo(' + counter + ')">delete</button>\n</li>');
    }
    else if (value.get('ischeck') === true) {
      renderedTodos.add('<li class="list-group-item">\n<input type="checkbox" class="form-check-input me-2" id="'+ counter + '" checked />\n<label for="'+ counter + '"><span class="text-success text-decoration-line-through">' + value.get('text') + '</span></label>\n<button class="btn btn-danger btn-sm float-end" onClick="deleteTodo(' + counter + ')">delete</button>\n</li>');
    }

    counter++;
  });

  renderedTodos.forEach(function(value){
    content += value;
  });

  list.innerHTML = content;

  checkTodo();
  updateCounter(counter - 1);
}

function newTodo() {
  let todo_name = prompt("Введіть назву завдання: ");

  const items = document.querySelectorAll('.list-group-item');

  let data = setData(items.length);

  if (todo_name)
  {
    let todo_ = new Map();

    todo_.set('ischeck', false);
    todo_.set('text', todo_name);

    console.log(data);
    data.add(todo_);

    renderTodo(data);
  }
    
  else
    alert("Ви нічого не ввели!");
}

function deleteTodo(num) {
  console.log(num);

  const items = document.querySelectorAll('.list-group-item');

  let todos = setData(items.length);
  let counter = 1;

  todos.forEach(function(value){
    if (counter === num) {
      todos.delete(value);
    }
    counter++;
  });

  render(todos);
}

function renderTodo(data)
{
  render(data);
}


