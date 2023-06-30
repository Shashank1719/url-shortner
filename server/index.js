const express = require('express')
const app = express()
const dotenv = require('dotenv');
const {urls} = require('./models/url');
const port = process.env.PORT || 3001;
const cors = require('cors');

dotenv.config();

require('./db/db');

app.use(express.json());
// app.use(require('./routes/auth'));

app.use(cors());

app.get('/', async(req,res) => {
    res.json({
        message: "Hello from server side"
    })
})

app.post('/', async(req, res, next) => {
    let {slug, url} = req.body;
    try {
        const slugExist = await urls.findOne({slug: slug});
        if(slugExist){
            res.json({
                message: "Slug Already in Use...🍔"
            })
        }else{
            const newUrlRequest = new urls({slug, url});
            const result = await newUrlRequest.save();
            console.log(`${result} added successfully`);
            res.status(200).json({
                message: "Url Added to database"
            })
        }

    } catch (error) {
        next(error);
    }
})

app.get('/:id', async (req, res, next) => {
    //  TODO: -> redirect to url
    const { id: slug } = req.params;
    try {
        const url = await urls.findOne({ slug });
        if(url){
            // res.redirect(url.url);
            res.json(url)
        }
        res.redirect(`/?error=${slug} not found`);
    } catch (error) {
        res.redirect(`/?error=Link Not found`)
    }
});

app.use((error, req, res, next) => {
    if(error.status){
        res.status(error.status);
    }else{
        res.status(500);
    }
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '⚕️' : error.stack
    })
})

app.listen(port, ()=> {
    console.log(`Connected to port ${port}`);
})