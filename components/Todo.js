class Todo {
  constructor(data, selector, { handleCheckboxClick, handleDeleteClick }) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheckboxClick = handleCheckboxClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = this._todoCheckboxEl.checked;

      this._handleCheckboxClick(this._data.completed);
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      const wasCompleted = this._data.completed;
      this._handleDeleteClick(wasCompleted);
      this._todoElement.remove();
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;

    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _generateDateEl() {
    this._todoDate = this._todoElement.querySelector(".todo__date");

    this._dueDate = new Date(this._data.date);
    if (!isNaN(this._dueDate)) {
      this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}`;
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._todoNameEl.textContent = this._data.name;
    this._generateCheckboxEl();
    this._setEventListeners();
    this._generateDateEl();
    return this._todoElement;
  }
}

export default Todo;
