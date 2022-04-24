const express = require("express")
const User = require('../../models/user')
const router = express.Router()

router.get('/',(req,res)=>{
    if(res.locals.user&&res.locals.user.usertype=="performer"){
        res.render('performers/regperformers',{
            fileused: "performers"
        })
    }else{
        res.redirect('/')
    }
})

router.post("/",async(req,res)=>{
    const {name,mobile,location,desc,category,upperfees,lowerfees} = req.body
    try {
        console.log(res.locals.user);

        const updatedPost = {name,mobile,location,desc,category,upperfees,lowerfees}
        await User.findByIdAndUpdate(res.locals.user._id, updatedPost, { new: true });
        const user = await User.findOne({_id: res.locals.user._id})
        res.status(201).json(user)
    } catch (error) {
        console.log("thiss is errro", error);
        res.status(400).send(errors)
    }
})


module.exports = router