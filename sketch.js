let capture;
let posenet;
let noseX,noseY;
let leyeX,leyeY;
let reyeX,reyeY;
let singlePose, skeleton;
let obama;

function setup(){
    createCanvas(800,500);
    capture = createCapture(VIDEO);
    capture.hide();

    posenet = ml5.poseNet(capture,modelLoaded);
    posenet.on('pose', receivedposes);
    obama = loadImage('images/obama.png');
}

function receivedposes(poses){
    //console.log(poses);

    if (poses.length > 0){
        singlePose = poses[0].pose;
        skeleton=poses[0].skeleton;
    }

   //console.log(noseX+ " "+noseY);

}

function modelLoaded(){
    console.log("Model has Loaded");
}

function draw(){
    image(capture,0,0);
    fill(255,0,0);
    if(singlePose){
        for(let i=0; i<singlePose.keypoints.length; i++){
            ellipse(singlePose.keypoints[i].position.x,singlePose.keypoints[i].position.y,20);
        }
        stroke(255,255,255);
        strokeWeight(5);
        for(let j=0; j<skeleton.length; j++){
            line(skeleton[j][0].position.x, skeleton[j][0].position.y,skeleton[j][1].position.x, skeleton[j][1].position.y);
        }
        let leye = singlePose.leftEye;
        let reye = singlePose.rightEye;
        let eyeDistance = dist(leye.x, leye.y, reye.x, reye.y); // Distance between eyes

        // Scale the image based on distance (eyeDistance)
        let imgWidth = eyeDistance * 3;  // adjust this multiplier as needed
        let imgHeight = imgWidth * (300 / 200);  // Keep the image's aspect ratio
        
        // Position the image slightly above the nose
        let noseX = singlePose.nose.x - imgWidth / 2;  // Center horizontally at nose
        let noseY = singlePose.nose.y - imgHeight + 100;  // Place above nose

        // Draw Obama image
        image(obama, noseX, noseY, imgWidth, imgHeight);
    }
}