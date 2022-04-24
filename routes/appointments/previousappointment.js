const express = require("express")
const User = require('../../models/user')
const Booking = require('../../models/booking')
const router = express.Router()

router.get('/previousappointment',async (req,res)=>{
        if(res.locals.user){
            let previousappointments = await Booking.find({bookedfor:res.locals.user._id,status:"Accepted"})
            res.render('appointments/previousappointment',{
                fileused: 'previous',
                appointments: previousappointments
            })
        }else{
            res.redirect('/')
        }
})

module.exports = router