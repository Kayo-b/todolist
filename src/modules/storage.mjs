import createProject from "./projects.mjs";
import newTask from "./tasks.mjs";
import TodoList from "./todolist.mjs";

export default class Storage {
    static saveTodoList(data) {
        localStorage.setItem('todoList', JSON.stringify(data));
        
    }

    static getTodoList() {
        const todoList = Object.assign(
            new TodoList(),
            JSON.parse(localStorage.getItem('todoList')),
        )
        return todoList
        
    }

    static addMethodsToProjectsInTodoList() {
        let todoList = Storage.getTodoList()
        let newProjectArr = []
        for(let x = 0; x < todoList.projects.length; x++){
            let projObjWithMethods = Object.assign(createProject(), todoList.projects[x])
            let tasksObj = projObjWithMethods.tasks
            for(let y = 0; y < tasksObj.length; y++){
                tasksObj[y] = Object.assign(newTask(), tasksObj[y])
        }
            newProjectArr.push(projObjWithMethods)
        }

        todoList.projects = newProjectArr
        console.log(todoList)
        return todoList
    }

    static addProject(project) {
        const todoList = Storage.getTodoList();
        todoList.addProject(project);
        Storage.saveTodoList(todoList)
    }

    static addTask(projIndex, name) {
        const todoList = Storage.getTodoList();
        var projTest = todoList.projects[projIndex]
        projTest.setTask(name)
        Storage.saveTodoList(todoList)

    }

    static deleteProject(index) {
        const todoList = Storage.getTodoList();
        todoList.deleteProject(index);
        Storage.saveTodoList(todoList)
    }

    static deleteTask(projIndex,taskIndex) {
        const todoList = Storage.getTodoList();
        todoList.deleteTask(projIndex,taskIndex);
        Storage.saveTodoList(todoList)
    }
}

// Storage.saveTodoList()

