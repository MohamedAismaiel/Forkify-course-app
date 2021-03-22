import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const button = e.target.closest('.btn--inline');
      //   console.log(button);
      if (!button) return;
      let goToPage = +button.dataset.goto;
      //   console.log(goToPage);
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const currentPage = this._data.page;
    // console.log(this._data);
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPage);

    //Page 1, and there are other pages
    if (currentPage === 1 && numPage > 1) {
      return `
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
      </svg>
      </button>`;
    }

    //Last page
    if (currentPage === numPage && numPage > 1) {
      return `
    <button data-goto="${
      currentPage - 1
    }"class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
    <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${currentPage - 1}</span>
    </button>`;
    }
    //Other page
    if (currentPage < numPage) {
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
        </button>
        <button data-goto="${
          currentPage + 1
        }"class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
        </svg>
        </button>`;
    }
    //Page 1, and there are NO other pages
    return ``;
  }
}

export default new PaginationView();
