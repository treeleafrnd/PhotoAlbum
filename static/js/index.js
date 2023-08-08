function updateMessage() {
  alert("Database Updated!");
}

function preview(event) {
  var elems = document.getElementById("id_images");
  var x = elems.files.length;
  // initialize array
  var arr = [];

  // append new value to the array

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
    // console.log(url);
    image.src = url;
    image.style.width = "200px";
    image.style.height = "80px";
    mainDiv.append(imageDiv);
    imageDiv.append(image);

    var button = document.createElement("div");

    button.innerHTML = "Close";
    button.className = "btn btn-secondary";
    button.id = i;
    imageDiv.append(button);
    image1 = document.getElementById("img-" + i);
    console.log(image1);
    // console.log("img-" + i);
    // j = button.id;
    console.log(i, 112341);
    button.onclick = function removeImage(i) {
      console.log(i, 7, 8);
      var image_to_delete = document.getElementById(
        "img-" + i.srcElement.firstChild.parentNode.id
      );
      console.log(image_to_delete);
      mainDiv.removeChild(image_to_delete);
      console.log(i.srcElement.firstChild.parentNode.id);
    };

    // button.onclick = () => {

    // };

    // imageDiv.remove(image);
    // b.onclick = function() { alert('OnClick'); }
  }
}

// function removeImage(x) {
//   console.log(x);
// }
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
