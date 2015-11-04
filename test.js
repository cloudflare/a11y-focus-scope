'use strict';

var expect = require('chai').expect;
var focusScope = require('./');

function buildElement(tagName, attributes, innerHTML) {
  var element = document.createElement(tagName);
  for (var attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }
  element.innerHTML = innerHTML || '';
  return element;
}

describe('focusScope', function() {
  it('should focus the element immediately', function() {
    var element = buildElement('div', { tabindex: '-1' });
    document.body.appendChild(element);

    focusScope.scopeFocus(element);

    expect(document.activeElement).to.equal(element);

    focusScope.unscopeFocus();
    element.remove();
  });

  it('should focus the first focusable element if available', function() {
    var element = buildElement('div', { tabindex: '-1' });
    var button = buildElement('button');
    element.appendChild(button);
    document.body.appendChild(element);

    focusScope.scopeFocus(element);

    expect(document.activeElement).to.equal(button);

    focusScope.unscopeFocus();
    element.remove();
  });

  it('should refocus when focus leaves the element', function() {
    var element = buildElement('div', { tabindex: '-1' });
    var button = buildElement('button');
    document.body.appendChild(element);
    document.body.appendChild(button);

    focusScope.scopeFocus(element);
    button.focus();

    expect(document.activeElement).to.equal(element);

    focusScope.unscopeFocus();
    element.remove();
    button.remove();
  });

  it('should stop refocusing when unscopeFocus is called', function() {
    var element = buildElement('div', { tabindex: '-1' });
    var button = buildElement('button');
    document.body.appendChild(element);
    document.body.appendChild(button);

    focusScope.scopeFocus(element);
    focusScope.unscopeFocus();
    button.focus();

    expect(document.activeElement).to.equal(button);

    element.remove();
    button.remove();
  });
});
