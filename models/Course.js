const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add course title']
    },
    description: {
        type: String,
        required: [true, 'Please add course description']
    },
    weeks: {
        type: Number,
        required: [true, 'Please add number of weeks']
    },
    tuition: {
        type: Number,
        required: [true, 'Please provide tuition cost']
    },
    minimumSkill: {
        type: String,
        required: [true, 'Please add a minimum skill'],
        enum: ['beginner', 'intermediate', 'advancded']
    },
    scholarshipAvailble: {
        type: Boolean,
        default: false
    },
    bootcamp: {
        type: mongoose.Types.ObjectId,
        ref: 'Bootcamp',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);