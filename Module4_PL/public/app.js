"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
// Controllers
var productFormController_1 = __importDefault(require("./controllers/productFormController"));
var findProductController_1 = __importDefault(require("./controllers/findProductController"));
// Load environment variables
dotenv_1.default.config();
console.log(process.env.DB_URI);
// Initialize MongoDB
mongoose_1.default.connect(process.env.DB_URI, { useNewUrlParser: true });
var db = mongoose_1.default.connection;
var app = express_1.default();
// support parsing of application/json type post data
app.use(body_parser_1.default.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('../public'));
app.set('views', './views');
app.set('view engine', 'ejs');
// Routers
app.get('/', function (req, res) { return res.end('This is the Home page.'); });
app.get('/productForm', function (req, res) { return res.render('product-form'); });
app.post('/submitProduct', productFormController_1.default);
app.get('/findProduct', findProductController_1.default);
app.listen(3000, function () { return console.log('The server is running on http://localhost:3000'); });
