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
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

// Static method to find average of cost tuitions
CourseSchema.statics.getAverageCost = async function (bootcampId) {

    const bootcampAverageCost = await this.aggregate([
        {
            $match: { bootcamp: bootcampId }
        },
        {
            $group: {
                _id: '$bootcamp',
                averageCost: { $avg: '$tuition' }
            }
        }
    ]);

    try {
        await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
            averageCost: Math.ceil(bootcampAverageCost[0].averageCost / 10) * 10
        });
    } catch (error) {
        console.log(error);
    }

}

// Call getAverageCost after save
CourseSchema.post('save', function () {
    this.constructor.getAverageCost(this.bootcamp);
});

// Call getAverageCost before remove
CourseSchema.pre('remove', function () {
    this.constructor.getAverageCost(this.bootcamp);
});


module.exports = mongoose.model('Course', CourseSchema);