let underline = document.getElementById('uderlinie');
let menus = document.querySelectorAll('section.task-area a');

let addButton = document.getElementById('add-button');
let taskInput = document.getElementById('task-input');
let taskList = [];
addButton.addEventListener('click', addTask);

function addTask() {
  let taskContent = taskInput.value;
  taskList.push(taskContent);
  console.log(taskList);
  render();
}

function render() {
  let resultHTML = '';
  for (let i = 0; i < taskList.length; i++) {
    resultHTML += `<div class="task">
              <div>${taskList[i]}</div>
              <div>
                <button>Check</button>
                <button>Delete</button>
              </div>
            </div>`;
  }

  document.getElementById('task-board').innerHTML = resultHTML;
}

//메뉴 언더라인
menus.forEach(menu =>
  menu.addEventListener('click', e => horizontalIndicator(e))
);

function horizontalIndicator(e) {
  underline.style.left = e.currentTarget.offsetLeft + 'px';
  underline.style.width = e.currentTarget.offsetWidth + 'px';
  underline.style.top =
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight - 5 + 'px';
}
