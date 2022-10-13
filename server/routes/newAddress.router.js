const express = require('express');
const router = express.Router();
const axios = require('axios');

const key = process.env.API_KEY;

router.get('/', (req, res) => {
    const query = req.query.query;
    console.log('query:', query);

    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${key}`)
    .then((addressInfo => {
    //   console.log(books.data.docs);
      res.send(addressInfo.data);
    }))
    .catch((error => {
      console.log('/api/newaddress GET Error', error);
    }));
})

module.exports = router;