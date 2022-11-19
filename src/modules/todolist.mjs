// import newTask from "./tasks.mjs"
import createProject from "./projects.mjs"


export default class TodoList {
    constructor() {
        this.projects = [];
        this.projects.push(createProject("Due / Overdue Tasks","desc teste"));

    }

    getProjects() {
        return this.projects;
    }
    
    addProject(project) {
        
        this.projects.push(createProject(project));
    }

    editProject(project) {
        this.projects.splice()
    }

    deleteProject(index) {
        this.projects.splice(index, 1);
    }

    clearProjects() {
        this.projects = [];
    }

    todayTask() {
        for(let x = 0; x < this.projects.length; x++) {
            for(let y = 0; y < this.projects[x].todayArr.length; y++) {              
                this.projects[0].tasks.push(this.projects[x].todayArr[y])
            }
            }
             
    }

}

