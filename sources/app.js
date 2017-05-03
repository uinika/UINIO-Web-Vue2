import _ from 'lodash';
import "./parts/test.scss"

function component () {
  var element = document.createElement('div');
  element.innerHTML = _.join(['Hello','webpack'], ' ');

  return element;
}

document.body.appendChild(component());