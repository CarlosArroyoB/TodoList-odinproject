import { todoList } from "./createCards.js";
const todolist = new todoList();

class cardModal {
  constructor(todoList, view) {
    (this.todolist = todoList),
      (this.view = view),
      (this.addTodo = document.getElementById("addTodo"));
    this.modal = document.getElementById("modal");
    this.closeModal = document.getElementById("close");
    this.submitModal = document.getElementById("formulario");
    this.setUpListeners();
  }

  setUpListeners() {
    this.addTodo.addEventListener("click", () =>
      this.modal.classList.add("show")
    );
    this.closeModal.addEventListener("click", () =>
      this.modal.classList.remove("show")
    );
    this.submitModal.addEventListener("submit", (event) =>
      this.handleSubmit(event)
    );
  }
  handleSubmit(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const priority = document.getElementById("priority").value;

    this.todolist.addCard(title, description, priority);
    this.submitModal.reset();
    this.view.renderCard();
    this.modal.classList.remove("show");
    console.log(todolist.cards);
  }
}

class projectsModal{
    constructor(){

    }
    setUpListeners(){

    }
    handleSubmit(event){

    }
}
export { cardModal };
