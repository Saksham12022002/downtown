const express = require("express")
const User = require('../../models/user')
const Booking = require('../../models/booking')
const router = express.Router()

router.get('/performer/myappointment',async (req,res)=>{
        if(res.locals.user){
            let myappointments = await Booking.find({bookedfor:res.locals.user._id})
            res.render('appointments/performerpending',{
                fileused: 'performerpending',
                appointments: myappointments
            })
        }else{
            res.redirect('/')
        }
})

router.get('/changestatus/:id',async (req,res)=>{
    if(res.locals.user){
        console.log(req.params.id+req.params.status+"hello");
        // let appointment = await Booking.find({_id:req.params.id})
        // await Booking.findByIdAndUpdate(req.params.id,{set}, { new: true });
    }else{
        res.redirect('/')
    }
})

module.exports = router