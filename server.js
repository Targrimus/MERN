const express = require('express');
const app = express();
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection')();



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

const userRouter = require('./routes/userRoutes');
app.use('/users', userRouter);

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

/*mongoose on connect */
mongoose.connection.once('open' , () => {
    /* Mongo Connected */
    console.log('Connected to MongoDB');
    logEvents(`Connected to MongoDB`,'database.log');

    /* Server listen */
    app.listen(PORT, (err) => {
        console.log("Server is running on port ", PORT);
    })
})

/*mongoose on fail */
mongoose.connection.on('error' , (err) => {
    /* Mongo Connected */
    console.log('Connection refused by MongoDB');
    logEvents(`${err.code}\t${err.codeName}\t${err.errmsg}`,'database.log');

})
