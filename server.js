
const express = require('express')
const bodyParser = require('body-parser');
const ejs=require("ejs")
const mongoose = require('mongoose');
var session = require('express-session')
var passport=require("passport")
var nodemailer = require('nodemailer'); 
var maillist=['jacksparrowminimilitia@gmail.com'];
var pass=0;
//console.log(pass)
var _ = require('lodash');
const app = express()
const port = 3000
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
    //cookie: { secure: true }
  }))
  app.use(passport.initialize());
  app.use(passport.session());
mongoose.connect('mongodb://localhost:27017/opportunitygeeks', {useNewUrlParser: true,useUnifiedTopology: true});
/*********************************************************************************************************** */
/**********************************************SCHEMA************************************************************* */
/*********************************************************************************************************** */


var loginSchema = new mongoose.Schema({
   username:String
   ,
   password:String
  });

  var login = mongoose.model('logincollection', loginSchema);

var almuniSchema = new mongoose.Schema({
    title: String,
    description:String,
    phone:String,
    name:String,
    time:String
  });

  var almuni = mongoose.model('almunicollection', almuniSchema);

  var silence = new almuni({title:"WEB DEVELOPER",
  description: "William Henry Gates III (born October 28, 1955) is an American business magnate, software developer, investor, and philanthropist. He is best known as the co-founder of Microsoft Corporation.[2][3] During his career at Microsoft, Gates held the positions of chairman, chief executive officer (CEO), president and chief software architect, while also being the largest individual shareholder until May 2014. He is one of the best-known entrepreneurs and pioneers of the microcomputer revolution of the 1970s and 1980s. "
  ,phone:7404460475,
  name:"jack" });

  
  var eventSchema = new mongoose.Schema({
    eventname: String,
    organised:String,
    link:String,
    describevent:String,
    date:String,
    time:String
  });

  var event = mongoose.model('eventcollection', eventSchema);

  var silence1=new event({
    eventname:"PUBG TOURNAMNET",
    organised:"MANAN CLUB",
    link:"https://www.google.com/",
    describevent:"William Henry Gates III (born October 28, 1955) is an American business magnate, software developer, investor, and philanthropist. He is best known as the co-founder of Microsoft Corporation.[2][3] During his career at Microsoft, Gates held the positions of chairman, chief executive officer (CEO), president and chief software architect, while also being the largest individual shareholder until May 2014. He is one of the best-known entrepreneurs and pioneers of the microcomputer revolution of the 1970s and 1980s."
   , date:"2020-04-20"

  })

  


  var scholarSchema = new mongoose.Schema({
    scholarname: String,
    criteria:String,
    scholarlink:String,
    scholardescribe:String,
    scholardate:String,
    time:String
  });


  var scholar = mongoose.model('scholarcollection', scholarSchema);


  var silence2=new scholar({
    scholarname:"Siemens Scholarship Program",
    criteria:"Be below 20 years of age Have scored at least 60% marks in class 10 board exams.Have scored at least 50% marks in class 12 board exams.",
    scholarlink:"https://www.google.com/", 
    scholardescribe:"Siemens Scholarship Program 2019-20 is an initiative of Siemens India to support 1st year engineering students of the government colleges from streams like Mechanical/Production, Electrical, Electronics/Instrumentation, Electronics and Telecommunication, Computers/Information Technology, Instrumentation."
    ,scholardate:"2020-04-03"


  })

  /*********************************************************************************************************** */
  /****************************************SCHEMA******************************************************************* */
  /*********************************************************************************************************** */

  

/*********************************************************************************************************** */
/*********************************************************************************************************** */
/*********************************************************************************************************** */

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(express.static('public'));


/*********************************************************************************************************** */
/*********************************************************************************************************** */
/****************************************************GET******************************************************* */
/*********************************************************************************************************** */
/*********************************************************************************************************** */
/*******************************************GET**************************************************************** */
/*********************************************************************************************************** */
/*********************************************************************************************************** */
app.get('/', (req, res) => {
   
    res.render('home')

})
app.get('/almunifeed', (req, res) => {
    //console.log(maillist)
    almuni.find({}).sort({"time":-1}).exec(function(err,almunis){

        if(almunis.length===0){
            silence.save();
            res.redirect("/almunifeed")
        }
        else{

            res.render('almunifeed',{almunis:almunis});
        }
    })
})


