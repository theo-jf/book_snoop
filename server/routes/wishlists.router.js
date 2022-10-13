const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {

    // ••• This route is forbidden if not logged in •••
    // Get a user's wishlist
    sqlText = `SELECT 
                    saved_books.*,
                    wishlists.*
                FROM "wishlists"
                    JOIN "saved_books" ON wishlists.book_id = saved_books.id
                        WHERE wishlists.user_id = $1;`

    pool.query(sqlText, [req.user.id])
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error in GET /api/wishlist query', error)
            res.sendStatus(500);
        })

});


module.exports = router;