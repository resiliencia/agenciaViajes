
//express es como apache

import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

import dotenv from 'dotenv';
dotenv.config({path:"variables.env"});

const app = express();

//conectar a base de datos
db.authenticate()
  .then( () => console.log("bd conectada"))
  .catch( error => console.log(error))

//definir puerto y host
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

//habilitar pug
app.set('view engine', 'pug');

//obtener el año actual
app.use( (req, res, next) =>{
   //console.log(req);

   //crea variable
   const year = new Date();
   res.locals.actualYear = year.getFullYear();
   res.locals.nombresitio = "Agencia de viajes"
   console.log(res.locals);
   return next();

})

//agregar body parser para leer datos del formulario

app.use(express.urlencoded({extended:true}));


//definir la carpeta publica
app.use(express.static('public'));

//agregar router soporta get, post, delete, put
app.use('/', router);



//arranca servidor
app.listen( port, host, () =>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})

