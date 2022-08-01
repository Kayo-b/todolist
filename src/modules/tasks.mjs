
function protoMethods(){

    let protoMethods = {
        setName(input){this.name = input},
        getName(){return this.name},
        setNote(input){this.note = input},
        setDate(input){this.dueDate = input},
        setPriority(input){this.priority = input}
    }
    return protoMethods
}

export default function newTask(name, date, note, level, status) {
    var task = {
        name: name,
        note: note,
        dueDate: date,
        priority: level,
        status: status,
        __proto__: protoMethods()
        
    }
    return task;
}
