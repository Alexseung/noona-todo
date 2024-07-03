let underline = document.getElementById('uderlinie');
let menus = document.querySelectorAll('section.task-area a');

let addButton = document.getElementById('add-button');
let taskInput = document.getElementById('task-input');
let showAll = document.getElementById('show-all');
let taskOngoing = document.getElementById('task-ongoing');
let taskDone = document.getElementById('task-done');
let taskList = [];
let filterList = []; //기본을 taskList로 잡고 isComplete에따라 새로운 배열에 넣기위한 배열
let currentTab = 'show-all';
//현재 어떤 tab에 있는지 나타낼 수 있고 해당 tab를 누르면 render()을 다시 실행해서 목록을 보여줌
showAll.addEventListener('click', () => {
  currentTab = 'show-all';
  render();
});

taskOngoing.addEventListener('click', () => {
  currentTab = 'task-ongoing';
  filter();
});

taskDone.addEventListener('click', () => {
  currentTab = 'task-done';
  filter();
});

function filter() {
  filterList = [];
  if (currentTab === 'task-ongoing') {
    for (let task of taskList) {
      if (task.isComplete === false) {
        filterList.push(task);
      }
    }
    render();
  } else if (currentTab === 'task-done') {
    for (let task of taskList) {
      if (task.isComplete === true) {
        filterList.push(task);
      }
    }
    render();
  }
}

addButton.addEventListener('click', addTask);
taskInput.addEventListener('keydown', handleKeyDown);
function handleKeyDown(event) {
  if (event.key === 'Enter') {
    addTask();
  }
}

function addTask() {
  if (taskInput.value == '') {
    alert('할 일을 써넣으셔야죠!');
    return;
  }
  let task = {
    id: randomIdGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  taskInput.value = '';
  render();
}

function render() {
  let list = [];
  if (currentTab === 'show-all') {
    list = taskList;
  } else if (currentTab === 'task-ongoing' || currentTab === 'task-done') {
    list = filterList;
  }
  let resultHTML = '';
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task task-done">
              <div>${list[i].taskContent}</div>
              <div>
                <button onClick="toggleBtn('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
                <button onClick="deleteBtn('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
              </div>
            </div>`;
    } else {
      resultHTML += `<div class="task">
                <div>${list[i].taskContent}</div>
                <div>
                  <button onClick="toggleBtn('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                  <button onClick="deleteBtn('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
              </div>`;
    }
  }
  document.getElementById('task-board').innerHTML = resultHTML;
}

function toggleBtn(id) {
  for (i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  if (currentTab === 'task-ongoing') {
    filterList = taskList.filter(task => !task.isComplete); //false가 filterList에 남아있게
  } else if (currentTab === 'task-done') {
    filterList = taskList.filter(task => task.isComplete); //true가 filterList에 남아있게
  }
  console.log(taskList);
  render();
}

//코알누 유튜브에서 filter가 나와서 filter로 코드 짧게 바꿈
function deleteBtn(id) {
  taskList = taskList.filter(task => task.id !== id);
  console.log(taskList);
  if (currentTab === 'show-all') {
    render();
  } else {
    filter();
  }
  // for (i = 0; i < taskList.length; i++) {
  //   if (taskList[i].id == id) {
  //     taskList.splice(i, 1);
  //     break;
  //   }
  // }
  // console.log(taskList);
  // render();
}

function randomIdGenerate() {
  return '_' + Math.random().toString(36).substr(2, 9);
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