app.get('/almunicompose', (req, res) => res.render('almunicompose'))
app.get('/login', (req, res) => res.render('login'))

app.get('/admin', (req, res) => res.render('admin'))
app.get('/eventfeed', (req, res) => {
    
        

    event.find({}).sort({"time":-1}).exec(function(error, events){

        if(events.length===0){
            silence1.save();
            res.redirect("/eventfeed")
        }
        else{

            res.render('eventfeed',{events:events});
        }
    })
})

app.get('/eventcompose', (req, res) => res.render('eventcompose'))

app.get('/scholarcompose', (req, res) => res.render('scholarcompose'))
app.get('/clubevents', (req, res) => res.render('club'))
app.get('/manan', (req, res) => res.render('manan'));
app.get('/scholarfeed', (req, res) => {
    

    scholar.find({}).sort({"time":-1}).exec(function(error, scholars){

        if(scholars.length===0){
            silence2.save();
            res.redirect("/scholarfeed")
        }
        else{
            //console.log(scholar.scholarname)
            // scholars.forEach(function(scholar){ 
                 console.log(scholar.scholarname)
            // })


            res.render('scholarfeed',{scholars:scholars});
        }
    })
})

app.get('/fest', (req, res) => res.render('fest'))

app.get('/about', (req, res) => res.render('about'))




/*********************************************************************************************************** */
/*********************************************************************************************************** */
/*********************************************GET************************************************************** */
/*********************************************************************************************************** */
/*********************************************************************************************************** */
/*********************************************************************************************************** */





/*********************************************************************************************************** */
/*********************************************************************************************************** */
/********************************************POST*********************************************************** */
/*********************************************************************************************************** */
/*********************************************************************************************************** */
/*********************************************************************************************************** */
//var logindata=[];
app.post('/login',(req,res) =>
{
    const username1= req.body.loguser
    const password1=req.body.logpass
    
const login0 = new login({
   username:username1,
   password:password1

});


login0.save();


res.redirect("/");
}
)



app.post('/almunicompose1',(req,res) =>
{
    const title1= req.body.title.toUpperCase()
    const description1=req.body.description
    const name1=req.body.name.toUpperCase()
    const phone1=req.body.no

    var age =new Date();
const almuni0 = new almuni({
    title: title1,
    description: description1,
    name:name1,
    phone:phone1,
    time:age

});

almuni0.save();


res.redirect("/almunifeed");
}
)
app.post('/admin',(req,res)=>{
    if(req.body.login=='karan')
    {
        if(req.body.password=='wadhwa'){ 
            pass=1;
            res.render('secret')
            console.log("pass=1")
       }
   }
        else
        res.render('error')
    
    
})

app.post('/almunidlt',(req,res)=>{
    var dele=req.body.mangta;
    almuni.findByIdAndRemove(dele,function(err){
        if(!err){
            res.redirect("/adminalmuni")
        }
    })

})
app.post('/eventdlt',(req,res)=>{
    var eve=req.body.mangta;
    event.findByIdAndRemove(eve,function(err){
        if(!err){
            res.redirect("/adminevent")
        }
    })

})
app.post('/scholardlt',(req,res)=>{
    var eve=req.body.mangta;
    scholar.findByIdAndRemove(eve,function(err){
        if(!err){
            res.redirect("/adminscholar")
        }
    })

})








app.post('/eventcompose',(req,res) =>
{   
    const eventname1=req.body.eventname.toUpperCase()
    const organised1= req.body.organised.toUpperCase()
    const link1=req.body.link
    const describevent1=req.body.describevent
    const date1=req.body.date
    var age =new Date();
    const event0 = new event({
    eventname: eventname1,
    organised: organised1,
    link:link1,
    describevent:describevent1,
    date:date1,

    time:age
});
event0.save();
console.log(maillist)
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'karanwadhwa0309@gmail.com',
      pass: '**********'
    }
  });
  


  
