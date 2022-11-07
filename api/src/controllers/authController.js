const mongoose = require('mongoose');
const Model = require('../models');
const dbConn = require('../database');

const login = async (req, res) => {
    const { email, password } = req.body
    dbConn.query("SELECT `id`, `name`, `email`, `created_at`, `password`  FROM `patient` WHERE `email` = ? AND `password`=?", [email, password], function (error, results, fields) {
        if (error) throw error;

        // check has data or not
        let message = "";
        let status;
        if (results === undefined || results.length == 0){
            message = "Login Failed";
            status = 400
        }
        else{
            status = 200
            message = "Successfully Login";
        }

        return res.send({status:status, data: results[0],message:message });
    });
}

const register = async (req, res) => {

    const { name, email, password,contact_no } = req.body
    console.log()
    dbConn.query('SELECT * FROM patient where email=?', [email], function (error, results, fields) {
        if (error) throw error;
        
        console.log("results",results.length)
        // check has data or not
        let message = "";
        if (results === undefined || results.length >0) {
            message = "Email Already Existes";
            return res.send({ status: 400, message: 'Email Already Existes' });
        }

        else {
            // validation
            if (!name || !email)
                return res.status(400).send({ error: true, message: 'Please provide user userName and email' });

            // insert to db
            dbConn.query("INSERT INTO patient (name ,email,password,contact_no) VALUES (? ,? ,? ,?)", [name, email, password,contact_no], function (error, results, fields) {
                if (error) throw error;
                return res.send({ status: 200, data: results, message: 'User successfully added' });
            });
        }

    });


}

const findUser = async (req, res) => {
    let userName = req.query?.userName;

       dbConn.query("SELECT * FROM user where userName= ?",userName , function (error, results, fields) {
        if (error) throw error;

        // check has data or not
        let message = "";
        if (results === undefined || results.length == 0)
            message = "Data Not Found";
        else
            message = "Successfully retrived all Data";

        return res.send({status:200, data: results [0]});
    });

}




module.exports = { login, register,findUser };
