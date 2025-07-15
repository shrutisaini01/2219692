const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const urlRoutes=require('./routes/url.routes');
const middleware=require('./Logging_Middleware/middleware');

const app=express();
app.use(cors());
app.use(express.json());
app.use(middleware);

mongoose.connect('mongodb://localhost:27017/affordmed');
app.use('/shorturls',urlRoutes);

app.listen(3000, () => {
    console.log("Server is running on port: 3000!");
});