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
    this._addHandlerHideWindow();
    // we call it here because we want it to load as soon as the import the class and it has nothing to do with the controller, we use bind down here because remember in events the this keyword refers to the class
  }
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  reRenderTheUpload() {
    setTimeout(() => {
      this.render();
    }, 500);
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._btnClose.addEventListener('click', this.reRenderTheUpload.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    // this.render();
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
  render() {
    const markUp = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
  _generateMarkup() {
    return `      <form class="upload">
    <div class="upload__column">
      <h3 class="upload__heading">Recipe data</h3>
      <label>Title</label>
      <input
        required
        name="title"
        type="text"
        placeholder="enter a title"
      />
      <label>URL</label>
      <input
        required
        name="sourceUrl"
        type="text"
        placeholder="enter source url"
      />
      <label>Image URL</label>
      <input
        required
        name="image"
        type="text"
        placeholder="enter image source url"
      />
      <label>Publisher</label>
      <input
        required
        name="publisher"
        type="text"
        placeholder="enter publisher name"
      />
      <label>Prep time</label>
      <input
        required
        name="cookingTime"
        type="number"
        placeholder="enter preparation time"
      />
      <label>Servings</label>
      <input
        required
        name="servings"
        type="number"
        placeholder="enter number to servings"
      />
    </div>

    <div class="upload__column">
      <h3 class="upload__heading">Ingredients</h3>
      <label>Ingredient 1</label>
      <input
        type="text"
        required
        name="ingredient-1"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 2</label>
      <input
        type="text"
        name="ingredient-2"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 3</label>
      <input
        type="text"
        name="ingredient-3"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 4</label>
      <input
        type="text"
        name="ingredient-4"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 5</label>
      <input
        type="text"
        name="ingredient-5"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
      <label>Ingredient 6</label>
      <input
        type="text"
        name="ingredient-6"
        placeholder="Format: 'Quantity,Unit,Description'"
      />
    </div>

    <button class="btn upload__btn">
      <svg>
        <use href="${icons}#icon-upload-cloud"></use>
      </svg>
      <span>Upload</span>
    </button>
  </form>`;
  }
  //Page 1, and there are NO other pages
}

export default new addReciepeView();
