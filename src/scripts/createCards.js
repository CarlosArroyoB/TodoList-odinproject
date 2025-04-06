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
  getTodoList() {
    return [...this.todolists];
  }
  deleteTodoList(id) {
    this.todolists = this.todolists.filter((todo) => todo.id !== id);
  }
}
class projectList {
  constructor() {
    this.projects = [];
  }
  addProject(projectName) {
    const newProject = new projects(projectName);
    this.projects.push(newProject);
  }
  getProjects() {
    return [...this.projects];
  }
  deleteProject(id) {
    this.projects = this.projects.filter((project) => project.id !== id);
  }
  getProjectById(id) {
    return this.projects.find((project) => project.id === id);
  }
}

export { projects, projectList };
