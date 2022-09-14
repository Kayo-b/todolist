import TodoList from "./todolist.mjs";
import createProject from "./projects.mjs";
import Storage from "./storage.mjs"
import { create } from "lodash";

export default class DOM {

    //Content Loader

    static loadContent() {
        DOM.editProject();
        DOM.newProject();
        DOM.createProjObject();
        DOM.loadTodoList();
        
    }

    static loadTodoList() {
        let todoList = Storage.getTodoList()
        todoList = todoList.projects
        console.log(todoList)
        let projectsList = document.getElementById("projList");
        let showNameFunc = (item) => projectsList.innerHTML += `
        <div id="${item.name}" class="projListingClass">${item.name}
        <button id="${item.name}edit" class="editButton">Edit</button></div>`
        todoList.forEach(showNameFunc)
    }
    
    //Create Content

    static openProject() {
        let projectList = document.getElementById("tasksList");
        projectList.innerHTML += `<div id="tasks-menu">
            <h3>Proj Name</h2>
            <button id="addtask"><b>+ Add Task</b></button>
          </div>`
    }

    static projectsNameInput() {
        let projectsList = document.getElementById("projList");
        projectsList.innerHTML += `<div id="inputElement">
        <input type="text" id="projname" placeholder="Project Name">
        <input type="submit" id="okButton" value="Ok"></div>`

        DOM.confirmNewProj();
        DOM.hideButton("addproject", "yes")
    }

    static projectName(name) {
        let projectsList = document.getElementById("projList");
        projectsList.innerHTML += `<div id="${name}" class="projListingClass">${name} 
        <button ="${name}edit" class="editButton">Edit</button></div>`
        
    }


    static tasksList() {
        let tasksList = document.getElementById("tasksList");
        tasksList.innerHTML += `<div id="tasksElement"> 
        <input type="text" id="taskname" placeholder="Task Name">
        <input type="submit" id="addTaskButton" value="Add"></div>`
    }

    static showProjNameInTaskList(projName) {
        let projNameTaskList = document.getElementById("projNameTaskList");
        projNameTaskList.innerText = `${projName} Tasks`
    }
   
    static removeDiv(value) {

        let target = document.getElementById(value);
        target.remove()

    }

    static hideButton(targetId, hide) {
        let target = document.getElementById(targetId);
        
        if(hide == "yes"){
           target.style.display = "none"
        }
        else if(hide == "no") {
            target.style.display = "block"
        }


    }
    // Event Listeners

    static newProject() {
        
        var addProjButton = document.getElementById("addproject");
        addProjButton.addEventListener("click", DOM.projectsNameInput);

    }

    static createProjObject() {
        let projName = document.getElementById("projname").value;

        if(projName == "") return alert("Please inform the project's name");
        Storage.addProject(projName)
        var name = Storage.getTodoList()
        // var nameProject = Object.assign(createProject(), name.projects[1])
        // nameProject.setName("setNameTeste")
        // Storage.addProject(nameProject)
        DOM.hideButton("addproject", "no")
        DOM.removeDiv("inputElement")
        DOM.showProjNameInTaskList(projName)
        DOM.projectName(projName);
        DOM.tasksList();      
        console.log("TESTE LOAD CONTENT")
    }

    static confirmNewProj() {
        let okButton = document.getElementById("okButton");
        okButton.addEventListener("click", DOM.createProjObject);  
    }

    static editProject() {
        // var getProjName = document.getElementById(projName)

        var getTodoList = Storage.getTodoList()
        var nameProject = Object.assign(createProject(), getTodoList.projects)
        // let testbutton = document.getElementById("projList");
        // testbutton = testbutton.children
        // let getClassNameFunc = (e) => {
        //     var targetClass = e.target.class
        //     console.log(targetClass)
        // }

        document.addEventListener("click", (e) => {
            if(e.target.className == "editButton"){
                var targetClass = e.target.parentNode.id
                 console.log(targetClass)}})

        console.log("TESTE LOAD CONTENT")
    }
}
