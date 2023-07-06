const input = document.querySelector('.elName');
const todo = document.querySelector('.todo-cont');
const done = document.querySelector('.done-cont');

let arrTodo = [];
let arrDone = [];

function addElem() {
    input.value = input.value.trim();
    if(input.value.length >= 3){
        console.log(arrTodo)
        arrTodo.push(input.value)
        input.value = ""
        saveData()
        render()
    } else{
        alert('Please enter more letters')
    }
}

input.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addElem();
    }
  });

function saveData() {
    localStorage.setItem("todo", JSON.stringify(arrTodo))
    localStorage.setItem("done", JSON.stringify(arrDone))
}

function moveToDone(elem) {
    let arrIdx = arrTodo.indexOf(elem)
    arrTodo.splice(arrIdx, 1) 
    arrDone.push(elem)
    saveData()
    render()
}

function moveToToDo(elem) {
    let arrIdx = arrDone.indexOf(elem)
    arrDone.splice(arrIdx, 1) 
    arrTodo.push(elem)
    saveData()
    render()
}

function deleteElem(elem) {
    if(arrTodo.includes(elem)) {
        let arrIdx = arrTodo.indexOf(elem)
        arrTodo.splice(arrIdx, 1) 
        console.log("to do")
    }else{
        let arrIdx = arrDone.indexOf(elem)
        arrDone.splice(arrIdx, 1) 
        console.log("done")
    }
    saveData()
    render()
}

function render() {
    todo.innerHTML = ''
    done.innerHTML = ''
    if(JSON.parse(localStorage.getItem("todo"))!== null && JSON.parse(localStorage.getItem("done")) !== null) {
        arrTodo = JSON.parse(localStorage.getItem("todo"))
        arrDone = JSON.parse(localStorage.getItem("done"))
    }
    

    arrTodo.forEach(element => {
        let elemToDo = document.createElement('div');
        elemToDo.classList.add('cont');

        const listElementBtn = document.createElement('div');
        listElementBtn.classList.add('listElementBtn');
        listElementBtn.classList.add('red');

        const buttonDelete = document.createElement('div');
        buttonDelete.classList.add('button-delete');
        buttonDelete.textContent = '❌';
        buttonDelete.onclick = () => {
            deleteElem(element)
        }

        elemToDo.appendChild(listElementBtn);
        elemToDo.appendChild(buttonDelete);

        listElementBtn.textContent = element
        listElementBtn.onclick = () => {
            moveToDone(element)
        }
        todo.append(elemToDo)
    });

    arrDone.forEach(element => {
        let elemDone = document.createElement('div');
        elemDone.classList.add('cont');

        const listElementBtn = document.createElement('div');
        listElementBtn.classList.add('listElementBtn');
        listElementBtn.classList.add('green');

        const buttonDelete = document.createElement('div');
        buttonDelete.classList.add('button-delete');
        buttonDelete.textContent = '❌';
        buttonDelete.onclick = () => {
            deleteElem(element)
        }

        elemDone.appendChild(listElementBtn);
        elemDone.appendChild(buttonDelete);

        listElementBtn.textContent = element
        listElementBtn.onclick = () => {
            moveToToDo(element)
        }
        done.append(elemDone)
    });
}

render()


// settings / main

const mainBlock = document.querySelector('.main-cont')
const settBlock = document.querySelector('.settings-cont')
const aboutBlock = document.querySelector('.about-cont')
const mainBth = document.querySelector('.logo_task')
const settBtn = document.querySelector('.logo_settings')
const aboutBtn = document.querySelector('.logo_about')

const page = document.querySelector("html")
const ltBtn = document.querySelector('.LTBtn')
const dtBtn = document.querySelector('.DTBtn')

function openSett() {
    mainBlock.style.display = 'none'
    settBlock.style.display = 'block'
    aboutBlock.style.display = 'none'

    settBtn.classList.add('picked')
    settBtn.classList.remove('unpicked')
    mainBth.classList.remove('picked')
    mainBth.classList.add('unpicked')
    aboutBtn.classList.remove('picked')
    aboutBtn.classList.add('unpicked')
}

function openMain() {
    mainBlock.style.display = 'block'
    settBlock.style.display = 'none'
    aboutBlock.style.display = 'none'
    
    mainBth.classList.add('picked')
    mainBth.classList.remove('unpicked')
    settBtn.classList.remove('picked')
    settBtn.classList.add('unpicked')
    aboutBtn.classList.remove('picked')
    aboutBtn.classList.add('unpicked')
}

function openAbout() {
    mainBlock.style.display = 'none'
    settBlock.style.display = 'none'
    aboutBlock.style.display = 'block'
    
    mainBth.classList.remove('picked')
    mainBth.classList.add('unpicked')
    settBtn.classList.remove('picked')
    settBtn.classList.add('unpicked')
    aboutBtn.classList.remove('unpicked')
    aboutBtn.classList.add('picked')
}

function lightThemeSwitch(){
    page.classList.remove("dark-theme");
    page.classList.add("light-theme");

    ltBtn.classList.add("t-btn-picked");
    dtBtn.classList.remove("t-btn-picked");

    localStorage.setItem("theme", JSON.stringify("light-theme"));
}

function darkThemeSwitch(){
    page.classList.add("dark-theme");
    page.classList.remove("light-theme");

    ltBtn.classList.remove("t-btn-picked");
    dtBtn.classList.add("t-btn-picked");

    localStorage.setItem("theme", JSON.stringify("dark-theme"));
}

function settingUp(){
    if(localStorage.getItem("theme")==null){
        if(window.matchMedia('(prefers-color-scheme: dark)').matches){
            darkThemeSwitch();
        }else{
            lightThemeSwitch();
        }
    }else{
        if(JSON.parse(localStorage.getItem("theme")) === "dark-theme"){
            darkThemeSwitch();
        }else{
            lightThemeSwitch();
        }
    }
}

settingUp();
