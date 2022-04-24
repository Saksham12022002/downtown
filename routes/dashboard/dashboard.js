const express = require("express")
const User = require('../../models/user')
const Booking = require('../../models/booking')
const router = express.Router()

router.get('/',(req,res)=>{
    if(res.locals.user&&res.locals.user.usertype=="user"){
        res.render('dashboard/afterlogin',{
            fileused: "dashboard"
        })
    }else{
        res.redirect('/')
    }
})

router.get('/:id',async (req,res)=>{
    if(res.locals.user){
        try {
            console.log(req.params.id)
            let performers  = await User.find({category:req.params.id})
            console.log(performers);
            res.render('dashboard/category',{
                fileused: "category",
                performers: performers,
                category: req.params.id
            })
        } catch (error) {
            console.log(error);
        }
    }
    else{
        res.redirect('/');
    }
})


router.get('/booknow/:id',async (req,res)=>{
    if(res.locals.user){
        try { 
            let performer  = await User.find({_id:req.params.id})
            console.log(performer);
            res.render('dashboard/booking',{
                fileused: "booking",
                performer: performer[0],
            })
        } catch (error) {
            console.log(error);
        }
    }
    else{
        res.redirect('/');
    }
})

router.post('/booknow/:id',async (req,res)=>{
    if(res.locals.user){
        let {description,bookingdate} = req.body
        console.log(bookingdate,typeof(bookingdate));
        try { 
            let booking = {
                bookedby: res.locals.user._id,
                bookedfor: req.params.id,
                description: description,
                bookingdate: bookingdate
            }
            try {
                const newbooking = new Booking(booking)
                console.log(newbooking);
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log("hi error");
            console.log(error);
        }
    }
    else{
        res.redirect('/');
    }
})


module.exports = router