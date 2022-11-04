import { compareAsc, format, formatDistance, subDays} from 'date-fns';
// import { forEach } from 'lodash';
import Storage from "./storage.mjs"
import newTask from "./tasks.mjs";

const today = format(new Date(), 'yyyy-MM-dd')

function protoMethods() {
    var protoMethods = {
        setName(input){this.name = input},
        getName(){return this.name},
        setDesc(input){this.description = input},
        setTask(name, status, note){this.tasks.push(newTask(name, status, note))},
        deleteTask(taskIndex){this.tasks.splice(taskIndex,1)},
        deleteTodayArrTask(taskIndex){this.todayArr.splice(taskIndex,1)},
        deleteAllTasks(){this.tasks = []},
        isToday(taskIndex) {
            //for(let x = 0; x < this.tasks.length; x++) { 
              //  console.log("IS TODAY TESTE")
                if(this.tasks[taskIndex].dueDate === today) {
                    this.tasks[taskIndex].setNote(`${this.name}`);
                    this.todayArr.push(this.tasks[taskIndex]);
                    let todoList = Storage.getTodoList();
                    todoList.projects[0].tasks.push(this.tasks[taskIndex]);
                    Storage.saveTodoList(todoList)}}
    };
    return protoMethods;
}

export default function createProject(name, desc) {
    var project = {
        name: name,
        description: desc,
        tasks: [],
        todayArr:[],
        methodTest(input){console.log("method test" + `${input}`)},
        __proto__: protoMethods()

    }
    return project
}
