// export function teste(project) {
//     return console.log(project)
// }
// import newTask from "./tasks.mjs"

export default function createProject(name, desc) {
    let protoMethods = {
        editName(input){project.name = input},
        getName(){return project.name},
        editDesc(input){project.description = input},
        createTask(newTask){project.tasks.push(newTask)},
        deleteTask(taskIndex){project.tasks.splice(taskIndex,1)},
        deleteAllTasks(){project.tasks = []} 
    }
    let project = {
        name: name,
        description: desc,
        tasks: [],
        __proto__: protoMethods

    }
    return project
}
// var newproj = createProject("teste", "teste desc")
// newproj.createTask(newTask("Task Name", "This is a task note", "DATE"))
// console.log(newproj.getName())
