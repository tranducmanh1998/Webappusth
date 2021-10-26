const _ = require('lodash');
const moment = require('moment-timezone');
const {Appointment, Patient} = require('../models');

async function createAppointment(appointment) {
    return await Appointment.create({
        patient_id: appointment.patient_id,
        start_time: moment(appointment.start_time).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD'),
        end_time: moment(appointment.end_time).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD'),
        med_history: appointment.med_history,
        reason: appointment.reason
    });
}

async function updateAppointment(appointment) {
    return await Appointment.update({
        patient_id: appointment.patient_id,
        start_time: moment(appointment.start_time).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD'),
        end_time: moment(appointment.end_time).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD'),
        med_history: appointment.med_history,
        reason: appointment.reason
    }, {
        where: {
            id: appointment.id
        }
    });
}

async function getListAppointments(pLimit, pOffset) {
    if (isNaN(pLimit)) {
        pLimit = undefined;
    }
    if (isNaN(pOffset)) {
        pOffset = undefined;
    }
    const appointments = await Appointment.findAll({
        raw: true,
        nest: true,
        attributes: ['id', 'start_time', 'end_time', 'med_history', 'reason'],
        offset: pOffset,
        limit: pLimit,
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Patient,
                attributes: ['name']
            }
        ]
    });
    return await appointments.map((appointment) => {
        return {
            id: appointment.id,
            start_time: moment(appointment.start_time).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD'),
            end_time: moment(appointment.end_time).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD'),
            med_history: appointment.med_history,
            reason: appointment.reason,
            patient_name: _.get(appointments, 'Patient.name')
        }
    });
}

async function getAppointment(appointmentId) {
    const appointment = await Appointment.findOne({
        raw: true,
        nest: true,
        attributes: ['id', 'start_time', 'end_time', 'med_history', 'reason'],
        where: {
            id: appointmentId
        },
        include: [
            {
                model: Patient,
                attributes: ['name']
            }
        ]
    });
    return {
        id: appointment.id,
        start_time: moment(appointment.start_time).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD'),
        end_time: moment(appointment.end_time).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD'),
        med_history: appointment.med_history,
        reason: appointment.reason,
        patient_name: _.get(appointment, 'Patient.name')
    }
}

async function deleteAppointment(appointmentId) {
    return await Appointment.destroy({
        where: {
            id: appointmentId
        }
    })
}

module.exports = {
    create: createAppointment,
    update: updateAppointment,
    getList: getListAppointments,
    getOne: getAppointment,
    delete: deleteAppointment
}
