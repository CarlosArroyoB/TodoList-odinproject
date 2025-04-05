import "./styles.css";
import { todoCard, todoList } from "./scripts/createCards.js";
import { modalController } from "./scripts/modalController.js"
import { todolistView } from "./scripts/todoListView.js";


const todolist = new todoList();
const view = new todolistView(todolist);
new modalController(todolist,view);


//create cards
todolist.addCard("TITULO 1", "una pequeña descripcion para el titulo 1","medium")
todolist.addCard("TITULO 1", "una pequeña descripcion para el titulo 1","medium")
todolist.addCard("TITULO 1", "una pequeña descripcion para el titulo 1","medium")
view.renderCard()




