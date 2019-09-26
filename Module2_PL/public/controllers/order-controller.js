"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handler = function (req, res, next) {
    console.log('The order controller is called.');
    res.end('This is the order page');
    console.log('The order controller is finished.');
    next();
};
exports.default = handler;
