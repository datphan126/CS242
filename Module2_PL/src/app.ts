import express from 'express';

import addressController from './controllers/address-controller';
import logger from './middlewares/logging';
import timestamp from './middlewares/timestamp';

const app = express();

app.use(logger);
app.use(timestamp);
app.use(express.static('../public'));
app.set('views', './views');
app.set('view engine', 'ejs');
// Router handlers
app.get('/', (req, res, next) => {
    res.render('index', {
        title: 'The index page title',
        content: 'This is the content for the index page.'
    });
});
app.get('/address', addressController);

app.listen(4000, () => console.log('The server is running on  http://localhost:4000'));