var mailOptions = {
    from: 'karanwadhwa0309@gmail.com',
    to: maillist,
    subject: 'OPPORTUNITY GEEKS',
    text: 'HEY! there is new opportunity for U plzz visit our website'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }); 
 

res.redirect("/eventfeed");
}
)









app.post('/scholarcompose',(req,res) =>
{  const scholarname1= req.body.scholarname.toUpperCase();


   const criteria1= req.body.scholarcriteria.toUpperCase()
   const  scholarlink1=req.body.scholarlink
   const scholardescribe1=req.body.scholardescribe
   const  scholardate1=req.body.scholardate
   var age = new Date();
const scholar0 = new scholar({
    scholarname: scholarname1,
    criteria: criteria1,
    scholarlink:scholarlink1,
    scholardescribe:scholardescribe1,
    scholardate:scholardate1,
    time:age
});

scholar0.save();
res.redirect("/scholarfeed");
}
)



/*********************************************************************************************************** */
/*********************************************************************************************************** */
/********************************************post************************************************************** */
/*********************************************************************************************************** */
/*********************************************************************************************************** */
/*********************************************************************************************************** */






/*********************************************************************************************************** */
/*********************************************************************************************************** */
/*********************************************************************************************************** */
/****************************EVENTFEED CLICK************************************************ */
/*********************************************************************************************************** */


app.get('/eventfeed/:event', function (req, res) {

    const reqtitle = req.params.event;
  
    event.findOne({eventname:reqtitle},function(err,event){
       
        
            
        res.render('extendfeed',{event:event});
        

        
       ///////////////////////////////////////////ADMIN        ///////////////////////////////////////////ADMIN 
       ///////////////////////////////////////////ADMIN 
       ///////////////////////////////////////////ADMIN requests
       ///////////////////////////////////////////ADMIN 
       ///////////////////////////////////////////ADMIN 

        
        
    })
  })
  app.get('/adminhome', (req, res) =>{ 
     

  if(pass){
    res.render('adminhome')
  }
  else
  {
      res.render('error')
  }
    
 })
 app.get('/secret', (req, res) =>{ 
     

    if(pass){
      res.render('secret')
    }
    else
    {
        res.render('error')
    }
      
   })
   app.get('/adminalmuni', (req, res) =>{ 
     

    if(pass){
        almuni.find({}).sort({"time":-1}).exec(function(err,almunis){

                //console.log(almuni)
                
                
                res.render('adminalmuni',{almunis:almunis});
            
        })
    }
    else
    {
        res.render('admin')
    }
      
   })

   app.get('/adminevent', (req, res) =>{ 
     

    if(pass){
        event.find({}).sort({"time":-1}).exec(function(err,events){

           
            
                res.render('adminevent',{events:events});
            
        })
    }
    else
    {
        res.render('admin')
    }
      
   })

   
   app.get('/adminscholar', (req, res) =>{ 
     

    if(pass){
        scholar.find({}).sort({"time":-1}).exec(function(err,scholars){

           
            
                res.render('adminscholar',{scholars:scholars});
            
        })
    }
    else
    {
        res.render('admin')
    }
      
   })

   
  
 /****************************NODEMAILR************************************************ */
 /****************************NODEMAILR************************************************ */
 /****************************NODEMAILR************************************************ */

 login.find({}).sort({"time":-1}).exec(function(err,logins){

    logins.forEach(function(login){
var add=login.username;
//console.log(add);
maillist.push(add)

    })
     
})
/*login.find({}).sort({"time":-1}).exec(function(err,logins){

           logins.forEach(function(login){
var add=login.username;
//console.log(add);
maillist.push(add)

           })
            
})*/
//console.log(maillist);

        
      
/*
 var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'karanwadhwa0309@gmail.com',
      pass: '7404460475'
    }
  });
  


  
var mailOptions = {
    from: 'karanwadhwa0309@gmail.com',
    to: maillist,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }); 
 /*
 /****************************NODEMAILR************************************************ */
 /****************************NODEMAILR************************************************ */
 /****************************NODEMAILR************************************************ */
 /****************************NODEMAILR************************************************ */

  app.use((req,res)=>{
      res.status(404).render('error');
  })
  
/****************************EVNETFEED CLICK************************************************ */
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))