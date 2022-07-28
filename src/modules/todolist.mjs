// import newTask from "./tasks.mjs"
import createProject from "./projects.mjs"


export default class TodoList {
    constructor() {
        this.projects = []
        this.projects.push(createProject("Today"))
        // this.addProject = (name) => projects.push(createProject(name))

    }

    static getProjects() {
        return this.projects
    }
    
    static addProject(name) {
        this.projects.push(createProject(name))
    }

    static deleteProject(index) {
        this.projects.splice(index, 1)
    }

    static clearProjects(){
        this.projects = []
    }

}


// TodoList.addProject("TESTEEEE")
// TodoList.getProjects()

// var test = new TodoList()
// console.log(test.projects)
