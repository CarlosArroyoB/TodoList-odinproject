import { todoCard, todoList } from "./createCards.js";

const todolist = new todoList();
class todolistView {
  constructor(cardsArray) {
    this.cardsArray = cardsArray;
    this.container = document.getElementById("container");
  }
  renderCard() {
    this.container.innerHTML = "";
    this.cardsArray.getCards().forEach((card) => {
      console.log(card)
      const todoCard = this.createCard(card);
      this.container.appendChild(todoCard);
    });
  }
  createCard(card) {
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
    this.setUpCardEventListeners(cardDiv, card.id);
    const prior = card.priority;
    cardDiv.classList.remove("High", "Medium", "Low"); // Eliminar clases previas de prioridad
    if (prior === "High") {
      cardDiv.classList.add("High");
    } else if (prior === "Medium") {
      cardDiv.classList.add("Medium");
    } else if (prior === "Low") {
      cardDiv.classList.add("Low");
    }
    return cardDiv;
  }
  setUpCardEventListeners(cardDiv, cardId) {
    const checkbox = cardDiv.querySelector("input");
    const deleteButton = cardDiv.querySelector("button");
    checkbox.addEventListener("click", () => {
      if (checkbox.checked) {
        cardDiv.classList.add("complete"); // Añadir la clase solo a la carta específica
      } else {
        cardDiv.classList.remove("complete"); // Quitar la clase solo de la carta específica
      }
    });

    deleteButton.addEventListener("click", () => {
      this.cardsArray.deleteCard(cardId); // Usar el método deleteCard de la instancia de todoList
      this.renderCard(); // Volver a renderizar las tarjetas
    });
  }
}

export { todolistView };
