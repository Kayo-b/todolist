// import newTask from "./tasks.mjs"
import createProject from "./projects.mjs"


export default class TodoList {
    constructor() {
        this.projects = [];
        this.projects.push(createProject("Today","desc teste"));

    }

    getProjects() {
        return this.projects;
    }
    
    addProject(project) {
        this.projects.push(createProject(project));
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


// var test = new TodoList
// test.addProject(createProject("NAME!", "DESC#"));
// var newProj = test.projects[1]
// newProj.setTask("nameTask", "07/08/2022")
// newProj.setTask("nameTask-2", "07/08/2022")
// newProj.isToday()
// test.todayTask()
// console.log(test.projects[1])
// console.log(test.projects[0].tasks)

