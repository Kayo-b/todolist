import _ from 'lodash';
import './style.css';
import Icon from './icon.jpg';
import Data from './data.xml';
import Notes from './data.csv';
import DOM from './modules/UI.mjs';
import './style.scss';


function component() {
    const element = document.createElement('div');
  
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    // Add the image to our existing div.

    const myIcon = new Image();

    myIcon.src = Icon;
  
  
    element.appendChild(myIcon);
    console.log(Data);

    console.log(Notes);

    var loadContent = DOM.loadTodoList();
    DOM.loadContent()

    return loadContent;
  }
  
  component();