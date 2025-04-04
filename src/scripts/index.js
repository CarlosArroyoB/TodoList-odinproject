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

  getCards(){
    return [...this.cards];
  }
}

class modalController {
  constructor(todoList,view) {
    (this.todolist = todoList),
    this.view = view,
    this.addTodo = document.getElementById("addTodo");
    this.modal = document.getElementById("modal");
    this.closeModal = document.getElementById("close");
    this.submitModal = document.getElementById("formulario");
    this.setUpListeners();
  }

  setUpListeners() {
    this.addTodo.addEventListener("click", () => this.modal.classList.add("show"));
    this.closeModal.addEventListener("click", () => this.modal.classList.remove("show"));
    this.submitModal.addEventListener("submit",(event) =>this.handleSubmit(event))
  }
  handleSubmit(event){
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const priority = document.getElementById("priority").value;

    this.todolist.addCard(title,description,priority);
    this.submitModal.reset();
    this.view.renderCard();
    this.modal.classList.remove("show")
    console.log(todolist.cards)
  }
}

class todolistView {
    constructor(cardsArray){
        this.cardsArray = cardsArray
        this.container = document.getElementById("container")
    }
    renderCard(){
      this.container.innerHTML = '';
      this.cardsArray.getCards().forEach(card => {
        const todoCard = this.createCard(card);
        this.container.appendChild(todoCard);
      });
    }
    createCard (card){
        const cardDiv = document.createElement("div")
        cardDiv.classList.add("card")

        const h1 = document.createElement("h1");
        h1.textContent = card.title;

        const p = document.createElement("p");
        p.textContent = card.description;

        const status = document.createElement("input")
        status.type = "checkbox";
        
        cardDiv.append(h1,p,status)
        return cardDiv;

    }


}



// const status = document.createElement("input");
// status.type = "checkbox"; // Asignar el tipo correctamente
// status.checked = true; // Opcional: establecer si está marcado por defecto

// document.body.appendChild(status); // Añadir el checkbox al DOM

const todolist = new todoList()
const view = new todolistView(todolist)
new modalController(todolist,view);

todolist.addCard("TITULO 1", "una pequeña descripcion para el titulo 1","medium")
todolist.addCard("TITULO 1", "una pequeña descripcion para el titulo 1","medium")
todolist.addCard("TITULO 1", "una pequeña descripcion para el titulo 1","medium")
view.renderCard()
console.log(todolist.cards)


