const mongoose = require('mongoose');
const Model = require('../models');
const Post = Model.postSchema;
const dbConn = require('../database');

const findAll = async (req, res) => {
    // dbConn.query('SELECT * FROM murmurs', function (error, results, fields) {
    // const limit = parseInt(req.query.limit) ?? 10
    // const offset = parseInt(req.query.offset) ?? 0
     dbConn.query("Select * from doctor", function (error, results, fields) {
       
                if (error) throw error;

                // check has data or not
                let message = "";
                if (results === undefined || results.length == 0)
                    message = "doctor table is empty";
                else
                    message = "Successfully retrived all doctor";

                return res.send({  data: results });
            
        
    })
}





module.exports = { findAll };
