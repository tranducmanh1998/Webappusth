const _ = require('lodash');
const moment = require('moment-timezone');
const {Patient, Occupation} = require('../models');

async function createPatient(patient) {
    return await Patient.create({
        occupation_id: patient.occupation_id,
        ssn: patient.ssn,
        name: patient.name,
        gender: patient.gender,
        dob: moment(patient.dob).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD'),
        phone: patient.phone,
        address: patient.address,
        email: patient.email
    });
}

async function updatePatient(patient) {
    return await Patient.update({
        occupation_id: patient.occupation_id,
        ssn: patient.ssn,
        name: patient.name,
        gender: patient.gender,
        dob: moment(patient.dob).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD'),
        phone: patient.phone,
        address: patient.address,
        email: patient.email
    }, {
        where: {
            id: patient.id
        }
    });
}

async function getListPatients(pLimit, pOffset) {
    if (isNaN(pLimit)) {
        pLimit = undefined;
    }
    if (isNaN(pOffset)) {
        pOffset = undefined;
    }
    const patients = await Patient.findAll({
        raw: true,
        nest: true,
        attributes: ['id', 'name', 'ssn', 'gender', 'dob', 'phone', 'address', 'email'],
        offset: pOffset,
        limit: pLimit,
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Occupation,
                attributes: ['name']
            }
        ]
    });
    return await patients.map((patient) => {
        return {
            id: patient.id,
            name: patient.name,
            ssn: patient.ssn,
            gender: patient.gender,
            dob: moment(patient.dob).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD'),
            phone: patient.phone,
            address: patient.address,
            email: patient.email,
            occupation_name: _.get(patients, 'Occupation.name')
        }
    });
}

async function getPatient(patientId) {
    const patient = await Patient.findOne({
        raw: true,
        nest: true,
        attributes: ['id', 'name', 'ssn', 'gender', 'dob', 'phone', 'address', 'email'],
        where: {
            id: patientId
        },
        include: [
            {
                model: Occupation,
                attributes: ['name']
            }
        ]
    });
    return {
        id: patient.id,
        name: patient.name,
        ssn: patient.ssn,
        gender: patient.gender,
        dob: moment(patient.dob).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD'),
        phone:patient.phone,
        address: patient.address,
        email: patient.email,
        occupation_name: _.get(patient, 'Occupation.name')
    }
}

async function deletePatient(patientId) {
    return await Patient.destroy({
        where: {
            id: patientId
        }
    })
}

module.exports = {
    create: createPatient,
    update: updatePatient,
    getList: getListPatients,
    getOne: getPatient,
    delete: deletePatient
}
