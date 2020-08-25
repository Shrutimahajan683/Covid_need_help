const express=require("express");
const bodyParser=require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
const https=require("https");


const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
const h="CORONA-VIRUS";
found=[];
mongoose.connect('mongodb://localhost:27017/projectsDB',{useNewUrlParser: true, useUnifiedTopology: true});
const postsSchema=new mongoose.Schema({
  address:String,
  needs:String,
});
const post=mongoose.model("post",postsSchema);

app.get("/",function(req,res){



  res.render("home.ejs",{h:h});


})
app.get("/someone",function(req,res){

  post.find(function(err,found){
  if(err)
  {console.log(err);}
  else{
    res.render("someone.ejs",{post:found});
    }
  })


  })

app.post("/help",function(req,res){
 let ad=req.body.address;
 let ne=req.body.needs;
 post.findOne({address:ad,needs:ne},function(err,result){
   if(err)
   console.log(err);
   if(result)
   console.log("already saved");
   else{
 const ye=new post({
   address:ad,
   needs:ne,
 });
 ye.save();
 res.redirect("/");
}})})

app.get("/help",function(req,res){
  res.render("help.ejs");
})
app.post("/delete",function(req,res){
  const checkedItemId=req.body.checkbox;

  post.findByIdAndRemove(checkedItemId,function(err){
    if(!err){
      console.log("successfully deleted ckecked item");
      res.redirect("/")
    }
  })
})

app.listen(process.env.PORT ||3000,function(){
  console.log("port 3000 is on");
})
