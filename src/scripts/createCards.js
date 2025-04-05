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

export { TodoCard, todoList };
