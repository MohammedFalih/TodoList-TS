import { v4 as uuid } from 'uuid';

const form = document.getElementById('new-task-form') as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>('#new-task-title');
const list = document.querySelector<HTMLUListElement>('#list');

type Task = {
    id: string
    title: string
    completed: boolean
    createdAt: Date
}

const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener("submit", e => {
    e.preventDefault();

    if (input?.value == "" || input?.value == null) return;

    const newTask: Task = {
        id: uuid(),
        title: input.value,
        completed: false,
        createdAt: new Date()
    }

    tasks.push(newTask);
    saveTasks();
    addListItem(newTask);
    input.value = "";
})

function addListItem(task: Task) {
    const item = document.createElement('li');
    const label = document.createElement('label');
    const checkBox = document.createElement('input');

    checkBox.addEventListener('change', () => {
        task.completed = checkBox.checked;
        saveTasks();
    })
    checkBox.type = "checkbox";
    checkBox.checked = task.completed;

    //appending elements
    label.append(checkBox, task.title);
    item.append(label);
    list?.append(item);
}

function saveTasks() {
    localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
    const taskJSON = localStorage.getItem("TASKS");
    if (taskJSON == null) return[];
    return JSON.parse(taskJSON);
}