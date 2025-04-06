import "./styles/reset.css";
import "./styles/styles.css";
import { todoCard, todoList } from "./scripts/createCards.js";
import { cardModal } from "./scripts/Modals.js"
import { todolistView } from "./scripts/Views.js";


const todolist = new todoList();
const view = new todolistView(todolist);
new cardModal(todolist,view);


//create cards
todolist.addCard("TITULO 1", "Descripción 1", "High");
todolist.addCard("TITULO 2", "Descripción 2", "Medium");
todolist.addCard("TITULO 3", "Descripción 3", "Low");

console.log(todolist.getCards())
view.renderCard()




