"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = require("../models/product");
var handler = function (req, res) {
    var _a = req.body, title = _a.title, weight = _a.weight, price = _a.price, amount = _a.amount, providers = _a.providers;
    try {
        product_1.createProduct(title, weight, price, amount, JSON.parse(providers));
        res.end("The product " + title + " has been created.");
    }
    catch (err) {
        console.error(err);
        res.end("The product " + title + " was not created due to invalid inputs.");
    }
};
exports.default = handler;
