import "../styles.css";

class TodoCard {
  constructor(title, description, priority) {
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
}

class modalController {
  constructor(TodoCard) {
    (this.todocard = TodoCard),
      (this.container = document.getElementById("container"));
    this.addTodo = document.getElementById("addTodo");
    this.modal = document.getElementById("modal");
    this.closeModal = document.getElementById("close");
    this.submitModal = document.getElementById("sumbit");
    this.setUpListeners();
  }

  setUpListeners() {
    this.addTodo.addEventListener("click", () => this.modal.classList.add("show"));
    this.closeModal.addEventListener("click", () => this.modal.classList.remove("show"));

  }
}
const modalcontroller = new modalController(1);
