const { raw, response } = require("express");
const { spawn } = require('child_process');
var express = require("express");
var router = express.Router();
var path = require('path');
var elem;
const fs = require('fs');
const fetch = require('node-fetch');
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://adrian:1234@cluster0.oiagn.mongodb.net/api?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  if(!err)
  console.log("conect");
  // perform actions on the collection object

});



function crop_image(left,top,right,bottom,image_name,type){
    return new Promise((resolve)=>{
       const pyprog = spawn('python3', [process.cwd()+'/routes/crop.py',left,top,right,bottom,image_name]);
       pyprog.stdout.on('data', function(data) {
        if(type=="correct")
        {
            const collection = client.db("api").collection("correct");
            collection.insertOne({picture:data.toString()})
        }
        if(type=="incorrect")
        {
            const collection = client.db("api").collection("incorrect");
            collection.insertOne({picture:data.toString()})
        }
        console.log("done cropping");
         resolve(data.toString());
       });
    });
 
 }
async function download(url,image_name) {
    return new Promise(async (resolve)=>{
  const response = await fetch(url);
  const buffer = await response.buffer();
  fs.writeFile(image_name, buffer, () =>{ 
    console.log('finished downloading!');
    resolve("done downloading");});
    });
}
function download_and_cropping(message,number_pictures)
{
    for(let i=0;i<message.length;i++)
    {
        download(message[i]["picture"],"./routes/pictures/"+number_pictures+".jpg").then((response)=>{
        crop_image(message[i]["x0"],message[i]["y0"],message[i]["x1"],message[i]["y1"],number_pictures+".jpg",message[i]["type"]).then((response)=>console.log(response));
    });
    }
}
router.post("/",  async function(req, res, next)  {
    console.log(__dirname)
    var number_pictures=0;
    message=req.body["message"];
    await fs.readdir('./routes/pictures', (err, files) => {
        number_pictures=files.length
        number_pictures=number_pictures+1;
        download_and_cropping(message,number_pictures)
      });
    
    
    elem=req.body;
    console.log(req.body)
    res.send("API is working properly");
});
router.get("/", function(req, res, next) {
    let message_back={correct:[],incorrect:[]}
    client.db("api").collection("correct").find().toArray().then(response=>{
        message_back["correct"]=[...response];
        client.db("api").collection("incorrect").find().toArray().then(response=>{
            message_back["incorrect"]=[...response];
            res.send(JSON.stringify(message_back));
        });
    });
});
module.exports = router;