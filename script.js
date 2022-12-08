const screenshotBtn = document.querySelector("#src-btn");
const screenshotPreview = document.querySelector(".src-preview");
const closeBtn = document.querySelector(".close-btn");

const captureScreen=async ()=>{
    try{
        //asking permission to use a media input to record current tab
        const stream = await navigator.mediaDevices.getDisplayMedia({preferCurrentTab:true});
        const video = document.createElement("video");

        video.addEventListener("loadedmetadata",()=>{
            const canvas = document.createElement("canvas");
            const ctx=canvas.getContext("2d");

            //passing video width & height as canvas width & height
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            //playing the video so the drawn image won't be black or blank
            video.play();

            //drawing an image from the captured video stream
            ctx.drawImage(video,0,0,canvas.width,canvas.height);

            //terminating first video track of the stream
            stream.getVideoTracks()[0].stop();
            
            //passing canvas data url as screenshot preview src
            screenshotPreview.querySelector("img").src=canvas.toDataURL();
            screenshotPreview.classList.add("show");

        });
        video.srcObject=stream;//passing capture stream data as video source object 
    }catch(error){

        alert("Failed to capture screenshot!")
    }
}

closeBtn.addEventListener("click",() =>screenshotPreview.classList.toggle("show"));
screenshotBtn.addEventListener("click", captureScreen);