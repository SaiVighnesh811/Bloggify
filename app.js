require('dotenv').config();
const express=require('express')
const app=express();
const path=require('path')
const userRoute=require('./routes/user')
const blogRoute=require('./routes/blog')
const mongoose=require('mongoose')
const Blog=require('./models/blog')
const cookieParser=require('cookie-parser');
const { checkForAunthenticationCookie } = require('./middleware/auth');

const PORT=process.env.PORT || 8000

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('MongoDb connection successfull'))
.catch((err)=>console.log('Error connectiong mongoDB',err))

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAunthenticationCookie("token"))
app.use(express.static('./public'))

app.get('/',async(req,res)=>{
    const blogs=await Blog.find({})
    res.render('home',{
        user:req.user, 
        blogs:blogs,
    })
})

app.use('/user',userRoute)
app.use('/blog',blogRoute )

app.listen(PORT,()=>console.log('Server Running at the PORT',PORT))