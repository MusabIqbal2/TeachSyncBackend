const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    appointer: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    appointee: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    dateTime: Date,
    description: String,
    completed: {
        type: Boolean,
        default: false
    },
    cancelled: {
        type: Boolean,
        default: false
    }
});

const Appointments = mongoose.model('Appointments', AppointmentSchema);

module.exports = Appointments;