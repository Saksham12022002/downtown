const express = require("express")
const router = express.Router()

router.get('/',(req,res)=>{
    res.render('dashboard/afterlogin',{
        fileused: "dashboard"
    })
    console.log(res.locals.user);
    if(res.locals.user.usertype=="user"){
        res.render('dashboard/afterlogin',{
            fileused: "dashboard"
        })
    }else{
        res.redirect('/')
    }
})


module.exports = router