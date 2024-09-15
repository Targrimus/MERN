const express = require('express');
const app = express();
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');



const {logEvents, logger} = require('./middleware/logger');

/* Parse JSON Data */
app.use(express.json());

/* Cookie Parser*/
app.use(cookieParser());

/* Cookie Parser*/
app.use(cors(corsOptions));


/* Logger middleware */
app.use(logger);


/* Static files */
app.use(express.static(path.join(__dirname,'public')));


/* Main Router */
const router = require('./routes/router');
app.use('/', router );


/* every other attempt to get */
app.all('*', (req, res) =>{
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'));

    }else if(req.accepts('json')){
        res.json({message: '404 not found'});
        
    }else{
        res.type('txt').send('404 not found');
    }
});

/* Port Name */
const PORT = process.env.PORT | 5000;


app.use(errorHandler);

/* Server listen */
const server = app.listen(PORT, (err) => {
    console.log("Server is running on port ", PORT);
})