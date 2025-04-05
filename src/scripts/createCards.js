class TodoCard {
  constructor(title, description, priority) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.priority = priority;
  }
}

class todoList {
  constructor() {
    this.cards = [];
  }
  addCard(title, description, priority) {
    const newCard = new TodoCard(title, description, priority);
    this.cards.push(newCard);
  }

  getCards() {
    return [...this.cards];
  }

  deleteCard(id) {
    this.cards = this.cards.filter((card) => card.id !== id);
  }
}

class projects{
  constructor(projectName){
    this.id = crypto.randomUUID();
    this.projectName = projectName;
  }
}

class projectsList{
  constructor(){
    this.projects = [];
  }
  addProject(projectName){
    const project = new projects(projectName)
    this.projects.push(project);
  }
  getProject(){
    return [...this.projects]
  }
  deleteProject(id){
    this.projects = this.projects.filter((project) => project.id !== id)
  }
}

export { TodoCard, todoList };
