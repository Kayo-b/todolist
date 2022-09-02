import createProject from "./projects.mjs";
import newTask from "./tasks.mjs";
import TodoList from "./todolist.mjs";

export default class Storage {
    static saveTodoList(data) {
        localStorage.setItem('todoList', JSON.stringify(data))
    }

    // static getTodoList() {
    //     const todoList = Object.assign(
    //         new TodoList(),
    //         JSON.parse(localStorage.getItem('todoList'))
    //     )
    //         return todoList
        
    // }
}

Storage.saveTodoList()

