export default function newTask(name, note, date, level, status) {

    let protoMethods = {
        setName(input){task.name = input},
        getName(){return task.name},
        setNote(input){task.note = input},
        setDate(input){task.dueDate = input},
        setPriority(input){task.priority = input}
    }
    var task = {
        name: name,
        note: note,
        dueDate: date,
        priority: level,
        status: status,
        __proto__: protoMethods
        
    }
    return task;
}