import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupElement = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupElement.querySelector(".popup__form");
const todosList = document.querySelector(".todos__list");

const todoCounterElementSelector = ".counter__text";
const todoCounter = new TodoCounter(initialTodos, todoCounterElementSelector);

const handleCheckboxClick = (isNowCompleted) => {
  todoCounter.updateCompleted(isNowCompleted);
};

const handleDeleteClick = (wasCompleted) => {
  todoCounter.updateTotal(false);
  if (wasCompleted) {
    todoCounter.updateCompleted(false);
  }
};

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", {
    handleCheckboxClick: handleCheckboxClick,
    handleDeleteClick: handleDeleteClick,
  });
  const todoElement = todo.getView();
  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    if (typeof item.completed === "undefined") {
      item.completed = false;
    }
    const todoElement = generateTodo(item);
    return todoElement;
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (values) => {
    const { name, date: dateInput } = values;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const newTodoValues = { name, date, id, completed: false };

    const newTodoElement = generateTodo(newTodoValues);
    section.addItem(newTodoElement);

    todoCounter.updateTotal(true);

    addTodoPopup.close();
  },
});
addTodoPopup.setEventListeners();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
  newTodoValidator.resetValidation();
});
