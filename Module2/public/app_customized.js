"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var order_controller_1 = __importDefault(require("./controllers/order-controller"));
var logging_1 = __importDefault(require("./middlewares/logging"));
var app = express_1.default();
var mw2 = function (req, res, next) {
    console.log('Test 1');
    next();
};
var mw3 = function (req, res, next) {
    console.log('End');
    next();
};
app.use('', logging_1.default, mw2);
// The router
app.get('/', function (req, res, next) { res.end('This is your express server.'); next(); });
app.get('/order', order_controller_1.default);
app.use(mw3);
app.listen(3000, function () { return console.log('The server is running on  http://localhost:3000'); });
