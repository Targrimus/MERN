const express = require('express');
const app = express();
const path = require('path');

/* Parse JSON Data */
app.use(express.json());


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


/* Server listen */
const server = app.listen(PORT, (err) => {
    console.log("Server is running on port ", PORT);
})