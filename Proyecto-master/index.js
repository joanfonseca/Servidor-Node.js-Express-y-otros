var express = require('express');
var app = express();
const ejs = require('ejs');
const uuid = require('uuid/v4');
const { format } = require('timeago.js');
const routes = require('./route/routes');
const morgan = require('morgan');
const routesApi = require('./route/routeDocs');
const path = require('path');
const multer = require('multer');

//impor de db
require('./database');

app.use(morgan('dev'));
app.set('views',path.join(__dirname,'views'))

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuid() + path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'));
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//esta funcion controla los errores de sevidor
app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.type('text/plain');
    res.status(500).send('500 Server Error, Controlando error');
    next();
});
// Global variables
app.use((req, res, next) => {
    app.locals.format = format;
    next();
});
//importa las rutas de enlace
app.use(routes);
app.use(routesApi);
app.use(express.static(path.join(__dirname, 'public')));

// inica el servidor
app.listen(process.env.PORT || 3000, function() {
    console.log('Example app listening on port 3000!');
});
