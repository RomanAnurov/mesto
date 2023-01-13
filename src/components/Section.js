export default class Section {
  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addItem(element) {
    this._container.prepend(element);
  }
 
  renderItems(data) {
    

    data.forEach((item) => {
      this._renderer(item);
    });
  }
}
