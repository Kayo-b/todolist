import { compareAsc, format, formatDistance, subDays} from 'date-fns';
// import { forEach } from 'lodash';
import newTask from "./tasks.mjs";

const today = format(new Date(), 'dd/MM/yyyy')

function protoMethods() {
    var protoMethods = {
        setName(input){this.name = input},
        getName(){return this.name},
        setDesc(input){this.description = input},
        setTask(task){this.tasks.push(task)},
        deleteTask(taskIndex){this.tasks.splice(taskIndex,1)},
        deleteAllTasks(){this.tasks = []},
        // isToday(tasks){if(this.tasks.dueDate == today){today.push(task)}}
    }
    return protoMethods;
}

export default function createProject(name, desc) {
    var project = {
        name: name,
        description: desc,
        tasks: [],
        todayArr:[],
        isToday() {
            for(let x = 0; x < this.tasks.length; x++) { 
                if(this.tasks[x].dueDate === today) {
                    this.todayArr.push(this.tasks[x])}}},
        __proto__: protoMethods()

    }
    return project
}

var teste = createProject()
teste.setTask(newTask("name","31/07/2022","notes teste", "low"))
teste.isToday()
console.log(teste.todayArr)