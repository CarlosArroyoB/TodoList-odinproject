class todolistView {
  constructor(projectManager) {
    this.projectManager = projectManager;
    this.container = document.getElementById("container");
    this.sideBar = document.getElementById("projectList");
    this.projectName = document.getElementById("projectTitle");

    // Inicializar con el primer proyecto
    const firstProject = projectManager.getProjects()[0];
    if (firstProject) {
      this.currentProjectId = firstProject.id;
      this.renderCard(this.currentProjectId); // 
    }
  }

  // Renderizar la lista de proyectos en la barra lateral
  renderProject() {
    this.sideBar.innerHTML = "";
    this.projectManager.getProjects().forEach((project) => {
      const projectCard = this.createProjectCard(project);
  
      this.sideBar.appendChild(projectCard);
    });
  }

  // Renderizar las tareas de un proyecto específico
  renderCard(projectId) {
    this.container.innerHTML = "";

    const project = this.projectManager.getProjectById(projectId);
    if (project) {
      const title = this.titleProject(project);
      this.projectName.innerHTML = "";
      this.projectName.appendChild(title);

      project.getTodoList().forEach((todo) => {
        const todoCard = this.createCard(todo, projectId);
        this.container.appendChild(todoCard);
      });
    } else {
      console.error("No se encontró el proyecto con el ID:", projectId);
    }
  }

  // Obtener el ID del proyecto actual
  getCurrentProjectId() {
    return this.currentProjectId;
  }

  // Crear una tarjeta para un proyecto
  createProjectCard(project) {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project-card");
    projectDiv.setAttribute("id", project.id);

    const h1 = document.createElement("h1");
    h1.classList.add("project-title");
    h1.textContent = project.projectName;

    projectDiv.append(h1);


    this.setUpProjectEventListeners(projectDiv, project.id);

    return projectDiv;
  }

  titleProject(project) {
    const h1 = document.createElement("h1");
    h1.textContent = project.projectName;
    return h1;
  }

  // Crear una tarjeta para una tarea
  createCard(card, projectId) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.setAttribute("id", card.id);
  
    const h1 = document.createElement("h1");
    h1.textContent = card.title;
  
    const p = document.createElement("p");
    p.textContent = card.description;
  
    // Crear un contenedor para status y deleteButton
    const controlsDiv = document.createElement("div");
    controlsDiv.classList.add("card-controls"); // Clase para estilos
  
    const status = document.createElement("input");
    status.type = "checkbox";
  
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
  
    // Añadir status y deleteButton al contenedor
    controlsDiv.append(status, deleteButton);
  
    // Añadir elementos al cardDiv
    cardDiv.append(h1, p, controlsDiv);
  
    // Configurar eventos
    this.setUpCardEventListeners(cardDiv, card.id, projectId);
  
    const prior = card.priority;
    cardDiv.classList.remove("High", "Medium", "Low");
    if (prior === "High") {
      cardDiv.classList.add("High");
    } else if (prior === "Medium") {
      cardDiv.classList.add("Medium");
    } else if (prior === "Low") {
      cardDiv.classList.add("Low");
    }
  
    return cardDiv;
  }
  setUpProjectEventListeners(projectDiv, projectId) {
    
    projectDiv.addEventListener("click", () => {
      this.currentProjectId = projectId; 
      this.renderCard(projectId); 
      // Quitar la clase 'selected' de todos los proyectos
    const allProjectCards = document.querySelectorAll(".project-card");
    allProjectCards.forEach((card) => card.classList.remove("selected"));

    // Añadir la clase 'selected' al proyecto actual
    projectDiv.classList.add("selected");
    });
  
    // Añadir un botón para eliminar el proyecto
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-project");
    projectDiv.appendChild(deleteButton);
  
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation(); 
  
      // Encuentra el índice del proyecto actual
      const projects = this.projectManager.getProjects();
      const currentIndex = projects.findIndex((project) => project.id === projectId);
  
      // Elimina el proyecto
      this.projectManager.deleteProject(projectId);
  
      let nextProject = null;
      if (currentIndex > 0) {

        nextProject = projects[currentIndex - 1];
      } else if (currentIndex < projects.length - 1) {
  
        nextProject = projects[currentIndex + 1];
      }
  
      this.renderProject();
      if (nextProject) {
        this.currentProjectId = nextProject.id;
        this.renderCard(nextProject.id);
      } else {
        this.currentProjectId = null;
        this.container.innerHTML = "";
        this.projectName.innerHTML = "";
      }
    });
  }

  setUpCardEventListeners(cardDiv, cardId, projectId) {
    const checkbox = cardDiv.querySelector("input");
    const deleteButton = cardDiv.querySelector("button");
  

    checkbox.addEventListener("click", () => {
      if (checkbox.checked) {
        cardDiv.classList.add("complete");
      } else {
        cardDiv.classList.remove("complete");
      }
    });
  
    deleteButton.addEventListener("click", () => {
      this.projectManager.deleteTodoFromProject(projectId, cardId);
  
      this.renderCard(projectId);
    });
  }}

export { todolistView };