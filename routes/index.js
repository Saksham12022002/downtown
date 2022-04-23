const express = require("express")
const router = express.Router()

router.get('/',(req,res)=>{
    console.log(req.locals);
    let usertype
    if(res.locals.user){
        usertype = res.locals.user.usertype
        res.render('Home',{
            usertype: usertype,
            fileused: "Home"
        })
    }else{
        res.render('page',{
            usertype: usertype,
            fileused: "page"
        })
    }
})


module.exports = router