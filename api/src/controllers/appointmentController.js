const mongoose = require("mongoose");
const Model = require("../models");
const Post = Model.postSchema;
const dbConn = require("../database");

const findAll = async (req, res) => {
  // dbConn.query('SELECT * FROM follow where userID=?',userID, function (error, results, fields) {
  dbConn.query(" SELECT * from appointment", function (error, results, fields) {
    if (error) throw error;

    // check has data or not
    let message = "";
    if (results === undefined || results.length == 0)
      message = "appointment table is empty";
    else message = "Successfully retrived all appointment";

    return res.send({ data: results });
  });
};
const findAllitems = async (req, res) => {
  const limit = parseInt(req.query.limit) ?? 10;
  const offset = parseInt(req.query.offset) ?? 0;
  var patientName = req.query.patientName;
  var contact = req.query.contact;
  var status = parseInt(req.query.status);
  var appointmentID = parseInt(req.query.appointmentID);

  var query = "";

  if (patientName) {
    query =
      "SELECT  appointment.status as status ,appointment.id as appointment_id,appointment.date as date,appointment.patient_id as patient_id,appointment.time as time,doctor.name as doctor_name,patient.contact_no as contact_no, patient.name as patient_name FROM ((appointment INNER JOIN doctor ON appointment.doctor_id=doctor.id) INNER JOIN patient ON appointment.patient_id=patient.id) where patient.name=" +
      `"${patientName}"` +
      " ORDER BY  appointment.id DESC limit " +
      limit +
      " OFFSET " +
      offset;
  } else if (contact) {
    query =
      "SELECT  appointment.status as status ,appointment.id as appointment_id,appointment.date as date,appointment.patient_id as patient_id,appointment.time as time,doctor.name as doctor_name,patient.contact_no as contact_no, patient.name as patient_name FROM ((appointment INNER JOIN doctor ON appointment.doctor_id=doctor.id) INNER JOIN patient ON appointment.patient_id=patient.id)  where patient.contact_no=" +
      contact +
      " ORDER BY  appointment.id DESC limit " +
      limit +
      " OFFSET " +
      offset;
  } else if (status) {
    query =
      "SELECT  appointment.status as status ,appointment.id as appointment_id,appointment.date as date,appointment.patient_id as patient_id,appointment.time as time,doctor.name as doctor_name,patient.contact_no as contact_no, patient.name as patient_name FROM ((appointment INNER JOIN doctor ON appointment.doctor_id=doctor.id) INNER JOIN patient ON appointment.patient_id=patient.id) where appointment.status=" +
      status +
      " ORDER BY  appointment.id DESC limit " +
      limit +
      " OFFSET " +
      offset;
  } else if (appointmentID) {
    query =
      "SELECT  appointment.status as status ,appointment.id as appointment_id,appointment.date as date,appointment.patient_id as patient_id,appointment.time as time,doctor.name as doctor_name,patient.contact_no as contact_no, patient.name as patient_name FROM ((appointment INNER JOIN doctor ON appointment.doctor_id=doctor.id) INNER JOIN patient ON appointment.patient_id=patient.id) where appointment.id=" +
      appointmentID +
      " ORDER BY  appointment.id DESC limit " +
      limit +
      " OFFSET " +
      offset;
  }

  var quecount = dbConn.query(
    "Select count(*) as TotalCount from appointment",
    function (error, countResults, fields) {
      if (error) {
        return error;
      } else {
        console.log("query", query);
        if (patientName || appointmentID || status || contact) {
          dbConn.query(query, function (error, results, fields) {
            if (error) throw error;

            // check has data or not
            let message = "";
            if (results === undefined || results.length == 0)
              message = "appointment table is empty";
            else message = "Successfully retrived all appointment";
            console.log("results", results);

            return res.send({
              totalCount: countResults[0]?.TotalCount,
              data: results,
            });
          });
        } else {
          dbConn.query(
            "SELECT  appointment.status as status ,appointment.id as appointment_id,appointment.date as date,appointment.patient_id as patient_id,appointment.time as time,doctor.name as doctor_name,patient.contact_no as contact_no, patient.name as patient_name FROM ((appointment INNER JOIN doctor ON appointment.doctor_id=doctor.id) INNER JOIN patient ON appointment.patient_id=patient.id) ORDER BY  appointment.id DESC limit " +
              limit +
              " OFFSET " +
              offset,
            // [limit, offset],
            function (error, results, fields) {
              if (error) throw error;

              // check has data or not
              let message = "";
              if (results === undefined || results.length == 0)
                message = "appointment table is empty";
              else message = "Successfully retrived all appointment";

              return res.send({
                totalCount: countResults[0]?.TotalCount,
                data: results,
              });
            }
          );
        }
      }
    }
  );
};
// SELECT category.name as cat_name, subcategoey.name as subcat_name,products.id as p_id, products.name as p_name , products.price , products.available_qty FROM ((category INNER JOIN subcategoey ON category.id= subcategoey.cid) INNER JOIN products ON subcategoey.id = products.scid)
const findSingle = async (req, res) => {
  const { patient_id } = req.body;

  // dbConn.query('SELECT * FROM follow where userID=?',userID, function (error, results, fields) {
  dbConn.query(
    " SELECT * from appointment where patient_id=?",
    [patient_id],
    function (error, results, fields) {
      if (error) throw error;

      // check has data or not
      let message = "";
      if (results === undefined || results.length == 0)
        message = " no appointment";
      else message = "Successfully retrived all appointment";

      return res.send({ data: results });
    }
  );
};
const findSinglepatient = async (req, res) => {
  const { patient_id } = req.query;

  // dbConn.query('SELECT * FROM follow where userID=?',userID, function (error, results, fields) {
  dbConn.query(
    " SELECT * from patient where id=?",
    [patient_id],
    function (error, results, fields) {
      if (error) throw error;

      // check has data or not
      let message = "";
      if (results === undefined || results.length == 0) message = " no patient";
      else message = "Successfully retrived all patient";

      return res.send({ data: results });
    }
  );
};
const updateTimeDate = async (req, res) => {
  const { time, date, doctor_id, patient_id } = req.body;
  dbConn.query(
    "UPDATE appointment set time=?,date=? WHERE patient_id=? AND doctor_id=?",
    [time, date, patient_id, doctor_id],
    function (err, results) {
      if (err) {
        throw err;
      }
      let message = "";
      if (results.changedRows == 0) {
        message = "Update Failed";
      } else {
        message = "successfully updatedata";
      }
      console.log(message);
      return res.send({ data: results });
    }
  );
};
const store = async (req, res) => {
  const { time, date, doctor_id, patient_id } = req.body;
  console.log("req.body", req.body);
  dbConn.query(
    "SELECT * FROM appointment where time=? AND patient_id=? ",
    [time, patient_id],
    function (error, results, fields) {
      if (error) throw error;

      console.log("results", results.length);
      // check has data or not
      let message = "";
      if (results === undefined || results.length > 0) {
        message = " Already have same date of this patient";
        return res.send({
          status: 400,
          message: " Already have same date of this patient",
        });
      } else {
        // validation
        // if (!time || !date)
        //     return res.status(400).send({ error: true, message: 'Please select date  and time' });

        // insert to db
        dbConn.query(
          "INSERT INTO appointment (time ,date, doctor_id, patient_id) VALUES (? ,? ,? ,?)",
          [time, date, doctor_id, patient_id],
          function (error, results, fields) {
            if (error) throw error;
            return res.send({
              status: 200,
              data: results,
              message: " Your Appointment submitted",
            });
          }
        );
      }
    }
  );
};

const destroy = async (req, res) => {
  let id = req.params.id;
  const { userID, followUserID, myfollowingCount, userFollowerCount } =
    req.query;

  dbConn.query("DELETE FROM follow where id=?", id, function (err, results) {
    if (err) {
      throw err;
    }
    let message = "";
    if (results.affectedRows == 0) {
      message = "follow not found";
    } else {
    }
    return res.send({ data: results, message: message });
  });
};

module.exports = {
  findAll,
  findAllitems,
  findSingle,
  updateTimeDate,
  store,
  destroy,
  findSinglepatient,
};
