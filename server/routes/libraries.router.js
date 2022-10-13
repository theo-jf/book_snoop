const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {

    // ••• This route is forbidden if not logged in •••
    // Get a user's library
    sqlText = `SELECT 
                    libraries.id AS library_id,
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
        const newCondition = req.body.condition;
        // Update library item condition if sent condition matches accepted condition value
        if (newCondition === 'F' || newCondition === 'NF' || newCondition === 'VG' || newCondition === 'G' || newCondition === 'FR' || newCondition === 'P') {
            const sqlText = `UPDATE "libraries"
                                SET "condition" = $1
                                WHERE "id" = $2
                                AND "user_id" = $3;`
            pool.query(sqlText, [newCondition, req.params.id, req.user.id])       
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
    } else if (req.body.newAddressObject) { // If location has been sent

        const location = req.body.newAddressObject;

        // First, attempt to insert the address into the address table assuming it's new
        const sqlText = `INSERT INTO "addresses"
                            ("name", "street_address", "city", "state", "zip", "googleMaps_placeId")
                            VALUES
                            ($1, $2, $3, $4, $5, $6)
                            RETURNING "id";`

        pool.query(sqlText, [location.name, location.street_address, location.city, location.state, location.zip, location.googleMaps_placeId])       
            .then((results) => {
                // Use the results to get the new address id, then update the library entry
                console.log('RESULTS IN NEW ADDY', results.rows[0].id);
                const addressId = results.rows[0].id;
                const sqlText = `UPDATE "libraries"
                                    SET "address_id" = $1
                                    WHERE "id" = $2;`

                pool.query(sqlText, [addressId, req.params.id])
                .then(results => {
                    res.sendStatus(200);
                })
                .catch(error => {
                    console.log('Error in PUT /api/library update libraries query using new address id', error);
                    res.sendStatus(500);
                })
            })
            .catch((error) => {
                // In catch -> get the existing address id to use
                console.log('Error creating new address, fetching existing address id', error)
                const sqlText = `SELECT "id" FROM "addresses"
                                    WHERE "googleMaps_placeId" = $1;`
                
                pool.query(sqlText, [location.googleMaps_placeId])
                    .then((results) => {
                        // Use the results to get the existing address id, then update the library entry
                        console.log('RESULTS IN NEED USE OLD ADDY', results.rows[0].id);
                        const addressId = results.rows[0].id;
                        const sqlText = `UPDATE "libraries"
                                            SET "address_id" = $1
                                            WHERE "id" = $2;`
                        
                        pool.query(sqlText, [addressId, req.params.id])
                            .then(results => {
                                res.sendStatus(200);
                            })
                            .catch(error => {
                                console.log('Error in PUT /api/library update libraries query using existing address id', error);
                                res.sendStatus(500);
                            })
                    })
                    .catch((error) => {
                        console.log('Error in PUT /api/library query, could not fetch existing address id', error);
                        res.sendStatus(500);
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