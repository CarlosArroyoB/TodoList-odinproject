import "./styles/reset.css";
import "./styles/styles.css";
import { projectList } from "./scripts/createCards.js";
import { cardModal } from "./scripts/Modals.js"
import { todolistView } from "./scripts/Views.js";

/////////////////
const projectManager = new projectList();

projectManager.addProject("CASITA");
projectManager.addProject("home");
console.log("Todos los proyectos:", projectManager.getProjects());

const homeProject = projectManager.getProjects()[0];
const homeProject2 = projectManager.getProjects()[1];
homeProject.addTodoList("casita 1", "Descripción 1", "High");
homeProject.addTodoList("casita 2", "Descripción 2", "Low");

homeProject2.addTodoList("hoome 3", "Descripción 3", "Medium");
homeProject2.addTodoList("TITULO 4", "Descripción 4", "High");
console.log("Todos los proyectos:", projectManager.getProjects());
console.log("Tareas del proyecto Home:", homeProject.getTodoList());


////////////////////////////////////
const view = new todolistView(projectManager);
new cardModal(todolist,view);

view.renderProject()
const homeProjectId = projectManager.getProjects()[1].id; // ID del proyecto "Home"
view.renderCard(homeProjectId); 




