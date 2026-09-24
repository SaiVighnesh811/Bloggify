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

mongoose.connect(process.env.MONGO_URL,{
    serverSelectionTimeoutMS: 15000,
    bufferCommands: false 
})
.then(()=>console.log('MongoDb connection successfull'))
.catch((err)=>console.log('Error connectiong mongoDB',err))

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAunthenticationCookie("token"))
app.use(express.static('./public'))

// app.use((req, res, next) => {
//   if (mongoose.connection.readyState !== 1) {
//     return res.status(503).send("Database booting up, please refresh in a moment.");
//   }
//   next();
// });

app.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connection.asPromise();
    }
    const blogs = await Blog.find({});
    res.render('home', {
      user: req.user,
      blogs: blogs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('home', {
      user: req.user,
      blogs: [],
      error: "Database connection delay. Please refresh the page.",
    });
  }
});

app.use('/user',userRoute)
app.use('/blog',blogRoute )

app.listen(PORT,()=>console.log('Server Running at the PORT',PORT))