import TodoList from "./todolist.mjs";
import createProject from "./projects.mjs";
import Storage from "./storage.mjs"
import { create } from "lodash";

export default class DOM {

    //Content Loader

    static loadContent() {
        DOM.newProject();
        DOM.getTargetId();
        DOM.createProjObject();
        DOM.loadTodoList();
        
        
    }

    /*Gets todoList from localStorage and renders it on the page */
    static loadTodoList() {
        let todoList = Storage.getTodoList()
        todoList = todoList.projects
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
        <input type="submit" id="okButton" value="Ok">
        <input type="submit" id="cancelButton" value="Cancel"></div>`

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

    static removeInnerHTML(value) {

        let target = document.getElementById(value);
        target.innerHTML = ""

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

    static inputField(targetId) {
        let projectsList = document.getElementById(`${targetId}`);
        projectsList.innerHTML = `<div id="inputElement">
        <input type="text" id="${targetId}" placeholder="Project Name" value="${targetId}">
        <input type="submit" id="okEditButton" value="Ok">
        <input type="submit" id="delButton" value="Delete"></div>`;
        DOM.confirmUpdateProj(targetId)
        DOM.deleteProject();

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
        DOM.hideButton("addproject", "no")
        DOM.removeDiv("inputElement")
        DOM.showProjNameInTaskList(projName)
        DOM.projectName(projName);
        DOM.tasksList();      

    }

    static confirmNewProj() {
        let okButton = document.getElementById("okButton");
        okButton.addEventListener("click", DOM.createProjObject);  
    }

    static getIndexOfProject(projID) {
        var getTodoList = Storage.getTodoList();
        var indexOfTargetId = getTodoList.projects.map(x => x.name).indexOf(`${projID}`);
        return indexOfTargetId;
    }

    /*Receives new and old inputs, finds out old input index and  */
    static editProject(targetId, newName) {
        var getTodoList = Storage.getTodoList()
        var indexOfTargetId = DOM.getIndexOfProject(targetId)
        var newObjProj = Object.assign(createProject(), getTodoList.projects[indexOfTargetId])
        newObjProj.setName(newName)
        getTodoList.projects.splice(indexOfTargetId, 1, newObjProj)
        DOM.removeInnerHTML("projList")
        DOM.showProjNameInTaskList(newName)
        Storage.saveTodoList(getTodoList);
        DOM.loadTodoList();
        
    }

    /*Reads the new input value and sends it with the old input value to editProject function*/
    static confirmUpdateProj(oldValue) {
        var okEditButton = document.getElementById("okEditButton");
        var newValue = () => {
            var newValue = okEditButton.previousElementSibling.value;
            console.log(newValue);
            return newValue}
        okEditButton.addEventListener("click", function() { DOM.editProject(oldValue, newValue())});
          
    }

    static deleteProject() {
        var deleteButton = document.getElementById("delButton");
        deleteButton.addEventListener("click", () => console.log("testeDelete"))
    }

    /*Gets button parent node ID and sends it to inputField where the input field
    is created in the correct location */
    static getTargetId() {
        document.addEventListener("click", (e) => {
            if(e.target.className != "editButton") return

            let targetId = e.target.parentNode.id

            DOM.inputField(targetId)});

    }


}
