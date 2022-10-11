const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {

    // ••• Make this route forbidden if not logged in •••
    // Get a user's library
    sqlText = `SELECT 
                    saved_books.*,
                    libraries.*,
                    addresses.name,
                    addresses."googleMaps_placeId"
                FROM "libraries"
                    JOIN "saved_books" ON libraries.book_id = saved_books.id
                    JOIN "addresses" ON libraries.address_id = addresses.id
                        WHERE libraries.user_id = $1;`

    pool.query(sqlText, [req.user.id])
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error in GET /api/libraries query', error)
            res.sendStatus(500);
        })

});


module.exports = router;