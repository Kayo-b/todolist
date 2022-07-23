import newTask from "./tasks.mjs"
import createProject from "./projects.mjs"

var task = newTask("teste")
var newProj = createProject("testeProj")
newProj.createTask(task)

console.log(newProj.getName())