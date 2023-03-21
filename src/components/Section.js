export default class Section {
  constructor ({ items, renderer }, containerSelector) {
    this.renderItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  rendererItems() {
    this.renderItems.forEach(item => this._renderer(item));
  }
}
