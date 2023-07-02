const input = document.querySelector('.elName');
const todo = document.querySelector('.todo-cont');
const done = document.querySelector('.done-cont');

let arrTodo = [];
let arrDone = [];

function addElem() {
    if(input.value.length >= 3){
        arrTodo.push(input.value)
        input.value = ""
        saveData()
        render()
    } else{
        alert('Please enter more letters')
    }
}

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

function render() {
    todo.innerHTML = ''
    done.innerHTML = ''
    arrTodo = JSON.parse(localStorage.getItem("todo"))
    arrDone = JSON.parse(localStorage.getItem("done"))

    arrTodo.forEach(element => {
        let elemToDo = document.createElement('div')
        elemToDo.textContent = element
        elemToDo.classList.add('listElementBtn')
        elemToDo.classList.add('red')
        elemToDo.onclick = () => {
            moveToDone(element)
        }
        todo.append(elemToDo)
    });

    arrDone.forEach(element => {
        let elemDone = document.createElement('div')
        elemDone.textContent = element
        elemDone.classList.add('listElementBtn')
        elemDone.classList.add('green')
        elemDone.onclick = () => {
            moveToToDo(element)
        }
        done.append(elemDone)
    });
}

render()