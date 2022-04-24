const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    bookedby:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    bookedfor:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    bookedbyName:{
        type: String,
        required: true
    },
    bookedforName:{
        type: String,
        required: true
    },
    bookingdate:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    
    CreatedAt:{
        type:Date,
        required:true,
        default: Date.now
    },

    status:{
        type: String,
        default: "Pending"
    }
})

module.exports = mongoose.model('Booking',bookingSchema)