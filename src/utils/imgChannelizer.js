const Jimp=require('jimp')
// const path =require('path')
// const imgPath=path.join(__dirname,'../assets/Sample1.jpg')

const channelsGetter = (i,callback)=>{
Jimp.read("/home/harsh/caMicroscope_code_challenge/src/assets/img/Sample1.jpg",(err,img)=>{
  if(err){
    callback('Unable to channelize image!'+err,undefined);
  }
  else{
    var channel={shape:[460,259],colorArray:[]}
    img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, pos) {      // x, y is the position of this pixel on the img
      channel.colorArray.push(this.bitmap.data[ pos + i ])
  });
  callback(undefined,channel)
  }
})

}
module.exports=channelsGetter