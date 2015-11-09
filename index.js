'use strict';

var tabbable = require('tabbable');
var focusin = require('focusin');
var polyfilled = false;

function init(element) {

  // lazily polyfill focusin for firefox
  if (!polyfilled) {
    focusin.polyfill();
    polyfilled = true;
  }

  function focus() {
    (tabbable(element)[0] || element).focus()
  }

  function onFocusIn(event) {
    if (element !== event.target && !element.contains(event.target)) {
      focus();
    }
  }

  focus();

  document.addEventListener('focusin', onFocusIn);

  return function teardown() {
    document.removeEventListener('focusin', onFocusIn);
  };
}

var teardownFn;

exports.scopeFocus = function(element) {
  if (teardownFn) teardownFn();
  teardownFn = init(element);
};

exports.unscopeFocus = function() {
  if (teardownFn) teardownFn();
  teardownFn = null;
};
