song1 = "";
song2 = "";
scoreOfLeftWrist = 0;
scoreOfRightWrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload() {
    song1 = loadSound("AW specte.mp3");
    song2 = loadSound("Unstopable.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("PoseNet model loaded");
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("lightgreen");
    stroke("white");
    song1_status = song1.isPlaying();
    if (scoreOfLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.pause();
        if (song1_status == false) {
            song1.play();

        }
    }

    song2_status = song2.isPlaying();
    if (scoreOfRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song1.pause();
        if (song2_status == false) {
            song2.play();
        }
    }
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreOfLeftWrist = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist x: " + leftWristX + "  Left wrist y: " + leftWristY);

        scoreOfRightWrist = results[0].pose.keypoints[10].score;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist x: " + rightWristX + "  Right wrist y: " + rightWristY);
    }
}