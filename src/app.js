// var Module = require('module');
//var fs     = require('fs');
const channelsArray=[{color:'red'},{color:'green'},{color:'blue'},{color:'alpha'}]

// Module._extensions['.jpg'] = function(module, fn) {
//   var base64 = fs.readFileSync(fn).toString('base64');
//   module._compile('module.exports="data:image/jpg;base64,' + base64 + '"', fn);
// };

const path =require('path')
const express =require('express')
const channelizer=require('./utils/imgChannelizer')
const app = express()
//var sampleImg=require('./assets/img/Sample1.jpg')
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    
}) 

channelsArray.forEach((channel,index)=>{
    app.get('/channels/'+channel.color,(req,res)=>{
        channelizer(index,(error,img)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                img
            })
        })
    })
})

app.listen(5000,()=>{
    console.log("Server is up and running")
})