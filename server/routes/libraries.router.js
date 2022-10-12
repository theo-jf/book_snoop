const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {

    // ••• This route is forbidden if not logged in •••
    // Get a user's library
    sqlText = `SELECT 
                    saved_books.*,
                    libraries.*,
                    addresses.*
                FROM "libraries"
                    JOIN "saved_books" ON libraries.book_id = saved_books.id
                    JOIN "addresses" ON libraries.address_id = addresses.id
                        WHERE libraries.user_id = $1;`

    pool.query(sqlText, [req.user.id])
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error in GET /api/library query', error)
            res.sendStatus(500);
        })

});

router.put('/:id', rejectUnauthenticated, (req, res) => {

    // ••• This route is forbidden if not logged in •••
    // If condition has been sent 
    if (req.body.condition) {
        // Update library item condition if sent condition matches accepted condition value
        if (req.body === 'F' || req.body === 'NF' || req.body === 'VG' || req.body === 'G' || req.body === 'FR' || req.body === 'P') {
            const sqlText = `UPDATE "libraries"
                                SET "condition" = $1
                                WHERE "id" = $2
                                AND "user_id" =$3;`
            pool.query(sqlText, [req.body.condition, req.params.id, req.user.id])       
                .then((results) => {
                    res.sendStatus(200);
                })
                .catch((error) => {
                    console.log('Error in PUT /api/library condition query', error)
                    res.sendStatus(500);
                })             
        } else {
            // If non-matching condition, send back 304 Not Modified
            res.sendStatus(304);
        }
    } else if (req.body.location) { // If location has been sent

        const location = req.body.location

        // First, attempt to insert the address into the address table assuming it's new
        const sqlText = `INSERT INTO "addresses"
                            ("name", "street_address", "city", "state", "zip", "googleMaps_placeId")
                            VALUES
                            ($1, $2, $3, $4, $5, $6)
                            RETURNING id;`

        pool.query(sqlText, [location.name, location.street_address, location.city, location.state, location.zip, location.googleMaps_placeId])       
            .then((results) => {
                // Use the results to get the new address id, then update the library entry
            })
            .catch((error) => {
                // In catch -> get the existing address id to use
                console.log('Error creating new address, fetching existing address id', error)
                const sqlText = `SELECT "id" FROM "addresses"
                                    WHERE "googleMaps_placeId" = $1;`
                
                pool.query(sqlText, [location.googleMaps_placeId])
                    .then((results) => {
                        // Use the results to get the existing address id, then update the library entry
                    })
                    .catch((error) => {
                        console.log('Error in PUT /api/library query, could not fetch existing address id', error)
                    })
            });     
    }

});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    
    // ••• This route is forbidden if not logged in •••
    deleteId = req.params.id;
    sqlText = `DELETE FROM "libraries"
                WHERE "id" = $1;`

    pool.query(sqlText, [deleteId])
        .then(results => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('Error in DELETE /api/library', error)
            res.sendStatus(500);
        })
});


module.exports = router;