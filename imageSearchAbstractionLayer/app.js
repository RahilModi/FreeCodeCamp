const express =  require('express');
const keys = require('./config/key');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');

require('./model/searchModel');

const SearchQuery = mongoose.model('searchQuerys');

mongoose.connect(keys.DATABASE_URL);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => console.log("Mongo DB connected!"));

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4570;

app.get('/',(req,res)=>{
    res.redirect('/latest');
});

const basicURL = `https://www.googleapis.com/customsearch/v1?key=${keys.GOOGLE_API}&cx=${keys.CUSTOM_ENGINE_ID}&searchType=image&q=`
app.get('/imagesearch/:searchParam',(req,res)=>{

    let {searchParam} = req.params; //let searchParam = req.params.searchParam
    let {offset} = req.query; //let offset = req.params.offset

    let data = new SearchQuery({
        searchQuery: searchParam,
        searchDate: new Date()
    });

    data.save( err => {
        if(err) res.send('Error in saving search query in Database');
        else console.log('data saved in collection..')
    });

    let count = 1;
    if(offset){
        count += (offset * 10);
    }
    let finalURL = `${basicURL}${searchParam}&num=10&start=${count}`;
    var responseArray = [];
    axios(finalURL).then((resp)=>{
        resp.data.items.forEach((image) => 
            responseArray.push(results(image))
        );
        res.send(responseArray);
    }).catch((err)=>{
        res.send("Error while searching image...");
    });
});

var results = (image)=>{
    return({
        link: image.link,
        title: image.title,
        snippet: image.snippet,
        imageType: image.mime,
        contextLink: image.image.contextLink
    });
};

app.get('/latest',(req,res)=>{
    SearchQuery.find({}).sort({createdAt:-1}).limit(10).exec((err,data)=>{
        results = [];
        data.forEach(item => {
            results.push({
                SearchTerm: item.searchQuery,
                When:item.searchDate,
            });
        });
        res.send(results);
    });
});

var formateResponse = (image)=>{
    return({
        imageTitle: image.title,
        imageLink: image.link,
        imageType: image.mime,
    });
}

app.listen(PORT, () => {
    console.log(`App is running on ${PORT} port`);
});
