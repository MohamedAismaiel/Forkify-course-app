import 'core-js/stable';
import { async } from 'regenerator-runtime';
import { MODAL_CLOSE_SECONDS } from './config.js';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addReciepeView from './views/addRecipeView.js';
import { setTimeout } from 'core-js';

// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    //loading recipe
    if (!id) return;
    recipeView.renderSpinner();
    // update results view to highlight the selected search result
    resultsView.update(model.getSearchResultPage());

    //update bookmark view
    bookmarksView.update(model.state.bookmarks);

    // loading recipe from import
    await model.loadRecipe(id); // loadRecipe is async function so it will return a promise so we will have to await it

    //render recipe
    recipeView.render(model.state.recipe);

    //rendering recipe
  } catch (err) {
    // alert(err.message);
    recipeView.renderError();
    console.error(err);
  }
};
const controlSearchResult = async function () {
  try {
    resultsView.renderSpinner();
    //get query
    const query = searchView.getQuery();
    if (!query) return;
    //get results
    await model.loadSearchResults(query);

    //render results
    resultsView.render(model.getSearchResultPage());
    //render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};
const controlPagination = function (goToPage) {
  //render new results
  resultsView.render(model.getSearchResultPage(goToPage));
  //render new pagination buttons
  paginationView.render(model.state.search);
  // console.log(goToPage);
};

const controlServings = function (newServings) {
  //update reciepe servings
  model.updateServings(newServings);
  //update the reciepe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //update recipe view
  recipeView.update(model.state.recipe);
  //render bookmarks
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //render spinner to show the user that something is happening
    addReciepeView.renderSpinner();
    //upload new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    //render recipe
    recipeView.render(model.state.recipe);

    //success message
    addReciepeView.renderMessage();

    //add the bookmark view
    bookmarksView.render(model.state.bookmarks);

    //change ID in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`); // this will change the url without reloading, it take 3 ardument the first one is the state which does not matter, the second one is the title and the third one is the url
    //window.history has other uses like going back and forth in the pages like window.history.back()

    //close form
    setTimeout(function () {
      addReciepeView.toggleWindow();
    }, MODAL_CLOSE_SECONDS * 1000);
  } catch (err) {
    console.error(err);
    recipeView.renderError(err.message);
  }
};
const newFeature = function () {
  console.log(`welcome to the application`);
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addhandlerUpdateService(controlServings);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerPagination(controlPagination);
  recipeView.addHandlerBookmark(controlAddBookmark);
  addReciepeView.addHandlerUpload(controlAddRecipe);
  newFeature();
};
init();
