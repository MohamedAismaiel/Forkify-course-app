import View from './view.js';
import icons from 'url:../../img/icons.svg';

export default class previewView extends View {
  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(results) {
    const id = window.location.hash.slice(1);
    return `<li class="preview">
    <a class="preview__link ${
      results.id === id ? 'preview__link--active' : ''
    }" href="#${results.id}">
      <figure class="preview__fig">
        <img src="${results.image}" alt="${results.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${results.title}</h4>
        <p class="preview__publisher">${results.publisher}</p>
      </div>
      <div class="preview__user-generated ${results.key ? '' : 'hidden'}">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
      </div>
    </a>
  </li>`;
  }
}
// import View from './view.js';
// import icons from 'url:../../img/icons.svg';
// class previewView extends View {
//   _parentElement = '';

//   _generateMarkup() {
//     const id = window.location.hash.slice(1);

//     return `<li class="preview">
//     <a class="preview__link ${
//       this._data.id === id ? 'preview__link--active' : ''
//     }" href="#${this._data.id}">
//       <figure class="preview__fig">
//         <img src="${this._data.image}" alt="${this._data.title}" />
//       </figure>
//       <div class="preview__data">
//         <h4 class="preview__title">${this._data.title}</h4>
//         <p class="preview__publisher">${this._data.publisher}</p>
//       </div>
//     </a>
//   </li>`;
//   }
// }
// export default new previewView();
