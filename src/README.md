# todo list
## To-do list using js, css and html through webpack for learning purposes.

### Features: 
 - Create and edit projects;
 - Create tasks for each project;
 - Set due date for each task;
 - When tasks are due, they are copied to a separate fixed project that receives the due tasks from all projects;
 - All data gets saved in local storage to be later accessed even after the browser is closed and reopened.
 
### Technical notes about project development:
The project was done with the main objective of simultaneously using modules, classes, factory functions, localStorage all running through webpack. The project and tasks objects each have their own factory function module that inherits _proto_ methods so that each project/task doesn't have to generate the same new methods upon creation.
All other modules(UI, todoList, storage) have been created in a class structure, each linked to another in a chain-like manner(not sure if this was a good approach) ending in the UI module where the classes are invoked through the eventListeners and numerous other auxiliary functions.

https://kayo-b.github.io/todolist/

![Recording 2022-11-21 at 14 06 00](https://user-images.githubusercontent.com/93148601/203075376-8fb5f1b5-9883-4c13-8c73-97ccfe32825d.gif)
