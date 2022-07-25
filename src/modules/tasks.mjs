export default function newTask(name, note, date, level, status) {

    let protoMethods = {
        editName(input){task.name = input},
        getName(){return task.name},
        editNote(input){task.note = input},
        editDate(input){task.dueDate = input},
        editPriority(input){task.priority = input}
    }
    var task = {
        name: name,
        note: note,
        dueDate: date,
        priority: level,
        status: status,
        __proto__: protoMethods
        
    }
    return {name,note}
}