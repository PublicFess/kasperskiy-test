'use strict';

module.exports = function () {
  return function (err) {
    console.log(err);
    this.emit('end')
  };
};