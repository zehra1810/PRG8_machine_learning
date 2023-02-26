const image = document.getElementById("image");
const result = document.getElementById("result");
const probability = document.getElementById("probability");
document.getElementById("getval").addEventListener("change", readURL, true);
let synth = window.speechSynthesis;

function speak(text) {
    if (synth.speaking) {
      console.log("still speaking...");
      return;
    }
    if (text !== "") {
      let utterThis = new SpeechSynthesisUtterance(text);
      synth.speak(utterThis);
    }
  }


function readURL() {
  var file = document.getElementById("getval").files[0];
  if (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      image.src = e.target.result;
      ml5
        .imageClassifier("./model.json", "model.weights.bin")
        .then((classifier) =>
          classifier.classify(image).then((results) => {
            result.innerText = results[0].label;
            speak(results[0].label);
            probability.innerText = results[0].confidence.toFixed(4);
          })
        );
    };

    reader.readAsDataURL(file);
  }
}
