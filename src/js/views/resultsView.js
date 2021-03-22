import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class ResultsView extends previewView {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No reciepes found for your search, please try again`;
  _successMessage = ``;
}
export default new ResultsView();
