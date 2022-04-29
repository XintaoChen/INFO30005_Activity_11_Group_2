const express = require('express')

const patientRouter = express.Router()

const patientController = require('../controllers/patientController')

patientRouter.get('/:id', patientController.getPatientInfo)

module.exports = patientRouter
