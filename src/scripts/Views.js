
class todolistView {
  constructor(projectManager) {
    this.projectManager = projectManager;
    this.container = document.getElementById("container");
    this.sideBar = document.getElementById("projectList");
  }
  renderProject() {
    this.sideBar.innerHTML = ""; 
    this.projectManager.getProjects().forEach((project) => {
      console.log("Proyecto:", project);
      const projectCard = this.createProjectCard(project);
      this.sideBar.appendChild(projectCard); 
    });
  }
  renderCard(projectId) {
    this.container.innerHTML = ""; 
  

    const project = this.projectManager.getProjectById(projectId);
  
    if (project) {
      
      project.getTodoList().forEach((todo) => {
        console.log("Tarea:", todo);
  
        
        const todoCard = this.createCard(todo, projectId);
        this.container.appendChild(todoCard);
      });
    } else {
      console.error("No se encontró el proyecto con el ID:", projectId);
    }
  }

  createProjectCard(project) {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project-card");
    projectDiv.setAttribute("id", project.id);

    const h1 = document.createElement("button");
    h1.textContent = project.projectName;


    projectDiv.append(h1);
    this.setUpProjectEventListeners(projectDiv, project.id);
    
    return projectDiv;
  }
  createCard(card, projectId) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.setAttribute("id", card.id);
  
    const h1 = document.createElement("h1");
    h1.textContent = card.title;
  
    const p = document.createElement("p");
    p.textContent = card.description;
  
    const status = document.createElement("input");
    status.type = "checkbox";
  
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
  
    cardDiv.append(h1, p, status, deleteButton);
    this.setUpCardEventListeners(cardDiv, card.id, projectId); // Pasar projectId aquí
  
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
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    projectDiv.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
      this.projectManager.deleteProject(projectId); 
      this.renderCard(); 
      this.renderProject(); 
    });
    const projectButton = projectDiv.querySelector("button");
    projectButton.addEventListener("click", () => {
      this.renderCard(projectId); 
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
  
    // Listener para eliminar la tarea
    deleteButton.addEventListener("click", () => {
      const project = this.projectManager.getProjectById(projectId);
  
      if (project) {
        project.deleteTodoList(cardId);
  
        this.renderCard(projectId);
      } else {
        console.error("No se encontró el proyecto con el ID:", projectId);
      }
    });
  }
}


export { todolistView};
