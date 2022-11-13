import TodoList from "./todolist.mjs";
import createProject from "./projects.mjs";
import Storage from "./storage.mjs"
import newTask from "./tasks.mjs";
import { create } from "lodash";
import { compareAsc, format, formatDistance, setDate, subDays} from 'date-fns';

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
        let showNameFunc = (item) => {
        if(item.name != "Tasks due for today") {
        projectsList.innerHTML += `
        <div id="${item.name}" class="projListingClass">${item.name}
        <div id="${item.name} edit" class="editButton"></div></div>`
    }
        else if(item.name == "Tasks due for today"){
            projectsList.innerHTML += `
            <div id="${item.name}" class="projListingClass">${item.name}`
        }
    }
        todoList.forEach(showNameFunc)
        DOM.selectProjOnClick();
    }

    static loadTaskList(projName) {
        let todoList = Storage.getTodoList();
        todoList = todoList.projects;
        let projIndex = DOM.getIndexOfProject(projName);
        let projectTasks = todoList[projIndex].tasks;
        let projectList = document.getElementById("tasksList");
        projectList.innerHTML = `${projName}<div id="tasks-menu">
          </div>`
        if(projName != "Tasks due for today"){
            projectList.insertAdjacentHTML("beforeend", `<button id="addtask"><b>+ Add Task</b></button>`)    
        }
        
        let tasksMenu = document.getElementById("tasks-menu");
        let showTasks = (item) => {
            if(item.done === true) {
                tasksMenu.innerHTML += `
                <div id="${item.name}" class="${projName}"><s>${item.name}</s>
                <button id="${item.name}" class="taskDeleteButton">X</button></div>`
    }
            if(item.dueDate == null && item.done == false) {
                tasksMenu.innerHTML += `
                <div id="taskList"><input id="${item.name}" class="${projName}" type="checkbox">${item.name}
                <input type="date" id="${item.name}" class="${projName}" min="2018-01-01" max="2030-12-31">`}

            if(item.dueDate != null && item.done == false)
                tasksMenu.innerHTML += `
                <div id="taskList"><input id="${item.name}" class="${projName}" type="checkbox">${item.name}
                <input type="date" id="${item.name}" class="${projName}" value="${item.dueDate}" min="2018-01-01" max="2030-12-31">`    
            }
        projectTasks.forEach(showTasks);
        DOM.taskCheck();
        DOM.deleteTaskButton();
        DOM.setDateButton();
        DOM.checkIfDueDateIsToday();
    }
        
    static checkIfDueDateIsToday() {
        let todoList = Storage.addMethodsToProjectsInTodoList();
        let projects = todoList.projects;
        for(let x = 0; x < projects.length; x++){
            let tasks = projects[x].tasks;
            for(let i = 0; i < tasks.length; i++){
                projects[x].isToday(i)
            }
            let projIndex = DOM.getIndexOfProject(projects[x])
            DOM.substituteProjectFromTodoList(projIndex, projects[x])    
        }
    }
    //Create Content

    static openProject(projName) {
        DOM.loadTaskList(projName);
    }


    static projectsNameInput() {
        let projectsList = document.getElementById("projList");
        projectsList.innerHTML += `<div id="inputElement">
        <input type="text" id="projname" placeholder="Project Name">
        <input type="submit" id="okButton" value="Ok">
        <input type="submit" id="cancelButton" value="Cancel"></div>`
        DOM.confirmNewProj();
        DOM.enterKeyInputField();
        DOM.cancelCreateProject();
        DOM.hideButton("addproject", "yes")
    }

    static enterKeyInputField() {
        let inputField = document.getElementById("projname");
        inputField.addEventListener("keypress", (e) => {if(e.key === "Enter") DOM.createProjObject()})
    }

    static cancelCreateProject() {
        let cancelButton = document.getElementById("cancelButton")
        let inputElement = document.getElementById("inputElement")
        cancelButton.addEventListener("click", () => inputElement.remove())
        cancelButton.addEventListener("click", () => DOM.hideButton("addproject", "no"))

    }

    static projectName(name) {
        let projectsList = document.getElementById("projList");
        projectsList.innerHTML += `<div id="${name}" class="projListingClass">${name} 
        <div>class="editButton"</div></div>`       
    }

    static taskInput(projName) {
        let taskInput = document.getElementById("tasks-menu");
        taskInput.insertAdjacentHTML("beforeend", `<div id="tasksInputField"> 
        <input type="text" id="${projName}"  autofocus="autofocus" placeholder="Task Name">
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
            target.style.display = "block";
            console.log("teste hide button")
            console.log(target.style.display)
        }
    }

    static inputField(targetId) {
        let projectsList = document.getElementById(`${targetId}`);
        projectsList.innerHTML = `
        <div id="inputElement">
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
        else if(DOM.getIndexOfProject(projName) >= 0) return alert("project name already used");
        Storage.addProject(projName)
        DOM.hideButton("addproject", "no")
        DOM.removeDiv("inputElement")
        DOM.removeInnerHTML("projList")
        DOM.loadTodoList();
        DOM.showProjNameInTaskList(`${projName}`);
        DOM.openProject(projName);
        DOM.taskInput(projName);   

    }

    static confirmNewProj() {
        let okButton = document.getElementById("okButton");
        okButton.addEventListener("click", DOM.createProjObject);  
    }

    // static confirmNewProjEnterKey(e) {
    //     console.log(e.key)
    //     if(e.key === "Enter") DOM.createProjObject()
    // }

    static getIndexOfProject(projID) {
        var getTodoList = Storage.getTodoList();
        var indexOfTargetId = getTodoList.projects.map(x => x.name).indexOf(`${projID}`);
        return indexOfTargetId;
    }

    static getIndexOfTask(projID, taskName) {
        let projObj = DOM.assignMethodsToProjectObj(projID)
        var taskIndex = projObj.tasks.map(x => x.name).indexOf(`${taskName}`);
        return taskIndex;
    }

    static getIndexOfTodayArrTask(projID, taskName) {
        let projObj = DOM.assignMethodsToProjectObj(projID)
        var taskIndex = projObj.todayArr.map(x => x.name).indexOf(`${taskName}`);
        return taskIndex;
    }

    /*Receives new ID(from input) and old ID(from target) */
    static changeObjName(targetId, newName) {
        var indexOfTargetId = DOM.getIndexOfProject(targetId)
        var newObjProj = DOM.assignMethodsToProjectObj(targetId);
        let todayObj = DOM.assignMethodsToProjectObj("Tasks due for today");
        console.log(todayObj)
        newObjProj.setName(newName)
        for(let x = 0; x < newObjProj.tasks.length; x++){
            newObjProj.tasks[x].setNote(newName)
            if(todayObj.tasks.length > 0){
                if(todayObj.tasks[x].note == targetId){
                    todayObj.tasks[x].setNote(newName)
                }
            }
        }
        DOM.substituteProjectFromTodoList(indexOfTargetId, newObjProj)
        DOM.substituteProjectFromTodoList(0, todayObj)
        DOM.removeInnerHTML("projList");
        DOM.loadTodoList();
        DOM.openProject(newName);
        DOM.createTaskButton(newName);
        
    }



    //Action that occurs after the "Add" button is pressed
    static addTask(objId, taskName) {
        console.log("OBJ NAME FROM ADD TASK")
        console.log(objId)
        if(taskName == "") return alert("please insert a task name");
        else if(DOM.getIndexOfTask(objId, taskName) >= 0) return alert("task already listed");

        var indexOfTargetId = DOM.getIndexOfProject(objId)
        var newObj = DOM.assignMethodsToProjectObj(objId);
        newObj.setTask(taskName, false, "")
        DOM.removeInnerHTML("projList");
        DOM.loadTodoList();
        DOM.removeInnerHTML("tasks-menu");
        DOM.substituteProjectFromTodoList(indexOfTargetId, newObj);
        DOM.removeInnerHTML("tasks-menu");
        DOM.loadTaskList(objId);
        DOM.hideButton("addtask", "no");
        DOM.openProject(objId)
        DOM.createTaskButton(objId); 
        

    }

    static setTaskDate(projId, taskId, input) {
        let projIndex = DOM.getIndexOfProject(projId)
        let newObj = DOM.assignMethodsToProjectObj(projId);
        let taskIndex = DOM.getIndexOfTask(projId, taskId);
        newObj.tasks[taskIndex].setDate(input);
        
        newObj.isToday(taskIndex);
        DOM.substituteProjectFromTodoList(projIndex, newObj);

        
    }f

    static taskCheck() {
        let checkbox = document.getElementById("tasks-menu")
        checkbox.addEventListener("change", (e) => {
            if(e.target.type != "checkbox") return
            let projIndex = DOM.getIndexOfProject(e.target.className)
            let projObj = DOM.assignMethodsToProjectObj(e.target.className);
            let indexOfTask = DOM.getIndexOfTask(e.target.className, e.target.id);
            projObj.tasks[indexOfTask].setStatus(true)
            //Checking tasks that are shared between target project and "Tasks due for today" projects
            if(projObj.tasks[indexOfTask].note != ""){
                if(projObj.name == "Tasks due for today"){
                    let todoList = Storage.addMethodsToProjectsInTodoList();
                    let projID = projObj.tasks[indexOfTask].note
                    let indexOfProj = DOM.getIndexOfProject(projID)
                    let originProj = todoList.projects[indexOfProj]
                    let originTaskIndex = DOM.getIndexOfTask(projID, e.target.id)
                    originProj.tasks[originTaskIndex].setStatus(true)
                    DOM.substituteProjectFromTodoList(indexOfProj, originProj);
                }
                    let todoList = Storage.addMethodsToProjectsInTodoList();
                    let todayProj = todoList.projects[0]
                    let todayTaskIndex = DOM.getIndexOfTask("Tasks due for today", e.target.id)
                    todayProj.tasks[todayTaskIndex].setStatus(true)
                    DOM.substituteProjectFromTodoList(0, todayProj);
            }
            DOM.substituteProjectFromTodoList(projIndex, projObj);
            DOM.removeInnerHTML("tasks-menu");
            DOM.loadTaskList(e.target.className);
            
        })
    }

    static deleteTaskButton() {
        let deleteTask = document.getElementById("tasks-menu")
        deleteTask.addEventListener("click", (e) => {
            if(e.target.className != "taskDeleteButton") return
            let projName = e.target.parentNode.className
            let taskIndex = DOM.getIndexOfTask(projName, e.target.id);
            let objectIndex = DOM.getIndexOfProject(projName);
            let projObj = DOM.assignMethodsToProjectObj(projName);
            if(projObj.tasks[taskIndex].note != ""){
                let todayArrIndex = DOM.getIndexOfTodayArrTask(projName, e.target.id);
                projObj.deleteTodayArrTask(todayArrIndex);
                //Deleting tasks that are shared between target project and "Tasks due for today" projects
                if(projObj.name == "Tasks due for today"){
                    let todoList = Storage.addMethodsToProjectsInTodoList();
                    let projID = projObj.tasks[taskIndex].note
                    let indexOfProj = DOM.getIndexOfProject(projID)
                    let originProj = todoList.projects[indexOfProj]
                    let originTaskIndex = DOM.getIndexOfTask(projID, e.target.id)
                    originProj.deleteTask(originTaskIndex)
                    DOM.substituteProjectFromTodoList(indexOfProj, originProj);
                }
                    let todoList = Storage.addMethodsToProjectsInTodoList();
                    let todayProj = todoList.projects[0]
                    let todayTaskIndex = DOM.getIndexOfTask("Tasks due for today", e.target.id)
                    todayProj.deleteTask(todayTaskIndex)
                    DOM.substituteProjectFromTodoList(0, todayProj);
            }
            projObj.deleteTask(taskIndex);
            e.target.parentNode.remove()
            DOM.substituteProjectFromTodoList(objectIndex, projObj);
            DOM.loadTaskList(projName)
            DOM.createTaskButton(projName);
            
        })

    }


    /*Reads the new input value and sends it with the old input value to editProject function*/
    static confirmUpdateProj(oldValue) {
        var okEditButton = document.getElementById("okEditButton");
        let newValue = DOM.returnPrevElemSiblingValue(okEditButton)
        
        DOM.deleteProjectButton();  
        okEditButton.addEventListener("click", function() { DOM.changeObjName(oldValue, newValue())});
    }

//-----START-------// OBJECT HANDLING FUNCTIONS //-------START--------//

    /*Receives project id(object) and assigns object from module that contains all the necessary methods(proto methods)*/
    static assignMethodsToProjectObj(projectID) {
        var getTodoList = Storage.getTodoList()
        var indexOfObject = DOM.getIndexOfProject(projectID)
        var newObject = Object.assign(createProject(), getTodoList.projects[indexOfObject])
        var tasksObj = newObject.tasks
        for(let x = 0; x < tasksObj.length; x++){
            newObject.tasks[x] = Object.assign(newTask(), tasksObj[x])
        }
        Storage.saveTodoList(getTodoList);
        return newObject
    }

    //Removes old object and adds new object to the same position
    static substituteProjectFromTodoList(oldProjIndex, newProj) {
        var getTodoList = Storage.getTodoList();
        getTodoList.projects.splice(oldProjIndex, 1, newProj);
        Storage.saveTodoList(getTodoList);
    }



//------END------// OBJECT HANDLING FUNCTIONS //--------END-------//


//------UTILITIES------//



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

    static returnParentNodeClass(elemId) {
        let getValue = () => {
            var getElement = document.getElementById(elemId)
            let returnValue = getElement.parentNode;
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
        DOM.delAllTasks(projId)
        Storage.deleteProject(projIndex);
        DOM.removeInnerHTML("projList");
        DOM.loadTodoList();
    }

    static delAllTasks(projId) {
        let todoList = Storage.addMethodsToProjectsInTodoList();
        let todayProj = todoList.projects[0];
        for(let x = 0; x < todayProj.tasks.length; x++){
            if(todayProj.tasks[x].note == projId){
                todayProj.deleteTask(x);
            }
        }
        DOM.substituteProjectFromTodoList(0, todayProj)
    }
    //Deletes second simbling = removes project from list and from localStorage
    static deleteProjectButton() {
        var deleteButtonTeste = document.getElementById("delButtonTeste");
        var siblingId = DOM.returnPrevElemSiblingId(deleteButtonTeste);
        var delButSibling = document.getElementById(siblingId());
        var siblingId2 = DOM.returnPrevElemSiblingId(delButSibling);
        deleteButtonTeste.addEventListener("click", function(){DOM.deleteProjectObj(siblingId2())});
    }

    /*Gets button parent node ID and sends it to inputField where the input field
    is created in the correct location */
    static getTargetId() {
        document.addEventListener("click", (e) => {
            if(e.target.className == "editButton"){ 
                let targetId = e.target.parentNode.id;
                DOM.inputField(targetId)};
        })
           
    }


    static selectProjOnClick() {
        let taskListValue = document.getElementById("tasksList")
        let clickOnProject = document.getElementById("projList")
        clickOnProject.addEventListener("click", (e) => {
            if(e.target.className != "projListingClass") return
            if(e.target.id == "Tasks due for today"){
                DOM.showProjNameInTaskList(`${e.target.id}`)
                DOM.openProject(e.target.id);
                return
            }
            DOM.showProjNameInTaskList(`${e.target.id}`)
            DOM.openProject(e.target.id);
            DOM.createTaskButton(e.target.id);
            });
    }

    static addTaskButton() {
        var taskInputButton = document.getElementById("addTaskButton123");
        var taskInputField = document.getElementById("tasksInputField");
        var inputValue = DOM.returnPrevElemSiblingValue(taskInputButton);
        var projectName = taskInputButton.previousElementSibling.id
        console.log("new projname")
        console.log(projectName)
        taskInputButton.addEventListener("click", function() {
            DOM.addTask(projectName, inputValue())
        })
        taskInputField.addEventListener("keypress", (e) => DOM.taskInputButtonEnterKey(e, projectName, inputValue()))

        
    }
    static taskInputButtonEnterKey(e, projectName, inputValue) {
        if(e.key === "Enter") DOM.addTask(projectName, inputValue)
    }
    static createTaskButton(projName) {
        var createButton = document.getElementById("addtask");
        createButton.addEventListener("click", () => DOM.taskInput(projName))
    }

    static setDateButton() {
        let setDateButtonEventListener = document.getElementById("tasks-menu");
        setDateButtonEventListener.addEventListener("change", (e) => {
            let input = e.target.value
            let projId = e.target.className
            let taskId = e.target.id
            if(e.target.type == "date" && e.target.value == "") return;
            if(e.target.type != "date") return;
            e.target.innerHTML = "readonly"
            DOM.setTaskDate(projId, taskId, input);
        })
    }

}
