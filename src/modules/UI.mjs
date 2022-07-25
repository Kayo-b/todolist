// import newTask from "./tasks.mjs"
// import createProject from "./projects.mjs"

// var task = newTask("teste")
// var newProj = createProject("testeProj")
// newProj.createTask(task)

// console.log(newProj)
import TodoList from "./todolist.mjs";


var test = new TodoList()
test.addProject("New proj added")
console.log(test.getProject())
test.deleteProject(0)
console.log(test.getProject())