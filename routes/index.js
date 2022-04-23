const express = require("express")
const router = express.Router()

router.get('/',(req,res)=>{
    console.log(req.locals);
    if(res.locals.user){
        res.render('Home',{
            fileused: "Home"
        })
    }else{
        res.render('page',{
            fileused: "page"
        })
    }
})


module.exports = router