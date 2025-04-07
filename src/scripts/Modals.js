class cardModal {
  constructor(projectManager, view) {
    this.projectManager = projectManager; // Instancia de projectList
    this.view = view; // Vista para renderizar

    // Elementos del DOM
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
    // Abrir modal para tareas
    this.addTodo.addEventListener("click", () =>
      this.modal.classList.add("show")
    );

    // Cerrar modal de tareas
    this.closeModal.addEventListener("click", () =>
      this.modal.classList.remove("show")
    );

    // Envío del formulario de tareas
    this.submitModal.addEventListener("submit", (event) =>
      this.handleSubmit(event)
    );

    // Abrir modal de proyectos
    this.addProject.addEventListener("click", () =>
      this.addProjectModal.classList.add("show")
    );

    // Enviar nuevo proyecto
    this.submitProject.addEventListener("click", () => {
      const projectName = document.getElementById("projectName").value;
      this.projectManager.addProject(projectName);
      this.view.renderProject();
      this.addProjectModal.classList.remove("show");
    });

    // Cancelar creación de proyecto
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

    if (selectedProjectId) {
      this.projectManager.addTodoToProject(
        selectedProjectId,
        title,
        description,
        priority
      );

      this.view.renderCard(selectedProjectId);
      this.view.renderProject();

      this.submitModal.reset();
      this.modal.classList.remove("show");
    } else {
      console.error("No se encontró el proyecto seleccionado.");
    }
  }
}

export { cardModal };