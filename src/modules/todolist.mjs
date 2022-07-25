import newTask from "./tasks.mjs"
import createProject from "./projects.mjs"


export default class TodoList {
    constructor() {
        this.projects = []
        this.projects.push(createProject("Today"))
        // this.addProject = (name) => projects.push(createProject(name))

    }

    getProject() {
        return this.projects
    }
    
    addProject(name) {
        this.projects.push(createProject(name))
    }

    deleteProject(index) {
        this.projects.splice(index, 1)
    }

    clearProjects(){
        this.projects = []
    }

}


// TodoList.addProject("TESTEEEE")

// var test = new TodoList()
// console.log(test.projects)
