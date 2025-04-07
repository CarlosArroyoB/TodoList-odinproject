import "./styles/reset.css";
import "./styles/styles.css";
import { projectList } from "./scripts/createCards.js";
import { cardModal } from "./scripts/Modals.js";
import { todolistView } from "./scripts/Views.js";

/////////////////
const projectManager = new projectList();

// Función para recrear los proyectos predeterminados
function createDefaultProjects() {
  projectManager.addProject("Home");

  const homeProject = projectManager
    .getProjects()
    .find((project) => project.projectName === "Home");
  if (homeProject) {
    homeProject.addTodoList("Todo 1", "Task description 1", "High");
    homeProject.addTodoList("Todo 2", "Task description 2", "Medium");
    homeProject.addTodoList("Todo 3", "Task description 3", "Low");
  }

  projectManager.saveToLocalStorage(); // Guardar los proyectos predeterminados en localStorage
}

// Verificar si los proyectos predeterminados existen
if (projectManager.getProjects().length === 0) {
  createDefaultProjects();
}
console.log("Todos los proyectos:", projectManager.getProjects());

////////////////////////////////////
const view = new todolistView(projectManager);
new cardModal(projectManager, view);

view.renderProject();
const homeProjectId = projectManager.getProjects()[0].id;
view.renderCard(homeProjectId);
