function updateMessage() {
  alert("Database Updated!");
}

function preview(event) {
  var elems = document.getElementById("id_images");
  var x = elems.files.length;
  // initialize array
  var arr = [];

  // append new value to the array

  console.log(x);
  var mainDiv = document.getElementById("image-preview");
  for (i = 0; i < elems.files.length; i++) {
    var file = elems.files[i];
    var filename = file.name;
    arr.push("filename");
    var imageDiv = document.createElement("div");
    imageDiv.innerText = filename;
    imageDiv.id = "img-" + i;
    var image = document.createElement("img");
    var url = URL.createObjectURL(event.target.files[i]);
    console.log(url);
    image.src = url;
    image.style.width = "200px";
    image.style.height = "80px";
    mainDiv.append(imageDiv);
    imageDiv.append(image);
    var button =
      "<button class='btn btn-primary' onclick = removeImage(" +
      i +
      ")>Close</button>";
    // var button = document.createElement("button");
    // button.className = "btn btn-primary";

    // button.innerHTML = "Close";
    // button.id = i;
    // button.onclick = () => {

    // };

    imageDiv.innerHTML(button);

    // imageDiv.remove(image);
    // b.onclick = function() { alert('OnClick'); }
  }
}

var inputFile = document.getElementById("brand_logo");
removeImg = () => {
  document.getElementById("frame").setAttribute("src", "");
  document.getElementById("i").setAttribute("src", "");
  inputFile.value = "";
};

function popup(x) {
  document.getElementById("popup-" + x).style.display = "block";
  console.log("popup clicked");
  console.log(x);
}
function closePopUp(x) {
  document.getElementById("popup-" + x).style.display = "none";
  console.log("popup closed");
  console.log(x);
}
function editTitle(x) {
  document.getElementById("edit-title-" + x).style.display = "block";
  console.log("title update popup opened");
  console.log(x);
}
