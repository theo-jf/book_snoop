const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Fetch the addresses associated with specific edition
router.get('/', (req, res) => {

    editionIsbn = req.query.isbn;

    // When doing stretch goals, make this query fetch addresses that match the user's zip code
    sqlText = `SELECT addresses.*, COUNT(*), ARRAY_AGG(libraries.condition) AS conditions,
                                             MODE() WITHIN GROUP (ORDER BY libraries.condition DESC) AS most_common_condition
                    FROM "addresses"
                        JOIN "libraries" ON addresses.id = libraries.address_id
                        JOIN "saved_books" ON libraries.book_id = saved_books.id
                            WHERE saved_books.isbn = $1
                            GROUP BY addresses.id
                            ORDER BY COUNT(libraries.condition) DESC;`

    pool.query(sqlText, [editionIsbn])
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error in GET /api/addresses query', error)
            res.sendStatus(500);
        })

});

module.exports = router;