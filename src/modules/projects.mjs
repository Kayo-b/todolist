import { compareAsc, format, formatDistance, subDays} from 'date-fns';
import newTask from "./tasks.mjs";

const today = format(new Date(), 'dd/MM/yyyy HH:mm:ss')

export default function createProject(name, desc) {
    let protoMethods = {
        setName(input){project.name = input},
        getName(){return project.name},
        setDesc(input){project.description = input},
        setTask(taskName){project.tasks.push(newTask(taskName))},
        deleteTask(taskIndex){project.tasks.splice(taskIndex,1)},
        deleteAllTasks(){project.tasks = []},
        isToday(task){if(task.dueDate == today){project[0].push(task)}}
    }
    let project = {
        name: name,
        description: desc,
        tasks: [],
        __proto__: protoMethods

    }
    return project
}






