const express = require('express');
const app = express();
const path = require('path');


const PORT = process.env.PORT | 5000;

app.use(express.static(path.join(__dirname,'public')));

const router = require('./routes/router');
app.use('/', router );


app.all('*', (req, res) =>{
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'));

    }else if(req.accepts('json')){
        res.json({message: '404 not found'});
        
    }else{
        res.type('txt').send('404 not found');
    }
});

const server = app.listen(PORT, (err) => {
    console.log("Server is running on port ", PORT);
})