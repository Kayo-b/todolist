import TodoList from "./todolist.mjs";
import createProject from "./projects.mjs";
import Storage from "./storage.mjs"
import { create } from "lodash";
import { compareAsc, format, formatDistance, subDays} from 'date-fns';

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
        DOM.selectProjOnClick();
    }

    static loadTaskList(projName) {
        let todoList = Storage.getTodoList();
        todoList = todoList.projects;
        let projIndex = DOM.getIndexOfProject(projName);
        let projectTasks = todoList[projIndex].tasks;
        let tasksMenu = document.getElementById("tasks-menu");
        let showTasks = (item) => tasksMenu.innerHTML += `
        <div id="${item.name}" class="taskListing">${item.name}
        <button id="${item.name}edit" class="taskEditButton">Edit</button></div>`
        projectTasks.forEach(showTasks)

    }
    
    //Create Content

    static openProject(projName) {

        let projectList = document.getElementById("tasksList");
        projectList.innerHTML += `<div id="tasks-menu">
          </div>`
        projectList.insertAdjacentHTML("beforeend", `<button id="addtask"><b>+ Add Task</b></button>`)
        DOM.loadTaskList(projName);
    
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

    static taskInput(projName) {
        let taskInput = document.getElementById("tasks-menu");
        taskInput.insertAdjacentHTML("beforeend", `<div id="tasksInputField"> 
        <input type="text" id="${projName}" placeholder="Task Name">
        <input type="submit" id="addTaskButton123" value="Add"></div>`)
        DOM.hideButton("addtask", "yes")
        DOM.addTaskButton();
    }

    static showProjNameInTaskList(projName) {
        let projNameTaskList = document.getElementById("tasksList");
        projNameTaskList.innerHTML = `${projName}`
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
        <input type="submit" id="okEditButton" value="Save">
        <input type="submit" id="delButtonTeste" value="Delete"></div>`;
        DOM.confirmUpdateProj(targetId)

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
        DOM.projectName(projName);
        DOM.showProjNameInTaskList(`${projName}`);
        DOM.taskInput(projName);   
        DOM.addTaskButton();

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

    /*Receives new ID(from input) and old ID(from target) */
    static changeObjName(targetId, newName) {
        var indexOfTargetId = DOM.getIndexOfProject(targetId)
        var newObjProj = DOM.assignMethodsToProjectObj(targetId);
        newObjProj.setName(newName)
        DOM.substituteProjectFromTodoList(indexOfTargetId, newObjProj)
        DOM.removeInnerHTML("projList");
        DOM.loadTodoList();
        
    }

    static addTask(objId, taskName) {
        var indexOfTargetId = DOM.getIndexOfProject(objId)
        var newObj = DOM.assignMethodsToProjectObj(objId);
        const today = format(new Date(), 'dd/MM/yyyy')
        newObj.setTask(taskName, today)
        newObj.isToday();
        DOM.substituteProjectFromTodoList(indexOfTargetId, newObj);
        DOM.removeInnerHTML("projList");
        DOM.loadTodoList();

    }

//-----START-------// OBJECT HANDLING FUNCTIONS //-------START--------//

    /*Receives project id(object) and assigns object from module that contains all the necessary methods(proto methods)*/
    static assignMethodsToProjectObj(projectID) {
        var getTodoList = Storage.getTodoList()
        var indexOfObject = DOM.getIndexOfProject(projectID)
        var newObject = Object.assign(createProject(), getTodoList.projects[indexOfObject])

        return newObject
    }

    //Removes old object and adds new object to the same position
    static substituteProjectFromTodoList(oldProjIndex, newProj) {
        var getTodoList = Storage.getTodoList()
        getTodoList.projects.splice(oldProjIndex, 1, newProj);
        Storage.saveTodoList(getTodoList);
    }


//------END------// OBJECT HANDLING FUNCTIONS //--------END-------//


    /*Reads the new input value and sends it with the old input value to editProject function*/
    static confirmUpdateProj(oldValue) {
        var okEditButton = document.getElementById("okEditButton");
        let newValue = DOM.returnPrevElemSiblingValue(okEditButton)
        
        DOM.deleteProjectButton();  
        okEditButton.addEventListener("click", function() { DOM.changeObjName(oldValue, newValue())});
    }

    static returnPrevElemSiblingValue(elemId) {
        let getValue = () => {
            let returnValue = elemId.previousElementSibling.value;
            return returnValue
        }

        return getValue
    }

    static returnPrevElemSiblingId(elemId) {
        let getValue = () => {
            let returnValue = elemId.previousElementSibling.id;
            return returnValue
        }

        return getValue
    }

    static returnParentNodeValue(elemId) {
        let getValue = function() {
            var getElement = document.getElementById(elemId)
            var returnValue = getElement.parentNode.id;
            return returnValue
        }

        return getValue
    }

    static returnChildNodeId(elemId) {
        let getValue = () => {
            let returnValue = elemId.childNodes[1].id
            return returnValue
        }

        return getValue
    }


    static deleteProjectObj(projId) {
        var projIndex = DOM.getIndexOfProject(projId)
        Storage.deleteProject(projIndex);
        DOM.removeInnerHTML("projList");
        DOM.loadTodoList();
    }

    //Deletes second simbling = removes project from list and from localStorage
    static deleteProjectButton() {
        var deleteButtonTeste = document.getElementById("delButtonTeste");
        var siblingId = DOM.returnPrevElemSiblingId(deleteButtonTeste);
        var delButSibling = document.getElementById(siblingId())
        var siblingId2 = DOM.returnPrevElemSiblingId(delButSibling)
        deleteButtonTeste.addEventListener("click", function(){DOM.deleteProjectObj(siblingId2())})
    }

    /*Gets button parent node ID and sends it to inputField where the input field
    is created in the correct location */
    static getTargetId() {
        document.addEventListener("click", (e) => {
            if(e.target.className != "editButton") return

            let targetId = e.target.parentNode.id

            DOM.inputField(targetId)});

    }

    static selectProjOnClick() {
        let taskListValue = document.getElementById("tasksList")
        document.addEventListener("click", (e) => {
            if(e.target.className != "projListingClass") return

            taskListValue.value = e.target.id;
            DOM.showProjNameInTaskList(`${e.target.id}`)
            DOM.openProject(e.target.id);
            DOM.createTaskButton();
            });
    }

    static addTaskButton() {
        var taskInputButton = document.getElementById("addTaskButton123");
        var taskInputField = document.getElementById("tasksInputField");
        var inputValue = DOM.returnPrevElemSiblingValue(taskInputButton);
        var projectName = DOM.returnChildNodeId(taskInputField)

        taskInputButton.addEventListener("click", function() {DOM.addTask(projectName(), inputValue())});
    }

    static createTaskButton() {
        let projName = document.getElementById("tasksList").value;
        var createButton = document.getElementById("addtask");
        createButton.addEventListener("click", () => DOM.taskInput(projName))
    }

}
