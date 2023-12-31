function updateMessage() {
  alert("Database Updated!");
}

list_of_files = [];

function preview(event) {
  let files = [];
  var elemsBackup = document.getElementById("id_images");
  var elems = elemsBackup;

  for (i = 0; i < elems.files.length; i++) {
    files.push(elems.files[i]);
  }

  // Dynamic DOM Manipulation
  var mainDiv = document.getElementById("image-preview");
  for (i = 0; i < elems.files.length; i++) {
    let dataTransfer = new DataTransfer();
    var file = elems.files[i];
    var filename = file.name;
    var imageDiv = document.createElement("div");
    // imageDiv.style.marginLeft="auto";
    // imageDiv.style.marginRight="auto";
    // imageDiv.innerText = filename;
    imageDiv.id = "img-" + i;
    var image = document.createElement("img");
    var linebreak = document.createElement("br");
    var url = URL.createObjectURL(event.target.files[i]);
    image.src = url;
    // margin-left: auto; margin-right: auto;
    image.style.width = "200px";
    image.style.height = "80px";
    // image.style.marginLeft = "auto";
    // image.style.marginRight = "auto";
    image.style.margin = "10px";
    mainDiv.append(imageDiv);
    imageDiv.append(image);

    var button = document.createElement("div");

    button.innerHTML = "Close";
    button.className = "btn btn-secondary btn-sm";
    button.id = i;
    imageDiv.append(button);
    // imageDiv.append(linebreak);
    // End of DOM Manipulation

    // Button Onclick
    button.onclick = function removeImage(i) {
      var image_to_delete = document.getElementById(
        "img-" + i.srcElement.firstChild.parentNode.id
      );
      x = document
        .getElementById("img-" + i.srcElement.firstChild.parentNode.id)
        .innerText.slice(0, -5);
      console.log(x);
      // console.log(image_to_delete);
      mainDiv.removeChild(image_to_delete);

      // console.log(elems.files[i.srcElement.firstChild.parentNode.id].name);
      const idxObj = files.findIndex((object) => {
        return object.name === x;
      });

      files.splice(idxObj, 1);
      // console.log(files);
      for (let i = 0; i < files.length; i++) {
        if (dataTransfer[i] === files[i].name) {
          r = 0;
        }
        dataTransfer.items.add(files[i]);
      }

      // console.log(dataTransfer);
      elemsBackup.files = dataTransfer.files;
    };
  }
}

function previewAddedImage(event) {
  let files = [];
  var elemsBackup = document.getElementById("images");
  var elems = elemsBackup;

  for (i = 0; i < elems.files.length; i++) {
    files.push(elems.files[i]);
  }

  // Dynamic DOM Manipulation
  var mainDiv = document.getElementById("image-added-preview");
  for (i = 0; i < elems.files.length; i++) {
    let dataTransfer = new DataTransfer();
    var file = elems.files[i];
    var filename = file.name;
    var imageDiv = document.createElement("div");
    // imageDiv.innerText = filename;
    imageDiv.id = "img-" + i;
    var image = document.createElement("img");
    var url = URL.createObjectURL(event.target.files[i]);
    image.src = url;
    image.style.width = "200px";
    image.style.height = "80px";
    image.style.margin = "10px";
    mainDiv.append(imageDiv);
    imageDiv.append(image);

    var button = document.createElement("div");

    button.innerHTML = "Close";
    button.className = "btn btn-secondary btn-sm";
    button.id = i;
    imageDiv.append(button);
    // End of DOM Manipulation

    // Button Onclick
    button.onclick = function removeImage(i) {
      var image_to_delete = document.getElementById(
        "img-" + i.srcElement.firstChild.parentNode.id
      );
      x = document
        .getElementById("img-" + i.srcElement.firstChild.parentNode.id)
        .innerText.slice(0, -5);
      // console.log(x);
      // console.log(image_to_delete);
      mainDiv.removeChild(image_to_delete);

      // console.log(elems.files[i.srcElement.firstChild.parentNode.id].name);
      const idxObj = files.findIndex((object) => {
        return object.name === x;
      });

      files.splice(idxObj, 1);
      // console.log(files);
      for (let i = 0; i < files.length; i++) {
        if (dataTransfer[i] === files[i].name) {
          r = 0;
        }
        dataTransfer.items.add(files[i]);
      }

      console.log(dataTransfer);
      elemsBackup.files = dataTransfer.files;
    };
  }
}

function downloadZip(i) {
  let zip = new JSZip();
  let files = document.getElementById("files-files");
  console.log(files);

  Array.from(files.files).forEach((f, i) => {
    zip.file(f.name, f);
  });
  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, "output.zip");
  });
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
function closeEditTitle(x) {
  document.getElementById("edit-title-" + x).style.display = "none";
  console.log("title update popup closed");
  console.log(x);
}
var modal = document.getElementsByClassName("popup");

window.onclick = function (event) {
  if (event.target == modal) {
    popup.style.display = "none";
    console.log("mouse click outside the popup box");
  }
  console.log("mouse click outside the popup box");
};

function confirmDelete(event) {
  const result = window.confirm("Are you sure you want to delete this item?");

  if (result) {
    //
  } else {
    // Add code here if the user cancels the delete action
    console.log("Delete canceled!");
    event.preventDefault();
  }
}
