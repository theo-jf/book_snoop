const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {

    // ••• This route is forbidden if not logged in •••
    // Get a user's wishlist
    const sqlText = `SELECT 
                    wishlists.id AS wishlist_id,
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

router.delete('/:id', rejectUnauthenticated, (req, res) => {

    // ••• This route is forbidden if not logged in •••
    // Delete wishlist item
    const sqlText = `DELETE FROM "wishlists"
                        WHERE "id" = $1
                        AND user_id = $2;`

    pool.query(sqlText, [req.params.id, req.user.id])
        .then((results) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error in DELETE /api/wishlist query', error);
            res.sendStatus(500);
        });
})


module.exports = router;