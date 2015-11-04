'use strict';

// focusin polyfill for firefox
require('focusin');

function init(element) {
  function onFocusIn(event) {
    if (element !== event.target && !element.contains(event.target)) {
      element.focus();
    }
  }

  element.focus();
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
