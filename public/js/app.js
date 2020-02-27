
window.onload=function(){
    var canvas =document.createElement('canvas')
    canvas.id='canvas'

    var context = canvas.getContext("2d");
 
    console.log('Client side javascript file is loaded!')
    const colors={red:null,green:null,blue:null}
    let shape=null
    const dataLabel=document.querySelector('.dataLabel')
    const form=document.querySelector('form')
    const buttons = form.querySelectorAll('button')
    buttons.forEach(button=>{
        button.addEventListener('click', (e) => {
            e.preventDefault()
            fetch('/channels/'+e.target.name).then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                    } else {
                        colors[e.target.name]=data.img.colorArray
                        shape=data.img.shape
                        dataLabel.innerHTML=""+e.target.name+"channel fetched"
                        dataLabel.style.color=e.target.name
                    }
                })
            })

         })
    })
    var combineButton = document.querySelector('button[name="combine"]');
    combineButton.addEventListener('click',(e)=>{
        
    
    createImage();
})


 
// Create the image
function createImage() {
    var width = shape[0];
    var height = shape[1];
    canvas.width=width
    canvas.height=height
    var imagedata = context.createImageData(width, height);
    
    context.putImageData(imagedata, 0, 0);
    // Loop over all of the pixels
    console.log(colors.red.length)
    console.log(imagedata.data.length)
    for (var x=0; x<width; x++) {
        for (var y=0; y<height; y++) {
            // Get the pixel index
            var pixelindex = (y * width + x)*4;
            // Set the pixel data
            imagedata.data[pixelindex] = colors.red[pixelindex/4];     // Red
            imagedata.data[pixelindex+1] = colors.green[pixelindex/4]; // Green
            imagedata.data[pixelindex+2] = colors.blue[pixelindex/4]  // Blue
            imagedata.data[pixelindex+3] = '255'   // Alpha
        }
    }
    context.putImageData(imagedata, 0, 0);
    var canvasContainer=document.getElementById('canvasContainer')
    canvasContainer.appendChild(canvas)
}
}

