class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this.container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const newElement = this._renderer(item);
      this.addItem(newElement);
    });
  }
  addItem(element) {
    this.container.append(element);
  }
}
export default Section;
