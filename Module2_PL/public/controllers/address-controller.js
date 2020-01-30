"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handler = function (req, res) {
    res.render('address', {
        name: 'Dustin',
        phoneNumber: '123-4567-8975',
        address: '123 Wall Street'
    });
};
exports.default = handler;
