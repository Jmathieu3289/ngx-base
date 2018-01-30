//Imports
const Users = require('./models/users');

//Consts
const express = require('express');
const router = express.Router();
const objection = require('objection');
const Model = objection.Model;
const Knex = require('knex');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Initialize knex connection. Make sure your .env file has correct keys.
const knex = Knex({
    client: 'mysql',
    useNullAsDefault: true,
    connection: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    }
});

// Give the connection to objection.
Model.knex(knex);

// --- API -----------------------------------------------------------------

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('');
});

/* -- PROGRESS -- */

router.get('/progress', (req, res) => {

    /*
    * Example GET route
    */

    /* 
    var response = {
        data: null,
        errors: []
    };

    //Must be logged in to get user details
    if (req.session.user == undefined) {
        response.errors.push('Not authorized');
        res.status(200).send(response);
    }

    Progress.query().where('user_id', '=', req.session.user.id).then(progress => {
        response.data = progress;
        res.status(200).send(response);
    });
    */

});

router.post('/purge', (req, res) => {

    /*
    * Example POST route
    */
    
    /*
    var response = {
        data: null,
        errors: []
    };

    //Must be logged in to get user details
    if (req.session.user == undefined) {
        response.errors.push('Not authorized');
        
    }

    if (req.body.progress_id == null) {
        response.errors.push('progress_id required');
    }

    if (req.body.amount == null) {
        response.errors.push('amount required');
    }

    if (response.errors.length > 0) {
        res.status(200).send(response);
    }

    //Get the existing progress first
    Progress
        .query()
        .findOne('id', '=', req.body.progress_id)
        .then(async progress => {
            if (progress != null) {

                var newCredits = progress.credits + Math.floor((progress.current_count + req.body.amount) / progress.max_count);
                var newCurrentCount = (progress.current_count + req.body.amount) % progress.max_count;

                const progressID = await Progress
                    .query()
                    .patchAndFetchById(progress.id, { current_count: newCurrentCount, credits: newCredits });
                
                response.data = progressID;
                
                res.status(200).send(response);
                
            } else {
                response.errors.push('progress id not found');
                res.status(200).send(response);
            }
        })
        .catch(err => {
            response.errors.push(err);
            res.status(200).send(response);
        });

    */

});

/* -- SESSION MANAGEMENT --*/

router.get('/session', (req, res) => {

    var response = {
        data: null,
        errors: []
    };

    if (req.session.user == null) {
        response.errors.push('No session');
    }

    res.status(200).send(response);

});

router.post('/logout', (req, res) => {

    var response = {
        data: null,
        errors: []
    };

    req.session.destroy((err) => {
        if (err) {
            response.errors.push(err);
        }
        res.status(200).send(response);
    });
    
});

router.post('/login', (req, res) => {

    var response = {
        data: null,
        errors: []
    };

    if (req.body.email == null || req.body.password == null) {
        response.errors.push('Invalid email or password.');
        res.status(200).send(response);
    } else {
        Users
            .query()
            .where('email', '=', req.body.email)
            .then(user => {
                if (user == null || user.length == 0) {
                    response.errors.push('Invalid email or password.');
                    res.status(200).send(response);
                } else {
                    var u = user[0];
                    bcrypt.compare(req.body.password, u.password, function (err, r) {
                        if (r) {
                            delete u.password; //Don't send the user their own encrypted password.
                            response.data = u;

                            //Set session data
                            req.session.user = u;

                        } else {
                            response.errors.push('Invalid email or password.');
                        }
                        res.status(200).send(response);
                    });
                }
            });
    }
});

/* -- END SESSION MANAGEMENT --*/

// ---------------------------------------------------------------------------

module.exports = router;