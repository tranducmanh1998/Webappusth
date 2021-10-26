var express = require('express');
var router = express.Router();
const CRUDPatients = require('../services/CRUDPatients');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const patientList = await CRUDPatients.getList(parseInt(req.query.patient_limit), parseInt(req.query.patient_offset));
  res.send(patientList);
});
router.get('/patient', async function(req, res, next) {
  const patientList = await CRUDPatients.getOne(parseInt(req.query.id));
  res.send(patientList);
});
router.post('/create', async function(req, res, next) {
  const patient = req.body;
  await CRUDPatients.create(patient);
  res.send('Created a patient');
});
router.put('/update', async function(req, res, next) {
  const patient = req.body;
  await CRUDPatients.update(patient);
  res.send('Updated a patient');
});
router.delete('/delete', async function(req, res, next) {
  await CRUDPatients.delete(parseInt(req.query.id));
  res.send('Deleted a patient');
});

module.exports = router;
