const express = require('express');
const router = express.Router();
const cors = require('cors');
const urls = require('../models/url');

router.use(cors());

router.get('/', async(req,res) => {

})

router.post('/', async(req, res) => {
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