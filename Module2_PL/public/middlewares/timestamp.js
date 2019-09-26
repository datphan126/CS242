"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logging = function (req, res, next) {
    console.log(new Date());
    next();
};
exports.default = logging;
