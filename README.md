# todo list
## To-do list using js, css and html through webpack for learning purposes.

### Features: 
 - Create and edit projects;
 - Create tasks for each project;
 - Set due date for each task;
 - When tasks are due, they are copied to a seperate fixed project that receives the due tasks from all projecs;
 - All data gets saved in local storage to be later accessed even after the browser is closed.
 
### Technical notes about project development:
Project was done with the main objective of simultaniously using modules, classes, factory functions, localStorage all running through webpack. The project and tasks objects each have their own factory function module that inherits _proto_ methods so that each project/task doesn't have to generate the same new methods upon creation.
All other modules(UI, todoList, storage) have been created in a class structure, each linked to another in a chain-like manner(not shure if this was a good approach) towards the end-point UI module where the classes are invoked through the eventListeners and numerous other auxiliary functions.

