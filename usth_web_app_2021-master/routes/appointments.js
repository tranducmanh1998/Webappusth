var express = require('express');
var router = express.Router();
const CRUDAppointment = require('../services/CRUDAppointment');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const appointmentList = await CRUDAppointment.getList(parseInt(req.query.appointment_limit), parseInt(req.query.appointment_offset));
  res.send(appointmentList);
});
router.get('/appointment', async function(req, res, next) {
  const appointmentList = await CRUDAppointment.getOne(parseInt(req.query.id));
  res.send(appointmentList);
});
router.post('/create', async function(req, res, next) {
  const appointment = req.body;
  await CRUDAppointment.create(appointment);
  res.send('Created a appointment');
});
router.put('/update', async function(req, res, next) {
  const appointment = req.body;
  await CRUDAppointment.update(appointment);
  res.send('Updated a appointment');
});
router.delete('/delete', async function(req, res, next) {
  await CRUDAppointment.delete(parseInt(req.query.id));
  res.send('Deleted a appointment');
});

module.exports = router;
