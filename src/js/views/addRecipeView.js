import View from './view.js';
import icons from 'url:../../img/icons.svg';

class addReciepeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _successMessage = `Recipe was successfully uploaded`;
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow(); // we call it here because we want it to load as soon as the import the class and it has nothing to do with the controller, we use bind down here because remember in events the this keyword refers to the class
  }
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArray = [...new FormData(this)]; // instead of going and selecting each value, this modern api (FormData) allow us to do this and inside it as an argument we have to select a form, in this case we are already inside the form so we use this and returns an object and to use it we will have to spread it into array
      //   console.log(this);

      const data = Object.fromEntries(dataArray); // fromEntries this convert the arry to object since all our data are in object
      handler(data);
    });
  }

  _generateMarkup() {}
  //Page 1, and there are NO other pages
}

export default new addReciepeView();
