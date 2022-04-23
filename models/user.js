const mongoose = require("mongoose")
const { isEmail } = require("validator")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
    },
    name:{
        type:String,
    },
    desc:{
        type: String,
    },
    category:{
        type: String
    },
    admin :{
        type:Boolean,
        default:false
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Please enter an email"],
        lowercase:true,
        validate:[isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter an password"],
        minlength:[4,"Minimum password is 4 characters"]
    },
    usertype:{
        type:String,
        required:[true,"Please enter a usertype"],
    },
    location:{
        type: String,
        default:"Prayagraj",
        required:[true,"Please enter your loaction"],
    },
    mobile:{
        type: String,
    },
    upperfees:{
        type: Number
    },
    lowerfees:{
        type: Number
    },
    bookings:[{
        bookingid:{
            type: mongoose.Schema.Types.ObjectId
        },
        
    }]

})

//mongoose hook to hash the password
userSchema.pre("save",async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

//creating a statics login method
userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email})
    if(user){
        const auth =  await bcrypt.compare(password,user.password)
        if(auth){
            return user
        }
        throw Error("Incorrect Password")
    }
    throw Error("Incorrect Email")
}


module.exports = mongoose.model('user',userSchema)