
function protoMethods(){

    let protoMethods = {
        setName(input){this.name = input},
        getName(){return this.name},
        setNote(input){this.note = input},
        setDate(input){this.dueDate = input},
        setPriority(input){this.priority = input},
        setStatus(input){this.done = input}
    }
    return protoMethods
}

export default function newTask(name, date, status, note, level) {
    var task = {
        name: name,
        done: status,
        note: note,
        dueDate: date,
        priority: level,
        __proto__: protoMethods()
    }
    return task;
}
