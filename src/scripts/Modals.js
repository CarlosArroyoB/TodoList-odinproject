
class cardModal {
  constructor(projectManager, view) {
    this.projectManager = projectManager; // Instancia de projectsList
    this.view = view; // Vista para renderizar
    this.addTodo = document.getElementById("addTodo");
    this.modal = document.getElementById("modal");
    this.closeModal = document.getElementById("close");
    this.submitModal = document.getElementById("formulario");
    this.addProject = document.getElementById("addProject");
    this.addProjectModal = document.getElementById("addProjectModal");
    this.projectSelect = document.getElementById("project-card"); 
    this.submitProject = document.getElementById("submitProject");
    this.cancel = document.getElementById("cancel"); 
    this.setUpListeners();
  }

  setUpListeners() {
    // Abrir el modal para añadir tareas
    this.addTodo.addEventListener("click", () =>
      this.modal.classList.add("show")
    );

    // Cerrar el modal
    this.closeModal.addEventListener("click", () =>
      this.modal.classList.remove("show")
    );

    // Manejar el envío del formulario para añadir tareas
    this.submitModal.addEventListener("submit", (event) =>
      this.handleSubmit(event)
    );

    // Abrir el modal para añadir proyectos
    this.addProject.addEventListener("click", () =>
      this.addProjectModal.classList.add("show")
    );
    this.submitProject.addEventListener("click", () => {
      const projectName = document.getElementById("projectName").value;
      this.projectManager.addProject(projectName);
      this.view.renderProject(); // Renderizar la lista de proyectos actualizada
      this.addProjectModal.classList.remove("show"); // Cerrar el modal
    });
    
    this.cancel.addEventListener("click", () =>
      this.addProjectModal.classList.remove("show")
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const priority = document.getElementById("priority").value;
    const selectedProjectId = this.view.getCurrentProjectId(); 
  
    const project = this.projectManager.getProjectById(selectedProjectId);

    if (project) {
      project.addTodoList(title, description, priority);

  
      this.view.renderCard(selectedProjectId);
      this.view.renderProject();

      // Cerrar el modal y resetear el formulario
      this.submitModal.reset();
      this.modal.classList.remove("show");
    } else {
      console.error("No se encontró el proyecto seleccionado.");
    }
  }
}

export { cardModal };