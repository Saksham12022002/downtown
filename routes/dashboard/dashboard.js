const express = require("express")
const User = require('../../models/user')
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
        } catch (error) {
            console.log(error);
        }
    }
})



module.exports = router