function updateMessage() {
  alert("Database Updated!");
}

function preview(event) {
  var filesToUpload = []; // Array to store files
  var elems = document.getElementById("id_images");
  var elemsBackup = elems;
  // console.log(typeof elems);

  console.log(elems.value);
  var x = elems.files.length;
  var arr = [];
  // initialize array
  var array_of_images_name = [];
  for (i = 0; i < elems.files.length; i++) {
    let myFile = elems.files[i].name;
    let myFileID = "FID" + (1000 + Math.random() * 9000).toFixed(0);

    filesToUpload.push({
      file: myFile,
      FID: myFileID,
    });
    var file = elems.files[i];
    var filename = file.name;
    array_of_images_name.push(filename);
  }
  console.log(filesToUpload);
  // append new value to the array  inputFile.value = "";
  var filesToUpload = []; // Array to store files
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
    // button.addEventListener("click", function () {
    //   var image_to_delete = document.getElementById("img-" + i);
    //   mainDiv.removeChild(image_to_delete);
    // });
    button.onclick = function removeImage(i) {
      console.log(i, 7, 8);
      var image_to_delete = document.getElementById(
        "img-" + i.srcElement.firstChild.parentNode.id
      );
      console.log(image_to_delete);
      mainDiv.removeChild(image_to_delete);
      // for (i = 0; i < elems.files.length; i++) {
      // document.getElementById("myText").value = "Johnny Bravo";
      elems.files[i.srcElement.firstChild.parentNode.id].name = null;
      console.log(i.srcElement.firstChild.parentNode.id);
      array_of_images_name.pop(i.srcElement.firstChild.parentNode.id);
      console.log(array_of_images_name);
    };
  }
}

const initUpload = () => {
  console.log(filesToUpload);

  let formData = new FormData();

  for (let i = 0; i < filesToUpload.length; i++) {
    formData.append("files", filesToUpload[i].file);
  }
};

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
