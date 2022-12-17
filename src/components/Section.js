export default class Section {
  constructor({ data, renderer }, elementsContainer) {
    this._renderedItems = data;
    this._container = elementsContainer;
    this._renderer = renderer;
  }

  addItem(element) {
    this._container.append(element);
  }
  clear() {
    this._container.innerHTML = "";
  }

  renderItems() {
    this.clear();

    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
