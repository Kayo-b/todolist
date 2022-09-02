// var test = new TodoList()
// test.addProject()
// console.log(test.getProjects())
// var newProj = test.getProjects()[0]
// newProj.setName("testeNameEdit")
// newProj.setTask("This is a new task", "task note")
// var newTask = newProj.tasks[0]
// newTask.setName("new name")
// console.log(newTask.getName())
import TodoList from "./todolist.mjs";
import Storage from "./storage.mjs"

export default class DOM {
    
    //Create Content

    static openProject() {
        let projectList = document.getElementById("tasksList");
        projectList.innerHTML += `<div id="tasks-menu">
            <h3>Proj Name</h2>
            <button id="addtask"><b>+ Add Task</b></button>
          </div>`
    }

    static projectsList() {
        let projectsList = document.getElementById("projList");
        projectsList.innerHTML += `<div id="listElement">
        <input type="text" id="projname" placeholder="Project Name">
        <input type="submit" id="okButton" value="Ok"></div>`

        DOM.confirmNewProj();
    }

   
    // Event Listeners

    static newProject() {
        var addProjButton = document.getElementById("addproject");
        addProjButton.addEventListener("click", DOM.projectsList)

    }

    static createProjObject() {
        let projName = document.getElementById("projname").value;
        console.log(projName)
        
    }

    static confirmNewProj() {
        let okButton = document.getElementById("okButton");
        okButton.addEventListener("click", DOM.createProjObject)
    }

    // static clickOnProject() {
    //     var addProjButton = document.getElementById("addproject");
    //     addProjButton.addEventListener("click", DOM.projectsList)
    // }
    
}
// var newTodo = new TodoList
// newTodo.addProject("TESTEEEE","description")
// console.log(newTodo.getProjects())


// var teste = new TodoList()
// teste.addProject("testeeee")
// console.log(teste.getProjects())