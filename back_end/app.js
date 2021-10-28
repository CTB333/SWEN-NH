/*
    For application to run (on localhost 4200) must start 
    nodemon app 
    and then 
    ng serve 
*/

const express = require('express');
const cors = require('cors');
const mongo = require('mongoose')
const app = express();
const corsOptions = {
    origin:'*', 
    credentials:true,  
    optionSuccessStatus:200,
}

const userRoutes = require('./routes/userRoutes')

app.use(cors(corsOptions));
app.use(express.json({
    limit: '1mb'
}));
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
    console.log(req)
})

app.use('/users', userRoutes)

mongo.connect('mongodb://localhost:27017/NewHorizon', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(3000, () => {
        console.log('Mongo connected on port 3000')
    })
})