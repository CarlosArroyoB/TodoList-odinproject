class TodoCard {
  constructor(title, description, priority) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.priority = priority;
  }
}

class projects {
  constructor(projectName) {
    this.id = crypto.randomUUID();
    this.projectName = projectName;
    this.todolists = [];
  }

  addTodoList(title, description, priority) {
    const newTodo = new TodoCard(title, description, priority);
    this.todolists.push(newTodo);
  }

  deleteTodoList(id) {
    this.todolists = this.todolists.filter((todo) => todo.id !== id);
    this.saveToLocalStorage(); // Guardar en localStorage después de eliminar una tarea
  }

  saveToLocalStorage() {
    const projectManager = new projectList();
    projectManager.saveToLocalStorage(); // Guardar el estado completo de los proyectos
  }

  getTodoList() {
    return [...this.todolists];
  }

  // Método estático para reconstruir una instancia de `projects` desde datos deserializados
  static fromData(data) {
    const project = new projects(data.projectName);
    project.id = data.id; // Restaurar el ID original
    project.todolists = data.todolists.map(
      (todo) => new TodoCard(todo.title, todo.description, todo.priority)
    ); // Reconstruir las tareas
    return project;
  }
}

class projectList {
  constructor() {
    this.projects = this.loadFromLocalStorage() || []; // Cargar proyectos desde localStorage o inicializar vacío
  }

  addProject(projectName) {
    const newProject = new projects(projectName);
    this.projects.push(newProject);
    this.saveToLocalStorage(); // Guardar en localStorage
  }
  addTodoToProject(projectId, title, description, priority) {
    const project = this.getProjectById(projectId);
    if (project) {
      const newTodo = new TodoCard(title, description, priority);
      project.todolists.push(newTodo);
      this.saveToLocalStorage(); // ✅ Guardas después de modificar
    }
  }
  deleteTodoFromProject(projectId, todoId) {
    const project = this.getProjectById(projectId);
    if (project) {
      project.todolists = project.todolists.filter(todo => todo.id !== todoId);
      this.saveToLocalStorage();
    }
  }

  deleteProject(id) {
    this.projects = this.projects.filter((project) => project.id !== id);
    this.saveToLocalStorage(); // Guardar en localStorage
  }

  getProjects() {
    return [...this.projects];
  }

  getProjectById(id) {
    return this.projects.find((project) => project.id === id);
  }

  saveToLocalStorage() {
    // Serializar los proyectos y guardarlos en localStorage
    localStorage.setItem("projects", JSON.stringify(this.projects));
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem("projects");
    if (!data) return null;

    // Deserializar los datos y reconstruir las instancias de `projects`
    const parsedData = JSON.parse(data);
    return parsedData.map((projectData) => projects.fromData(projectData));
  }
}

export { projects, projectList };
