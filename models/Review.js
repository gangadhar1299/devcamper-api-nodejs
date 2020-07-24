const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add review title'],
        maxlength: 100
    },
    text: {
        type: String,
        required: [true, 'Please add some text']
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Please add a rating between 1 and 10']
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// User can only add one review per bootcamp
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true })

// Static method to find average review
ReviewSchema.statics.getAverageRating = async function (bootcampId) {

    const bootcampAverageRating = await this.aggregate([
        {
            $match: { bootcamp: bootcampId }
        },
        {
            $group: {
                _id: '$bootcamp',
                averageRating: { $avg: '$rating' }
            }
        }
    ]);

    try {
        await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
            averageRating: bootcampAverageRating[0].averageRating
        });
    } catch (error) {
        console.log(error);
    }

}

// Call getAverageCost after save
ReviewSchema.post('save', function () {
    this.constructor.getAverageRating(this.bootcamp);
});

// Call getAverageCost before remove
ReviewSchema.pre('remove', function () {
    this.constructor.getAverageRating(this.bootcamp);
});

module.exports = mongoose.model('Review', ReviewSchema);