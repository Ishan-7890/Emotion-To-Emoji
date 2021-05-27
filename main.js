Webcam.set
({
  width:350,
  height:300,
  image_format:'png',
  png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function takesnap()
{
Webcam.snap(function(data_uri){
document.getElementById("snap").innerHTML="<img id='captured_img' src='"+data_uri+"'>";
}
)};
console.log('ml5 version', ml5.version)

function modelLoaded()
{
  console.log("Model Was Loaded");
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6yl76Y-xY/model.json',modelLoaded);

function speak()
{
var synth = window.speechSynthesis;
speak_data_1 = "the first prediction is" + prediction_1;
speak_data_2 = "the second prediction is" + prediction_2;
var UtterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
synth.speak(UtterThis);
}

function check()
{
img = document.getElementById("captured_img");
classifier.classify(img, Gotresult)
}

function Gotresult(error,results)
{
if(error){
  console.log(error);
}
else
{
console.log(results);
document.getElementById("result1").innerHTML=results[0].label;
document.getElementById("result2").innerHTML=results[1].label;
prediction_1=results[0].label;
prediction_2=results[1].label;
speak();

if(prediction_1 == "Happy")
{
  document.getElementById("emoji1").innerHTML="&#128522;";  
}

if(prediction_1 == "Sad")
{
  document.getElementById("emoji1").innerHTML="&#128546;";  
}

if(prediction_1 == "Angry")
{
  document.getElementById("emoji1").innerHTML="&#128545;";  
}
   



if(prediction_2 == "Happy")
{
  document.getElementById("emoji2").innerHTML="&#128522;";  
}

if(prediction_2 == "Sad")
{
  document.getElementById("emoji2").innerHTML="&#128546;";  
}

if(prediction_2 == "Angry")
{
  document.getElementById("emoji2").innerHTML="&#128545;";  
}
}
}