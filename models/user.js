const {Schema, model}=require('mongoose')
const {createHmac, randomBytes}=require('crypto');
const { createToken } = require('../service/auth');

const userSchema=new Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    profileImageURL:{
        type:String,
        default:'/images/default.png',
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER',
    }
},{timestamps:true});

userSchema.pre('save', function (){
    const user=this;
    if(!user.isModified('password')) return;
    const salt=randomBytes(16).toString();
    const hashedPassword=createHmac('sha512',salt).update(user.password).digest("hex")
    this.salt=salt;
    this.password=hashedPassword; 
})

userSchema.static('matchPasswordAndGenerateToken',async function(email,password){
    const user=await this.findOne({email});
    if(!user) throw new Error('User not found');

    const salt=user.salt;
    const hashedPassword=user.password
    const providedPassHash=createHmac('sha512',salt).update(password).digest("hex")
    if(hashedPassword!==providedPassHash) throw new Error('Password not matched');

    const token=createToken(user);
    return token;

})

const User=model('user',userSchema,'users')

module.exports=User;