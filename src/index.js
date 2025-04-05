import "./styles.css";
import { todoCard, todoList } from "./scripts/createCards.js";
import { modalController } from "./scripts/modalController.js"
import { todolistView } from "./scripts/todoListView.js";


const todolist = new todoList();
const view = new todolistView(todolist);
new modalController(todolist,view);


//create cards
todolist.addCard("TITULO 1", "Descripción 1", "High");
todolist.addCard("TITULO 2", "Descripción 2", "Medium");
todolist.addCard("TITULO 3", "Descripción 3", "Low");

console.log(todolist.getCards())
view.renderCard()




